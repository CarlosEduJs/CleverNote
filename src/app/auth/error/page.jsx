"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LayoutErrorPage from "@/components/ui/error-layout";

function ErrorPageContent({
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

export default function AuthErrorPage({ props }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      }
    >
      <ErrorPageContent {...props} />
    </Suspense>
  );
}
