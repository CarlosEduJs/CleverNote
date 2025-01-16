import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "../logo/index";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DialogValidEmailForUser({ user, open, onChange }) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="md:max-w-[450px] ">
        <DialogHeader>
          <Logo />
          <DialogTitle className="font-bold">Confirm you email</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <span className="text-sm">
            Hello <strong>{user.name}</strong>, please, for security measures,
            we send an email validation link to your email:
            <span className="font-bold hover:underline ml-2">{user.email}</span>
          </span>
        </DialogDescription>
        <Button
          className="text-sm"
          onClick={() => {
            onChange(false);
            router.push("/auth/login");
          }}
        >
          Close and redirect to login page
        </Button>
      </DialogContent>
    </Dialog>
  );
}
