"use client";

import * as React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { ArrowBigRight, ArrowUpRight, ChevronRightIcon } from "lucide-react";

import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Page() {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("" || null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      }); 

      const data = await response.json();

      console.log(formData);

      if (!response.ok) {
        throw new Error(data.error || "Error creating account");
      }

      router.push("/auth/login");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <header className="flex items-center justify-between w-full max-w-2xl p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">Register</h1>
          <ChevronRightIcon aria-hidden="true" />
        </div>
        <Logo aria-label="CleverNote logo" />
      </header>
      <p className="text-center text-gray-600 mb-8">
        New here? Create your account and organize your work!
      </p>
      <main className="w-full max-w-2xl">
        <div className="flex items-center justify-center w-full gap-3 mb-6">
          <Button
            className="text-sm rounded-full"
            aria-label="Login with Google"
          >
            <FaGoogle className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            className="text-sm rounded-full"
            aria-label="Login with GitHub"
          >
            <FaGithub className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
        <Separator />
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label className="text-sm font-bold" htmlFor="name">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-3">
                <Label className="text-sm font-bold" htmlFor="picture">
                  Avatar
                </Label>
                {imagePreview && (
                  <Avatar>
                    <AvatarImage src={imagePreview} />
                    <AvatarFallback>AVATAR</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <Input
                id="picture"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                aria-label="Upload your avatar"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-sm font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="placeholder:text-sm text-sm"
                aria-required="true"
                aria-describedby="email-helper"
              />
              <small id="email-helper" className="text-xs text-gray-500">
                We'll never share your email.
              </small>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-sm font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Enter your password"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </div>
          </div>
          <Button
            className="w-full mt-6"
            aria-label="Confirm new account"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <ArrowBigRight aria-hidden="true" />
                Confirm new account
              </>
            )}
          </Button>
        </form>
      </main>
      <footer className="mt-6">
        <Button variant="outline" className="w-full">
          <Link
            className="flex items-center gap-3"
            href={"/auth/login"}
            aria-label="Go to login page"
          >
            Already have an account? <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
