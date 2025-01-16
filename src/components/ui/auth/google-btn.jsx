import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import DialogLoading from "../dialogs/loading";

export default function GoogleBtn({ onClick, loading, onChange, mode }) {
  return (
    <div>
      <Button
        onClick={onClick}
        type="button"
        disabled={loading}
        className="text-sm rounded-xl"
        aria-label={mode + "with google"}
      >
        <FaGoogle size={10} />
        {mode + " with google"}
      </Button>
      <DialogLoading
        open={loading}
        onChange={onChange}
        description={"Redirecting you to the google authentication page..."}
      />
    </div>
  );
}
