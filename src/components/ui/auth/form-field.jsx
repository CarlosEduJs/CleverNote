import { Label } from "@/components/ui/label";

export default function FormField({ children, label, error, helper }) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-bold">{label}</Label>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {children}
      {helper && <small className="text-xs">{helper}</small>}
    </div>
  );
}
