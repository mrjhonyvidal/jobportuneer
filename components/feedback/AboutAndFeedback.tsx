import Image from "next/image";
import { Linkedin, Github, Globe } from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import profilePhoto from "../../assets/jhony-vidal-profile-photo.jpg";

export default function AboutAndFeedback() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-8 bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-200 transition-colors">
      <div className="max-w-4xl w-full py-16 space-y-12">
        {/* About Section */}
        <section className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative w-28 h-28 sm:w-40 sm:h-40">
            <Image
              src={profilePhoto}
              alt="Jhony Vidal"
              className="rounded-full border-4 border-yellow-500 shadow-lg object-cover"
              layout="fill"
              priority
            />
          </div>

          {/* Intro Content */}
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Hi there 👋</h2>
          <p className="mt-4 leading-relaxed">
            Job hunting can be tough—juggling CVs, tracking applications, and
            preparing for interviews. That’s why I created{" "}
            <span className="text-primary font-semibold">Jobportuneer</span>.
            This app helps you organize your progress and land your next big
            opportunity!
          </p>
          <p className="mt-4 leading-relaxed">
            I built this during my weekends—an exciting journey of passion and
            learning. If you’re in London, let’s grab a coffee and talk about
            tech, entrepreneurship, or your career!
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://www.linkedin.com/in/jhony-vidal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <Linkedin size={32} />
            </a>
            <a
              href="https://github.com/mrjhonyvidal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
            >
              <Github size={32} />
            </a>
            <a
              href="https://trailblazergarage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <Globe size={32} />
            </a>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center">
            Your Feedback Matters 🌟
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            I’d love to hear your thoughts about Jobportuneer. Your feedback
            helps make this app better for you and others.
          </p>
          <FeedbackForm />
        </section>
      </div>
    </main>
  );
}
