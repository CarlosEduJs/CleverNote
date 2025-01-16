"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ListIcon, SettingsIcon, Layers2Icon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./logo/index";
import NavUser from "./nav-user";
import UserAvatar from "@/components/ui/useravatar";

const items = [
  {
    navTitle: "Overview",
    icon: HomeIcon,
    href: "/overview",
  },
  {
    navTitle: "Categories",
    icon: Layers2Icon,
    href: "/overview/categories",
  },
  {
    navTitle: "Notes",
    icon: ListIcon,
    href: "/overview/notes",
  },
  {
    navTitle: "Settings",
    icon: SettingsIcon,
    href: "/overview/settings",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const isItemHref = (href) => pathname === href;
  const { open } = useSidebar();

  return (
    <Sidebar
      as="nav"
      aria-labelledby="sidebar-title"
      collapsible="icon"
      className="border-none"
    >
      <SidebarContent className="bg-background md:pt-14 sm:py-5 max-md:py-3 ">
        <SidebarGroup>
          <div className="block md:hidden px-2">
            <Logo />
          </div>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <SidebarMenuButton asChild>
                    <div
                      role="menuitem"
                      aria-current={isItemHref(item.href) ? "page" : undefined}
                      className={`flex justify-between items-center gap-2 p-2 rounded-md transition-all duration-200  ${
                        isItemHref(item.href)
                          ? "bg-blue-500 text-white "
                          : "hover:bg-sidebar-accent"
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        <item.icon className="w-4 h-4" aria-hidden="true" />
                        <span>{item.navTitle}</span>
                      </div>
                      {isItemHref(item.href) && (
                        <div
                          className="w-1 h-full rounded-l-full bg-white"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </SidebarMenuButton>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto">{!open ? <UserAvatar /> : <NavUser />}</SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
