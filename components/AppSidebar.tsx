"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenuAction,
} from "@/components/ui/sidebar"; // Ensure these components are available
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/utils/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-muted h-full border-none shadow-none">
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 bg-muted">
        <Link href="/jobs">
          <Image
            src={Logo}
            alt="Jobportuneer Logo"
            className="mx-auto cursor-pointer"
          />
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="bg-muted">
        <SidebarMenu className="mt-5">
          <SidebarGroup>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
