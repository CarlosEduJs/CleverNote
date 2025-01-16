import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "../logo/index";

export default function DialogLoading({ open, onChange, description }) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="md:max-w-[450px] ">
        <DialogHeader>
          <Logo />
          <DialogTitle className="font-bold tracking-widest text-center">Wait...</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex items-center justify-between">
          <span>{description}</span>
          <Loader2 className="animate-spin" />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
