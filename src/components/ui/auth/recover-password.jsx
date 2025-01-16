"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import validateEmail from "@/app/auth/utils/validateEmail";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DialogRecoverPassword({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleValidationErrors = (e) => {
    e.preventDefault();
    let errors = {};
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    const emailValidation = validateEmail(email);
    if (!email || emailValidation !== true) {
      errors.email = emailValidation;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e) {
    if (!handleValidationErrors(e)) return;

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast({
          title: "Error sending link",
          description: data.error || "An unexpected error occurred",
          variant: "destructive",
        });
        throw new Error(data.error || "Error sending link");
      }

      toast({
        title: "Success!",
        description: "Recovery link sent to your email.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Recover Password</DialogTitle>
          <DialogDescription>
            Enter your email below and we'll send you a recovery link.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold" htmlFor="email">
                Email
              </Label>
              {errors.email && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.email}
                </p>
              )}
            </div>
            <Input
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter your email"
              className="placeholder:text-sm text-sm"
              aria-required="true"
            />
          </div>
          <DialogFooter>
            <Button
              className="w-full mt-6"
              aria-label="Receive link"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" />
                  Sending the link, please wait...
                </div>
              ) : (
                <>Receive link</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
