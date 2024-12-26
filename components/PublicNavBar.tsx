"use client";
import { useUser } from "@clerk/nextjs"; // Adjust based on your auth provider
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import { useState } from "react";
import { DoorOpen } from "lucide-react";

export default function PublicNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="top-0 mx-auto px-4 sm:px-8 bg-white py-6 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src={Logo}
            alt="Jobportuneer Logo"
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {isSignedIn ? (
            <Button variant="outline" asChild>
              <Link href="/stats">
                <span className="flex items-center space-x-2">
                  <DoorOpen className="w-5 h-5" />
                  <span>Dashboard</span>
                </span>
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/stats">
                <span className="flex items-center space-x-2">
                  <DoorOpen className="w-5 h-5" />
                  <span>Sign In</span>
                </span>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <span className="text-primary font-bold">✕</span>
          ) : (
            <span className="text-primary font-bold">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <nav className="flex flex-col items-center space-y-4">
            {isSignedIn ? (
              <Button variant="outline" asChild>
                <Link href="/stats">
                  <span className="flex items-center space-x-2">
                    <DoorOpen className="w-5 h-5" />
                    <span>Dashboard</span>
                  </span>
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/stats">
                  <span className="flex items-center space-x-2">
                    <DoorOpen className="w-5 h-5" />
                    <span>Sign In</span>
                  </span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
