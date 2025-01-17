import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { transporter } from "@/app/api/utils/nodemailerTransporter";
import crypto from "crypto";
import uploadImage from "./upload-image";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageFile = formData.get("image");

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const userData = {
      name,
      email,
      password: hashedPassword,
      image: null 
    };

    if (imageFile && imageFile.size > 0) {
      try {
        const imageUrl = await uploadImage(imageFile);
        if (imageUrl) {
          userData.image = imageUrl;
        }
      } catch (imageError) {
        console.error("Image upload error:", imageError);
      }
    }

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
      <p>Hello ${name},</p>
      <p>Thank you for registering! Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 1 hour.</p>
    `,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: `Error creating user: ${error.message}` },
      { status: 500 }
    );
  }
}