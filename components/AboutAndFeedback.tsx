import Image from "next/image";
import { Linkedin, Github, Globe, Coffee } from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import profilePhoto from "../assets/jhony-vidal-profile-photo.jpg";
import BmcQR from "../assets/bmc_qr.png";

export default function AboutAndFeedback() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 px-4 sm:px-8">
      {/* Content Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full py-16">
        {/* About Section */}
        <section className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center lg:items-start">
          {/* Card Header with Profile Image */}
          <div className="flex flex-col items-center w-full mb-6">
            <div className="relative w-24 h-24 lg:w-64 lg:h-64">
              <Image
                src={profilePhoto}
                alt="Jhony Vidal"
                className="rounded-full border-4 border-primary shadow-lg object-cover"
                layout="fill"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left mt-4">
              Hi there
            </h2>
          </div>

          {/* Content */}
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            We all know how challenging job hunting can be—polishing CVs,
            tracking applications, preparing for interviews. It’s exhausting!
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            That’s why I created{" "}
            <span className="text-primary">Jobportuneer</span>. a tool to help
            you stay organized, track your progress, and focus on landing your
            next opportunity.
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            Let’s connect! If you’re in London 🇬🇧, I’d love to grab a coffee and
            chat about tech, entrepreneurship, or your next career move.
          </p>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start space-x-6 mt-6">
            <a
              href="https://www.linkedin.com/in/jhony-vidal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Linkedin size={32} />
            </a>
            <a
              href="https://github.com/mrjhonyvidal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900"
            >
              <Github size={32} />
            </a>
            <a
              href="https://trailblazergarage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700"
            >
              <Globe size={32} />
            </a>
          </div>

          {/* Support Jobportuneer Section */}
          <div className="mt-8 text-center lg:text-left">
            {/* Section Heading */}
            <h3 className="text-xl font-semibold text-gray-800">
              Support <span className="text-primary">Jobportuneer</span>
            </h3>

            {/* Description */}
            <p className="text-gray-600 mt-2">
              Your contribution helps keep this service free and makes new
              features possible, like:
            </p>

            {/* Features List */}
            <ul className="list-disc pl-6 text-gray-600 mt-2">
              <li>Organizing interviews for better visibility;</li>
              <li>Discovering local networking events nearby;</li>
              <li>
                Adding AI-powered tools to save you time in your job search and
                preparation;
              </li>
              <li>Much more—sky is the limit!</li>
            </ul>

            {/* QR Code and Call to Action */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mt-4 space-y-4 lg:space-y-0 lg:space-x-6">
              {/* QR Code */}
              <Image
                src={BmcQR}
                alt="Buy Me a Coffee QR Code"
                className="w-60 h-60" // Adjust size as needed
              />

              {/* Text and Button */}
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-600">
                  Scan the QR code to support me on{" "}
                </p>

                <a
                  href="https://buymeacoffee.com/jobportuneer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:justify-start space-x-2 text-primary hover:text-secondary mt-2"
                >
                  <Coffee size={24} />
                  <span className="text-lg font-semibold">Buy Me a Coffee</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-2xl font-semibold text-gray-800">
              Share Your Feedback
            </h3>
            <p className="text-gray-600 mt-2">
              Your feedback helps improve Jobportuneer. Let us know how we’re
              doing!
            </p>
            <div className="mt-4 flex-grow">
              <FeedbackForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
