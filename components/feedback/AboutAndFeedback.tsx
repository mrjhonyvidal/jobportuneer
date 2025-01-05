import Image from "next/image";
import { Linkedin, Github, Globe, Coffee } from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import profilePhoto from "../../assets/jhony-vidal-profile-photo.jpg";
import BmcQR from "../../assets/bmc_qr.png";

export default function AboutAndFeedback() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-8">
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
            <h2 className="text-3xl font-bold  text-center lg:text-left mt-4">
              Hi there
            </h2>
          </div>

          {/* Content */}
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            Job hunting can be exhausting—polishing CVs, tracking applications,
            and preparing for interviews.
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            That’s why I built{" "}
            <span className="text-primary">Jobportuneer</span>—to help you stay
            organized, track your progress, and land your next opportunity.
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed text-center lg:text-left">
            In London? Let’s grab a coffee and chat about tech,
            entrepreneurship, or your next career move.
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
        </section>

        {/* Feedback Section */}
        <section className="p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className=" p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-2xl font-semibold text-gray-800">
              Your Feedback Matters
            </h3>
            <p className="text-gray-600 mt-2">
              Help me improve Jobportuneer! I’d love to hear your thoughts.
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
