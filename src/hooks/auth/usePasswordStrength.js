import { useState } from "react";
import { measurePasswordComplexity } from "@/app/auth/utils/validatePassword";

export const usePasswordStrength = () => {
  const [measurePassword, setMeasurePassword] = useState("Password Strength");

  const handleOnChangeMeasurePassword = (value) => {
    const complexity = measurePasswordComplexity(value);
    setMeasurePassword(complexity);
  };

  return { measurePassword, handleOnChangeMeasurePassword };
};
