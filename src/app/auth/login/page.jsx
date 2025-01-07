import * as React from "react";

import Link from "next/link";
import Logo from "@/components/logo";
import { ArrowBigRight, ArrowUpRight, ChevronRightIcon } from "lucide-react";

import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <header className="flex items-center justify-between w-full max-w-2xl p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">Login</h1>
          <ChevronRightIcon aria-hidden="true" />
        </div>
        <Logo aria-label="CleverNote logo" />
      </header>
      <p className="text-center text-gray-600 mb-8">
        Welcome back! Log in again, thank you for choosing us.
      </p>
      <main className="w-full max-w-2xl">
        <div className="flex items-center justify-center w-full gap-3 mb-6">
          <Button className="text-sm rounded-full" aria-label="Login with Google">
            <FaGoogle className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button className="text-sm rounded-full" aria-label="Login with GitHub">
            <FaGithub className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
        <Separator />
        <form className="mt-6">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label className="text-sm font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-sm font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                className="placeholder:text-sm text-sm"
                aria-required="true"
              />
            </div>
          </div>
          <Button className="w-full mt-6" aria-label="Log in">
            <ArrowBigRight aria-hidden="true" />
            Log in
          </Button>
        </form>
      </main>
      <footer className="mt-6">
        <Button variant="outline" className="w-full">
          <Link className="flex items-center gap-3" href={"/auth/signup"} aria-label="Go to signup page">
            Create New Account <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
