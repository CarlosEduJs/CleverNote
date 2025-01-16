import { useState } from "react";
import validateEmail from "@/app/auth/utils/validateEmail";
import { validatePassword } from "@/app/auth/utils/validatePassword";

export default function useHandleValidateErrors() {
  const [errors, setErrors] = useState({});

  const validateForm = (e, isRegister) => {
    e.preventDefault();
    const errorsData = {};
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (isRegister) {
      const name = formData.get("name");
      if (!name || name.length < 4) {
        errorsData.name = "Name needs at least 4 characters!";
      }
    }

    const emailValidation = validateEmail(email);
    if (!email || emailValidation !== true) {
      errorsData.email = emailValidation;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      errorsData.password = passwordValidation;
    }

    setErrors(errorsData);

    return Object.keys(errorsData).length === 0;
  };

  return { errors, validateForm, setErrors };
}
