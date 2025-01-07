"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const items = [
    {
      title: "Light",
      action: () => setTheme("light"),
      icon: Sun
    },
    {
      title: "Dark",
      action: () => setTheme("dark"),
      icon: Moon
    },
    {
      title: "System",
      action: () => setTheme("system"),
      icon: Laptop
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-none" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.title} onClick={item.action} className="flex items-center gap-2">
            <item.icon className="w-4 h-4"/>
            <h1 className="text-sm">{item.title}</h1>
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
