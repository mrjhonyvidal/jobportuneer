import Image from "next/image";
import Collaborators from "../assets/collaborators.svg";
import BmcQR from "../assets/bmc_qr.png";
import ThirdPartyScript from "./ThirdPartyScript";
import AboutJobportuneer from "./AboutJobportuneer";

export default function UnderDevelopment() {
  return (
    <>
      <ThirdPartyScript
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        attributes={{
          "data-name": "BMC-Widget",
          "data-cfasync": "false",
          "data-id": "jobportuneer",
          "data-description": "Support me on Buy me a coffee!",
          "data-message":
            "Thank you for supporting Jobportuneer! Your contribution helps us keep bringing opportunities and innovation to your career journey. Cheers to success and growth – one coffee at a time!",
          "data-color": "#79D6B5",
          "data-position": "Right",
          "data-x_margin": "18",
          "data-y_margin": "18",
        }}
      />
      <main className="flex flex-col items-center min-h-screen bg-gray-50 px-4 sm:px-8">
        {/* Help Us Section */}
        <section className="text-center mt-16 mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Let&apos;s Build <span className="text-primary"> Jobportuneer</span>{" "}
            Together!
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            Your support enables us to create tools that make job hunting
            easier. Every contribution helps us dedicate time to adding features
            and improving the platform for you.
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
          </div>
          {/* QR Code Section */}
          <div className="mt-8 flex flex-col items-center">
            <Image
              src={BmcQR}
              alt="Buy Me a Coffee QR Code"
              className="w-60 h-60" // Adjust size as needed
            />
            <p className="text-sm text-gray-600 mt-4">
              Scan the QR code to support us on{" "}
              <span className="font-bold">Buy Me a Coffee!</span>
            </p>
          </div>
          <div className="mt-8">
            <Image
              src={Collaborators}
              alt="Collaboration illustration"
              className="w-90 mx-auto"
            />
          </div>
        </section>
      </main>
    </>
  );
}
