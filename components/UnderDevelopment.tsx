import Image from "next/image";
import Collaborators from "../assets/collaborators.svg";
import ProfilePhoto from "../assets/jhony-vidal.jpeg";
import { CheckCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UnderDevelopment() {
  const checklist = [
    "Match your CV to job descriptions with instant keyword suggestions.",
    "Access professionally designed CV templates recruiters love.",
    <>
      One-click formatting fixes to ensure your CV passes{" "}
      <span className="inline-flex items-center space-x-1">
        ATS
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 ml-2 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                ATS (Applicant Tracking System) is software recruiters use to
                filter CVs based on keywords and formatting.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </>,
  ];

  const featureIdeas = [
    {
      title: "📄 CV Helper",
      description: "An intelligent CV-building assistant.",
    },
    {
      title: "📌 Application Tracker",
      description: "Get reminders for follow-ups, interviews, and deadlines.",
    },
    {
      title: "🌟 Interview Prep",
      description:
        "Prepare your interviews with curated question banks, mock interviews, and feedback tools.",
    },
  ];

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 px-4 sm:px-8">
      {/* Help Us Section */}
      <section className="text-center mt-16 mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Let's Build <span className="text-primary"> Jobportuneer</span>{" "}
          Together!
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
          Your support enables us to create tools that make job hunting
          stress-free. Every contribution helps us dedicate time to adding
          features and improving the platform for you and job seekers
          everywhere.
        </p>
        <div className="flex justify-center space-x-6 mt-6">
          <a
            href="https://www.buymeacoffee.com/jobportuneer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            ☕ Buy Me a Coffee
          </a>
          <a
            href="https://ko-fi.com/jobportuneer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition"
          >
            ❤️ Support on Ko-Fi
          </a>
        </div>
        <div className="mt-8">
          <Image
            src={Collaborators}
            alt="Collaboration illustration"
            className="w-64 mx-auto"
          />
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Here's What's Coming
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          These tools are in the works, and with your help, we can launch them
          sooner!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {featureIdeas.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Development */}
      <section className="text-center py-12 bg-gray-100 w-full">
        <h2 className="text-2xl font-bold text-gray-800">CV Helper</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          We&apos;re focusing on features that make creating your CV easier and
          more effective.
        </p>
        <ul className="space-y-4 mt-6 max-w-lg mx-auto text-left">
          {checklist.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 text-gray-700"
            >
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* About Me Section */}
      <section className="text-center mt-16 mb-12">
        <div className="flex flex-col items-center">
          <Image
            src={ProfilePhoto}
            alt="Profile photo of the developer"
            className="w-36 h-36 rounded-full mb-6 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-xl">
            Hi there! 👋 I'm a software developer with over 10 years of
            experience creating apps and solving real-world problems.
            <span className="text-primary"> Jobportuneer</span> is my passion
            project, inspired by my own struggles with job hunting—preparing for
            interviews and making my CV stand out.
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-xl">
            The mission is simple: to make job searching easier, less stressful,
            and more productive. Whether it’s tracking applications, preparing
            for interviews, or updating your CV, Jobportuneer is here to help.
            Your support means the world 🌍 and helps me create even more tools
            to empower job seekers like us. Let’s make job hunting better—
            together! 🚀
          </p>
        </div>
      </section>
    </main>
  );
}
