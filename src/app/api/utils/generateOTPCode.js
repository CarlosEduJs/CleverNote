import crypto from "crypto";

export default function generateOTP(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomBytes(1)[0] % charactersLength;
    otp += characters[randomIndex];
  }

  return otp;
}
