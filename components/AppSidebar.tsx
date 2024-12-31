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
        <Link href="/jobs">
          <Image
            src={Logo}
            alt="Jobportuneer Logo"
            className="mx-auto cursor-pointer"
          />
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

      {/* Sidebar Footer */}
      <div className="p-6">
        <div className="shadow-sm border border-gray-200 rounded-lg p-4 flex flex-col items-center">
          <h4 className="text-green-700 font-semibold mb-2 text-center">
            Add Jobs While Browsing
          </h4>
          <p className="text-sm text-center mb-4">
            Download Chrome Extension to save jobs directly to your dashboard.
          </p>
          <Link
            href="https://chrome.google.com/webstore" // Replace with the actual link
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
          >
            Install the Extension
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
