"use client";

import * as React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  UserIcon,
  SettingsIcon,
  Alert,
  MegaphoneIcon,
  LogOutIcon,
} from "lucide-react";

const optsDropdown = [
  {
    optName: "You profile",
    icon: UserIcon,
    href: "/profile",
  },
  {
    optName: "Settings",
    icon: SettingsIcon,
    href: "/overview/settings",
  },
  {
    optName: "Notifications",
    icon: MegaphoneIcon,
    href: "/overview/notifications",
  },
];

export default function UserAvatar() {
  return (
    <DropdownMenu className="bg-transparent">
      <DropdownMenuTrigger asChild >
        <Avatar >
          <AvatarImage
            className="cursor-pointer"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 min-w-56">
        <div className="flex items-center gap-2 p-1">
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <h1 className="text-sm font-medium">shadcn</h1>
            <h2 className="text-xs font-medium">m@gmail.com</h2>
          </div>
        </div>
        <DropdownMenuSeparator/>
        {optsDropdown.map((opt) => (
          <Link key={opt.href} href={opt.href}>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              <opt.icon className="w-4 h-4" />
              <h1 className="text-sm font-medium">{opt.optName}</h1>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <Link href={"/logout"}>
          <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
            <LogOutIcon className="w-4 h-4" />
            <h1 className="text-sm font-medium">Logout</h1>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
