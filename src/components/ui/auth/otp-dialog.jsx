"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "../logo/index";
import SubmitBtn from "@/components/ui/auth/submit-btn";

export default function DialogOTP({ open, onOpenChange, user }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitText, setSubmitText] = useState("Confirm Code");
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleCloseModal = () => {
    onOpenChange(false);
    setErrors({});
  };

  const validateCodeOtp = (e) => {
    e.preventDefault();
    let errors = {};

    if (!otp || otp.length < 6) {
      errors.otp =
        "Invalid code entered, requires 6 digits. Remember, code has been sent to your email!";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  async function handleSubmit(e) {
    if (!validateCodeOtp(e)) return;
    setIsLoading(true);
    setSubmitText("We are checking your code...");
    let errors = {};

    try {
      const response = await fetch(`/api/auth/login-with-otp?code=${otp}`);
      const data = await response.json();

      if (response.ok) {
        setSubmitText("Confirming your loginly ;)");

        try {
          const response = await fetch("/api/auth/login-with-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: otp, email: user.email }),
          });

          const data = await response.json();
          if (!response.ok) {
            errors.otp = data.error;
            setErrors(errors);
            throw new Error("Error", data.error);
          }
          const result = await signIn("credentials", {
            email: data.user.email,
            password: user.password,
            redirect: false,
          });
          if (result?.ok) {
            errors.otp = data.error;
            setErrors(errors);
            router.push("/overview");
          } else {
            errors.otp = data.error;
            setErrors(errors);
            throw new Error("Error", result.error);
          }
        } catch (error) {
          console.log("Login Error!");
        }
      } else {
        errors.otp = data.error;
        setErrors(errors);
        console.error("Validation error:", data.error);
      }
    } catch (error) {
      errors.otp = error;
      console.log(error);
    } finally {
      setIsLoading(false);
      setSubmitText("Confirm Code");
      setOtp("");
      handleCloseModal();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[450px]">
        <DialogHeader>
          <Logo />
          <DialogTitle className="font-bold">Code OTP</DialogTitle>
          <DialogDescription>
            6-digit confirmation code sent to your email:{" "}
            <a className="hover:underline font-bold">{user.email}</a>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-2 font-semibold">
              {errors.otp}
            </p>
          )}
          <DialogFooter>
            <SubmitBtn
              textLoading={submitText}
              text={submitText}
              loading={isLoading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
