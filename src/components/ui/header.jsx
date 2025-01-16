import Logo from "./logo/index";
import Searchbar from "./search";
import { ModeToggle } from "./mode-toggle";
import UserAvatar from "./useravatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-3 z-20 px-5 py-2 bg-background fixed top-0 left-0 border-b w-screen">
      <Logo isHeader={true} />
      <div className="flex items-center gap-3">
        <Searchbar />
        <ModeToggle />
        <UserAvatar />
      </div>
    </header>
  );
}
