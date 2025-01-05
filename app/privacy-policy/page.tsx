import PublicNavBar from "@/components/theme/PublicNavBar";

export default function PrivacyPolicy() {
  return (
    <>
      <PublicNavBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-gray">
          <p>
            At Jobportuneer, your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your personal
            information.
          </p>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              Personal Information: Name, email address, and account details.
            </li>
            <li>
              Job Data: Information about your job applications and notes.
            </li>
            <li>
              Usage Data: Analytics data, such as browser type and usage
              patterns.
            </li>
          </ul>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve our app’s features.</li>
            <li>To send notifications and updates about your account.</li>
            <li>To analyze user behavior to enhance user experience.</li>
          </ul>
          <h2>3. Contact Us</h2>
          <p>
            For questions about this policy, contact us at{" "}
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
