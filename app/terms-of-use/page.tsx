import PublicNavBar from "@/components/theme/PublicNavBar";

export default function TermsOfUse() {
  return (
    <>
      <PublicNavBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Use</h1>
        <div className="prose prose-gray">
          <p>
            Welcome to Jobportuneer! By using our app, you agree to these Terms
            of Use.
          </p>
          <h2>1. User Responsibilities</h2>
          <ul>
            <li>Provide accurate and up-to-date information.</li>
            <li>Use the app only for personal and lawful purposes.</li>
          </ul>
          <h2>2. Intellectual Property</h2>
          <p>
            All content, designs, and features of Jobportuneer are protected by
            copyright and other intellectual property laws.
          </p>
          <h2>3. Contact Us</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:support@jobportuneer.com" className="text-primary">
              support@jobportuneer.com
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
