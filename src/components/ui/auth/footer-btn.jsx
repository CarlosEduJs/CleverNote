import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function FooterBtn({ text, textLink }) {
  return (
    <Button variant="outline" className="w-full">
      <Link
        className="flex items-center gap-3 "
        href={`/auth/${textLink}`}
        aria-label={`Go to ${text} page`}
      >
        {text}? <ArrowUpRight aria-hidden="true" />
      </Link>
    </Button>
  );
}
