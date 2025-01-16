"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import LayoutErrorPage from "@/components/ui/error-layout";

export default function AuthErrorPage({
  onRetry = () => window.location.reload(),
  onBackToHome = () => (window.location.href = "/auth/login"),
}) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    console.error("Auth Error:", error);
  }, [error]);

  return (
    <LayoutErrorPage
      error={error}
      onRetry={onRetry}
      onBackToHome={onBackToHome}
    />
  );
}
