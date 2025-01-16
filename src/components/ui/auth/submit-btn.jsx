import { ArrowBigRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubmitBtn({ loading, text, textLoading }) {
  return (
    <Button
      className="w-full mt-6"
      aria-label="Confirm new account"
      type="submit"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin" />
          {textLoading}, wait...
        </div>
      ) : (
        <>
          <ArrowBigRight aria-hidden="true" />
          {text}
        </>
      )}
    </Button>
  );
}
