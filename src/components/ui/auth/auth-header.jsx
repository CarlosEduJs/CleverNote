import { ChevronRightIcon } from "lucide-react";
import Logo from "../logo/index";

export default function AuthHeader({ title }) {
  return (
    <header className="flex items-center justify-between gap-3 px-5 py-2 bg-background fixed top-0 left-0 border-b w-screen">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <ChevronRightIcon aria-hidden="true" />
      </div>
      <Logo aria-label="CleverNote logo" />
    </header>
  );
}
