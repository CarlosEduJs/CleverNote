"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Logo from "@/components/logo";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing token.");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Your email has been successfully verified! 🎉");
        } else {
          setStatus("error");
          setMessage(data.error || "Invalid or expired token.");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    validateToken();
  }, [token]);

  return (
    <div className="w-full h-screen flex flex-col items-center py-4">
      <Logo />
      <div className="flex items-center justify-center flex-col gap-3 w-full h-screen">
        {status === "loading" && (
          <>
            <h1 className="text-sm font-bold">
              Validating verification link...
            </h1>
            <div className="w-5 h-5 border border-primary rounded-full animate-ping" />
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-lg font-bold text-green-500">Success!</h1>
            <p className="text-sm">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-lg font-bold text-red-500">
              Verification Failed
            </h1>
            <p className="text-sm">{message}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
