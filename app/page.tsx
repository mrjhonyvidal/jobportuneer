import Image from "next/image";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CircleUserRound, RocketIcon } from "lucide-react";
import PublicFooter from "@/components/PublicFooter";
import PublicNavBar from "@/components/PublicNavBar";

export default function Home() {
  return (
    <main>
      <PublicNavBar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h2 className="capitalize text-4xl md:text-7xl font-bold">
            tired of job <span className="text-secondary">search stress?</span>
          </h2>
          <p className="leading-loose max-w-md mt-4">
            Track your progress, save time, and focus on what matters—landing
            the job.
          </p>
          <div className="flex space-x-4 mt-4">
            <Button asChild>
              <Link href="/add-job">
                <span className="flex items-center space-x-2 font-bold text-lg">
                  <ArrowRight className="w-5 h-5" />
                  <span>Start Tracking</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={LandingImg}
          alt="A person organizing their job hunt"
          className="hidden lg:block"
        />
      </section>
      <PublicFooter />
    </main>
  );
}
