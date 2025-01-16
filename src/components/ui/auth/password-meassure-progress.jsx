import { Progress } from "@/components/ui/progress";

export default function PasswordMeasureProgress({ passwordStrength }) {
  const strengthData = [
    {
      strength: "Password Strength",
      indicatorBg: "bg-transparent",
      score: 0,
    },
    {
      strength: "Weak Password",
      indicatorBg: "bg-red-500",
      score: 25,
    },
    {
      strength: "Medium Password",
      indicatorBg: "bg-yellow-500",
      score: 75,
    },
    {
      strength: "Strong Password",
      indicatorBg: "bg-green-500",
      score: 100,
    },
  ];

  const strength = strengthData.find(
    (item) => item.strength === passwordStrength
  );

  return (
    <div className="flex flex-col gap-2">
      <Progress value={strength.score} bgIndicator={strength.indicatorBg} />
      <h1 className="text-sm font-medium">{strength.strength}</h1>
    </div>
  );
}
