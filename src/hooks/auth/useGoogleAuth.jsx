import { useState } from "react";
import { signIn } from "next-auth/react";

export const useGoogleAuth = () => {
  const [dialogLoading, setDialogLoading] = useState(false);

  const signWithGoogle = () => {
    setDialogLoading(true);
    signIn("google", { callbackUrl: `${window.location.origin}/overview` });
  };

  return {
    dialogLoading,
    setDialogLoading,
    signWithGoogle,
  };
};
