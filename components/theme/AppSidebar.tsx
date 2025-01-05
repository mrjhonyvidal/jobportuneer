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

      {/* Sidebar Footer */}
      <div className="p-6">
        <div className="shadow-lg border border-gray-200 rounded-xl p-4 flex flex-col items-center">
          {/* Image Section */}
          <div className="w-fit h-30 mb-4">
            <Link
              href="https://chrome.google.com/webstore" // Replace with the actual Chrome Web Store link
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={ChromeExtensionImage}
                alt="Chrome Extension"
                className="w-full h-full object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>
          {/* Description */}
          <p className="text-center text-sm">
            Quickly save jobs to your dashboard while browsing.{" "}
          </p>
          <p className="text-center text-sm mt-2">
            <Link
              href="https://chrome.google.com/webstore" // Replace with the actual Chrome Web Store link
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 underline font-medium"
            >
              Soon
            </Link>
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
