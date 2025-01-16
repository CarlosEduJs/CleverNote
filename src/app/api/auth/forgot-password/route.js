import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transporter } from "@/app/api/utils/nodemailerTransporter";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(request) {
  try { 
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Email not found!" }, { status: 404 });
    }

    const resetToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000);

    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      },
    });

    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Recovery",
      html: `
          <h1>Password Recovery</h1>
          <p>Hello ${user.name},</p>
          <p>You have requested password recovery. Click the link below to reset your password:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>This link is valid for 1 hour.</p>
          <p>If you did not request this recovery, please ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Link sent to your email, please check :)" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing password recovery:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
