import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          error:
            "Email not registered, are you sure this is the email you registered?",
        },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error:
            "See, the password entered is incorrect, bro. Forgot your password?",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error ocurred" }, { status: 500 });
  }
}
