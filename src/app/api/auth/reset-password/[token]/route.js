import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { password } = await request.json();
    const { token } = params;

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        {
          error:
            "Invalid or expired token. Please request a new password reset link.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.update({
      where: {
        id: resetToken.id,
      },
      data: {
        used: true,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return NextResponse.json(
      {
        message: "Your password has been successfully reset.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { token } = params;

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        {
          error:
            "Invalid or expired token. Please request a new password reset link.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "The token is valid. Proceed to reset your password." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred while validating your token. Please try again later.",
      },
      { status: 500 }
    );
  }
}
