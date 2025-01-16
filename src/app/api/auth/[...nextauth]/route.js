import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("User not found or password not set. Please try again or request a new password.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password. Please try again.");
          }

          return user;
        } catch (error) {
          console.error("Error finding user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async linkAccount({ account, profile }) {
      if (account.provider === "google") {
        try {
          const user = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!user) {
            console.log("Criando novo usuário:", {
              email: profile.email,
              provider: account.provider,
            });
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                image: profile.picture,
                password: null,
              },
            });
          }
        } catch (error) {
          console.error("Error creating or finding user or account:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/error",
    newUser: null,
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export const getServerSideProps = async (context) => {
  const { error } = context.query;

  return {
    props: {
      error: error ? error : null,
    },
  };
};

export { handler as GET, handler as POST };

