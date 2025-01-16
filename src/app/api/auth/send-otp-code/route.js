import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transporter } from "@/app/api/utils/nodemailerTransporter";
import generateOTP from "../../utils/generateOTPCode";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const otpCode = generateOTP(6);
    const expiresAt = new Date(Date.now() + 3600000);

    await prisma.oTPCode.create({
      data: {
        code: otpCode,
        userId: user.id,
        expiresAt,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Code Verification",
      html: `
            <h1>This is your OPT verification code</h1>
            <p>Hello ${user.name},</p>
            <p>To keep your account safe and sound, we've sent your one-of-a-kind access OTP code right here in this email. Guard it like treasure and remember: sharing is not caring when it comes to this code:</p>
            <p>${otpCode}</p>
            <p>This code is valid for 1 hour.</p>
            <p>If you did not request this code, please ignore this email.</p>
          `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "A code has been sent to your email, check there" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing code opt request", error);
    return NextResponse.json(
      {
        error:
          "Oh no! Damn, unfortunately we were unable to send the verification code to your email. Try again bro.",
      },
      { status: 500 }
    );
  }
}
