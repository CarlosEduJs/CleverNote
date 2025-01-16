"use client";

import * as React from "react";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import DialogOTP from "@/components/ui/auth/otp-dialog";
import DialogRecoverPassword from "@/components/ui/auth/recover-password";
import FormField from "@/components/ui/auth/form-field";
import AuthHeader from "@/components/ui/auth/auth-header";
import GoogleBtn from "@/components/ui/auth/google-btn";
import SubmitBtn from "@/components/ui/auth/submit-btn";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import FooterBtn from "@/components/ui/auth/footer-btn";
import useHandleValidateErrors from "@/hooks/auth/useHandleValidateErrors";

export default function Page() {
  const [openDialogOtp, setIsOpenDialogOtp] = useState(false);
  const [openDialogRecoveryPassword, setIsOpenDialogRecoveryPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitText, setSubmitText] = useState("Login");
  const [user, setUser] = useState({});
  const { dialogLoading, setDialogLoading, signWithGoogle } = useGoogleAuth();
  const { validateForm, errors, setErrors } = useHandleValidateErrors();

  async function handleSubmit(e) {
    if (!validateForm(e, false)) return;
    setIsLoading(true);
    setSubmitText("Trying to login, please wait...");

    let errors = {};
    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setSubmitText("Login");
        const data = await response.json();
        errors.login = data.error;
        setErrors(errors);
        throw new Error("Error loggin account");
      }

      setSubmitText("Correct credentials, sending otp code to your email...");
      try {
        const email = formData.get("email");
        const password = formData.get("password");
        const sendCodeOTPResponse = await fetch("/api/auth/send-otp-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (!sendCodeOTPResponse.ok) {
          setSubmitText("Login");
          throw new Error("Error ");
        }
        setUser({ email: email, password: password });
        setSubmitText("Login");
        setIsOpenDialogOtp(true);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <AuthHeader title={"Login"} />
      <p className="text-center text-gray-600 my-16">
        Welcome back! Log in again, thank you for choosing us.
      </p>
      <main className="w-full max-w-2xl">
        <div className="flex items-center justify-center w-full gap-3 mb-6">
          <GoogleBtn
            onClick={signWithGoogle}
            loading={dialogLoading}
            onChange={setDialogLoading}
            mode={"Login"}
          />
        </div>
        <Separator />
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <FormField label={"Email"} id="email" error={errors.email}>
              <Input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Enter your email"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </FormField>
            <FormField label={"Password"} id="password" error={errors.password}>
              <Input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Enter your password"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </FormField>
          </div>
          {errors.login && (
            <p className="text-red-500 text-sm font-semibold">{errors.login}</p>
          )}
          <a
            onClick={() => setIsOpenDialogRecoveryPassword(true)}
            className="text-sm text-start font-medium text-blue hover:underline cursor-pointer"
          >
            Recovery password?
          </a>
          <SubmitBtn
            loading={isLoading}
            text={submitText}
            textLoading={submitText}
          />
        </form>
      </main>
      <DialogOTP
        open={openDialogOtp}
        onOpenChange={setIsOpenDialogOtp}
        user={user}
      />
      <DialogRecoverPassword
        open={openDialogRecoveryPassword}
        onOpenChange={setIsOpenDialogRecoveryPassword}
      />
      <footer className="mt-6">
        <FooterBtn text="Create New Account" textLink="signup" />
      </footer>
    </div>
  );
}
