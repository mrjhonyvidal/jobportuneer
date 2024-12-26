import Image from "next/image";
import LandingImg from "../assets/main.svg";
import FeatureTrack from "../assets/feature-track.svg";
import FeatureCV from "../assets/feature-cv.svg";
import FeatureInterview from "../assets/feature-interview.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CircleUserRound, RocketIcon } from "lucide-react";
import PublicFooter from "@/components/PublicFooter";
import PublicNavBar from "@/components/PublicNavBar";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      <PublicNavBar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            tired of job <span className="text-primary">search stress?</span>
          </h1>
          <p className="leading-loose max-w-md mt-4 text-gray-700">
            Track your progress, save time, and focus on what matters—landing
            the job.
          </p>
          <div className="flex space-x-4 mt-4">
            <Button asChild>
              <Link href="/add-job">
                <span className="flex items-center space-x-2">
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

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Take Control of Your Job Hunt.
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Track your applications, perfect your CV, and get interview-ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Image src={FeatureTrack} alt="Track Applications" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Track Applications
              </h3>
              <p className="mt-2 text-gray-600">
                Know exactly where you&apos;ve applied and wha&apos;s next. No
                more scattered notes or forgotten follow-ups.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Image src={FeatureCV} alt="Perfect Your CV" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Perfect Your CV
              </h3>
              <p className="mt-2 text-gray-600">
                Build a CV that stands out and makes an impression on
                recruiters.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Image src={FeatureInterview} alt="Ace Interviews" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Ace Interviews
              </h3>
              <p className="mt-2 text-gray-600">
                Feel confident and prepared for your next big interview.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h3 className="text-2xl font-semibold">
            Ready to take control of your job search?
          </h3>
          <p className="mt-4 text-gray-100">
            Join thousands of job seekers who&apos;ve simplified their search.
            No costs, no hassle.
          </p>
          <Button variant="secondary" asChild className="mt-6">
            <Link href="/add-job">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Real Stories from Job Seekers Like You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Testimonial 1 */}
            <blockquote className="bg-white p-6 shadow-md rounded-lg flex items-start space-x-4">
              <div className="w-24 h-12 bg-gray-100 rounded-full flex justify-center items-center">
                <CircleUserRound className="text-gray-500" />
              </div>
              <div>
                <p className="text-gray-600">
                  &quot;I used to spend hours keeping track of my applications.
                  Now it&apos;s all in one place—and I got the job!&quot;
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-500">– Alex R.</span>
                  <div className="ml-2 flex">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <span
                          key={i}
                          className="text-green-500 text-lg leading-none"
                        >
                          ★
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </blockquote>
            {/* Testimonial 2 */}
            <blockquote className="bg-white p-6 shadow-md rounded-lg flex items-start space-x-4">
              <div className="w-24 h-12 bg-gray-100 rounded-full flex justify-center items-center">
                <CircleUserRound className="text-gray-500" />
              </div>
              <div>
                <p className="text-gray-600">
                  &quot;The reminders and tools helped me stay focused and
                  prepared. I finally feel in control of my job hunt.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-500">– Sam W.</span>
                  <div className="ml-2 flex">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <span
                          key={i}
                          className="text-green-500 text-lg leading-none"
                        >
                          ★
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
