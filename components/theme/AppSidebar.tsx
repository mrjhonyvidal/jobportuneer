"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import Logo from "@/assets/logo.svg";
import ChromeExtensionImage from "@/assets/chrome-extension.webp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/utils/links";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="h-full shadow-md bg-white flex flex-col justify-between">
      {/* Sidebar Header */}
      <SidebarHeader className="p-6 text-white">
        <Link href="/jobs" className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt="Jobportuneer Logo"
            className="cursor-pointer"
          />
          <span className="text-sm font-semibold bg-yellow-300 text-black px-2 py-0.5 rounded-md">
            Beta
          </span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="flex-grow">
        <SidebarMenu className="mt-6">
          <SidebarGroup>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-6 py-3 rounded transition ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
