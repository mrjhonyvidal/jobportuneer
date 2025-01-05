import PublicNavBar from "@/components/theme/PublicNavBar";

export default function CookiesPolicy() {
  return (
    <>
      <PublicNavBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl font-bold  mb-6">Cookies Policy</h1>
        <div className="prose prose-gray">
          <p>
            Jobportuneer uses cookies to enhance your experience. By using our
            app, you agree to the use of cookies as described in this policy.
          </p>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device to improve user
            experience.
          </p>
          <h2>2. Types of Cookies We Use</h2>
          <ul>
            <li>Essential Cookies: Necessary for app functionality.</li>
            <li>Performance Cookies: Help us analyze app performance.</li>
            <li>Preference Cookies: Remember your settings and preferences.</li>
          </ul>
          <h2>3. Contact Us</h2>
          <p>
            For questions about our cookies, contact us at{" "}
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
