"use client";

import LinksDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import PreferencesPage from "./PreferencePage";
import { Bell, BellDotIcon } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between shadow-sm">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/">
          <UserButton.UserProfilePage
            label="Notifcations"
            url="preferences"
            labelIcon={<Bell />}
          >
            <PreferencesPage />
          </UserButton.UserProfilePage>
          {/* <UserButton.UserProfileLink
            label="Preferences2"
            url="preferences"
            labelIcon={<BellDotIcon />}
          /> */}
        </UserButton>
      </div>
    </nav>
  );
}
export default Navbar;
