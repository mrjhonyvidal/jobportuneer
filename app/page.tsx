import Image from "next/image";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicFooter from "@/components/PublicFooter";
import PublicNavBar from "@/components/PublicNavBar";

export default function Home() {
  return (
    <main>
      <PublicNavBar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-screen flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Track Your<span className="text-green-600"> Job Search.</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-6 leading-relaxed max-w-md">
            Save your progress and manage every application, interview, and
            deadline—all in one place.
          </p>
          <div className="flex space-x-4 mt-8">
            <Button
              asChild
              className="px-6 py-3 text-lg font-bold bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg shadow-md"
            >
              <Link href="/jobs">
                <span className="flex items-center space-x-2">
                  <ArrowRight className="w-6 h-6" />
                  <span>Start Tracking</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden lg:flex justify-end">
          <Image
            src={LandingImg}
            alt="A person organizing their job hunt"
            className="max-w-sm lg:max-w-md"
            priority
          />
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
