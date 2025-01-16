import { lexend } from "@/components/fonts";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <main className={`w-screen h-screen ${lexend.className}`}>
      {children}
      <Toaster />
    </main>
  );
}
