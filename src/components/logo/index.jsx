import Icon from "./icon";

import { lexend } from "../fonts";

export default function Logo({ isHeader }) {
  return (
    <div className="flex items-center gap-3 font-extrabold text-xl">
      <Icon />
      <h1
        className={` ${isHeader ? "max-md:sr-only md:block" : ""} ${
          lexend.className
        }`}
      >
        CleverNote
      </h1>
    </div>
  );
}
