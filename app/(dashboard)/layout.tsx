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
      <main className="grid lg:grid-cols-6 min-h-screen">
        {/* Sidebar: hidden on small screens */}
        <div className="hidden lg:block lg:col-span-1 bg-muted">
          <SidebarProvider
            style={
              {
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
              } as React.CSSProperties
            }
          >
            <AppSidebar />
          </SidebarProvider>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex-1 py-8 px-4 sm:px-8 lg:px-16">{children}</div>
        </div>

        {/* Optional right column */}
        {/* <div className="hidden lg:block lg:col-span-1 bg-muted"></div> */}
      </main>
    </>
  );
}

export default Layout;
