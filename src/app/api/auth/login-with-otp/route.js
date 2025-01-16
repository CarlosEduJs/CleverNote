import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, email } = body;
    console.log(code, email);

    if (!code) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    const codeOTP = await prisma.oTPCode.findFirst({
      where: {
        code,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    console.log(codeOTP);

    if (!codeOTP) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please request a new code OTP." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.emailVerified === null) {
      return NextResponse.json(
        { error: "Please check your email before trying to log in ;)" },
        { status: 404 }
      );
    }

    await prisma.oTPCode.update({
      where: {
        id: codeOTP.id,
      },
      data: {
        used: true,
      },
    });

    await prisma.oTPCode.delete({
      where: {
        id: codeOTP.id,
      },
    });
    const finalState = {
      sucess: true,
      user: {
        email: user.email,
      },
    };

    console.log(finalState.user.password);
    return NextResponse.json(finalState, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    console.log(code);

    if (!code) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    const codeOTP = await prisma.oTPCode.findFirst({
      where: {
        code,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!codeOTP) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please request a new code otp." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Your code has been successfully validated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating code otp:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
