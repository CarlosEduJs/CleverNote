"use client";

import * as React from "react";

import { useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import PasswordMeasureProgress from "@/components/ui/auth/password-meassure-progress";
import { useToast } from "@/hooks/use-toast";
import DialogValidEmailForUser from "@/components/ui/auth/validEmail-forUser";
import AuthHeader from "@/components/ui/auth/auth-header";
import GoogleBtn from "@/components/ui/auth/google-btn";
import FormField from "@/components/ui/auth/form-field";
import SubmitBtn from "@/components/ui/auth/submit-btn";
import { usePasswordStrength } from "@/hooks/auth/usePasswordStrength";
import useAvatarUpload from "@/hooks/auth/useAvatarUpload";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FooterBtn from "@/components/ui/auth/footer-btn";
import useHandleValidateErrors from "@/hooks/auth/useHandleValidateErrors";

export default function Page() {
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { dialogLoading, setDialogLoading, signWithGoogle } = useGoogleAuth();
  const [dialogValidEmailForUser, setDialogValidEmailForUser] = useState(false);
  const [user, setUser] = useState({});
  const { measurePassword, handleOnChangeMeasurePassword } =
    usePasswordStrength();
  const fileInputRef = useRef(null);
  const { imagePreview, handleImageChange } = useAvatarUpload();
  const { validateForm, errors, setErrors } = useHandleValidateErrors();

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  async function handleSubmit(e) {
    if (!validateForm(e, true)) return;
    setIsLoading(true);

    let errors = {};

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        errors.login = data.error;
        setErrors(errors);
        throw new Error(data.error || "Error creating account");
      }

      toast({
        title: "Your account has been created successfully!",
        description: "Log in to this page ;)",
      });
      setUser({
        name: name,
        email: email,
      });
      setDialogValidEmailForUser(true);
    } catch (error) {
      errors.login = data.error;
      setErrors(errors);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <AuthHeader title="Sign Up" />
      <p className="text-center text-gray-600 my-16">
        New here? Create your account and organize your work!
      </p>
      <main className="w-full max-w-2xl">
        <div className="flex items-center justify-center w-full gap-3 mb-6">
          <GoogleBtn
            onClick={signWithGoogle}
            loading={dialogLoading}
            onChange={setDialogLoading}
            mode={"Create"}
          />
        </div>
        <Separator />
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <FormField label={"Name"} id="name" error={errors.name}>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </FormField>
            <FormField label="Avatar" helper={"opcional upload"}>
              <Avatar
                onClick={handleAvatarClick}
                className="w-24 h-24 mx-auto cursor-pointer border p-2"
              >
                <AvatarImage src={imagePreview} />
                <AvatarFallback>avatar</AvatarFallback>
              </Avatar>
              <Input
                id="picture"
                name="image"
                type="file"
                accept="image/*"
                required
                ref={fileInputRef}
                onChange={handleImageChange}
                disabled={loading}
                className="hidden"
                aria-label="Upload your avatar"
              />
            </FormField>
            <FormField
              label={"Email"}
              id="email"
              error={errors.email}
              helper="will be used for login"
            >
              <Input
                type="email"
                id="email"
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
                onChange={(e) => handleOnChangeMeasurePassword(e.target.value)}
              />
              <PasswordMeasureProgress passwordStrength={measurePassword} />
            </FormField>
          </div>
          {errors.login && (
            <p className="text-red-500 text-sm font-semibold">{errors.login}</p>
          )}
          <SubmitBtn
            loading={loading}
            text="Create new account"
            textLoading={"Creating account"}
          />
          <DialogValidEmailForUser
            open={dialogValidEmailForUser}
            onChange={setDialogValidEmailForUser}
            user={user}
          />
        </form>
      </main>
      <footer className="mt-6">
        <FooterBtn text="Already have an account" textLink="login" />
      </footer>
    </div>
  );
}
