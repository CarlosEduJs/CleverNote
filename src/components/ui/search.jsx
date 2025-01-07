import { SearchIcon } from "lucide-react";

export default function Searchbar() {
  return (
    <button className="flex items-center justify-between px-2 py-1 border rounded-md min-w-56 hover:bg-gray-500/10">
      <div className="flex items-center gap-2">
        <SearchIcon className="w-4 h-4" />
        <h1 className="text-xs">Search by...</h1>
      </div>
      <div className="flex items-center px-2 py-1 rounded-md text-xs bg-sidebar-accent">
        Ctrl K
      </div>
    </button>
  );
}
