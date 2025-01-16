"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Logo from "@/components/ui/logo";
import LayoutErrorPage from "@/components/ui/error-layout";

export default function GlobalErrorPage({
  onRetry = () => window.location.reload(),
  onBackToHome = () => (window.location.href = "/overview"),
}) {
  const error = "An unexpected error occurred";

  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <LayoutErrorPage
      error={error}
      onRetry={onRetry}
      onBackToHome={onBackToHome}
    />
  );
}
