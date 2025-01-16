"use client";

import * as React from "react";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  validatePassword,
  measurePasswordComplexity,
} from "../../utils/validatePassword";
import PasswordMeasureProgress from "@/components/ui/auth/password-meassure-progress";
import { useRouter, usePathname } from "next/navigation";
import AuthHeader from "@/components/ui/auth/auth-header";
import FooterBtn from "@/components/ui/auth/footer-btn";
import SubmitBtn from "@/components/ui/auth/submit-btn";
import FormField from "@/components/ui/auth/form-field";
import { usePasswordStrength } from "@/hooks/auth/usePasswordStrength";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { measurePassword, handleOnChangeMeasurePassword } =
    usePasswordStrength();
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const tokenFromPath = pathname.split("/").pop();
    if (tokenFromPath) {
      setToken(tokenFromPath);
    } else {
      router.push("/auth/login?error=invalid-token");
    }
  }, [router]);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;

      try {
        const response = await fetch(`/api/auth/reset-password/${token}`);
        if (!response.ok) {
          router.push("/auth/error?error=invalid-token");
        }
      } catch (error) {
        console.error("Error validating token", error);
        router.push("/auth/login?error=invalid-token");
      } finally {
        setIsValidatingToken(false);
      }
    };

    validateToken();
  }, [token, router]);

  const handleValidateErrors = (e) => {
    e.preventDefault();
    let errors = {};
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      errors.password = passwordValidation;
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e) {
    if (!handleValidateErrors(e)) return;
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password");

      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error resetting password");
      }

      router.push("/auth/login?success=password-reset");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isValidatingToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
        <p className="mt-4">Validating reset link...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <AuthHeader title="Reset password" />
      <p className="text-center text-gray-600 mb-8 max-w-md">
        Hello forgetful, now you can reset your password below. Remember, choose
        a strong password, but don't forget it, you don't want to go through
        that again haha
      </p>
      <main className="w-full max-w-2xl">
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <FormField label="New password" error={errors.password}>
              <Input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Enter new password"
                className="placeholder:text-sm text-sm"
                aria-required="true"
                onChange={(e) => handleOnChangeMeasurePassword(e.target.value)}
              />
              <PasswordMeasureProgress passwordStrength={measurePassword} />
            </FormField>
          </div>
          <SubmitBtn
            loading={isLoading}
            text="Change password"
            textLoading={"Changing you password"}
          />
        </form>
      </main>
      <footer className="mt-6 flex flex-col gap-2">
        <FooterBtn text="Already have an account" textLink="login" />
        <FooterBtn text="Don't have an account" textLink="signup" />
      </footer>
    </div>
  );
}
