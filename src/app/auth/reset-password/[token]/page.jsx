"use client";

import * as React from "react";

import Link from "next/link";
import Logo from "@/components/logo";
import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronRightIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validatePassword,
  measurePasswordComplexity,
} from "../../utils/validatePassword";
import PasswordMeasureProgress from "@/components/password measure progress";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [measurePassword, setIsMeasurePassword] = useState("Password Strength");
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
          router.push("/auth/login?error=invalid-token");
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

  const handleOnChangeMeasurePassword = (value) => {
    const complexity = measurePasswordComplexity(value);
    setIsMeasurePassword(complexity);
  };

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
      <header className="flex items-center justify-between w-full max-w-2xl p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">Reset password</h1>
          <ChevronRightIcon aria-hidden="true" />
        </div>
        <Logo aria-label="CleverNote logo" />
      </header>
      <p className="text-center text-gray-600 mb-8 max-w-md">
        Hello forgetful, now you can reset your password below. Remember, choose
        a strong password, but don't forget it, you don't want to go through
        that again haha
      </p>
      <main className="w-full max-w-2xl">
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold" htmlFor="password">
                  Password
                </Label>
                {errors.password && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.password}
                  </p>
                )}
              </div>
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
            </div>
          </div>
          <Button
            className="w-full mt-6"
            aria-label="Change password"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin" />
                Changing password, please wait...
              </div>
            ) : (
              <>Change password</>
            )}
          </Button>
        </form>
      </main>
      <footer className="mt-6 flex flex-col gap-2">
        <Button variant="outline" className="w-full">
          <Link
            className="flex items-center gap-3"
            href={"/auth/login"}
            aria-label="Go to login page"
          >
            Already have an account? <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" className="w-full">
          <Link
            className="flex items-center gap-3"
            href={"/auth/signup"}
            aria-label="Go to signup page"
          >
            Create New Account <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
