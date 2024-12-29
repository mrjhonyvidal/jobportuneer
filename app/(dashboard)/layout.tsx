import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Ensure correct path to SidebarProvider
import AppSidebar from "@/components/AppSidebar";

import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <main className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar: hidden on small screens */}
        <div className="hidden lg:flex">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full lg:w-4/5 flex flex-col">
          <div className="flex-1 py-4 sm:py-8 px-4 sm:px-8 lg:px-16">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
