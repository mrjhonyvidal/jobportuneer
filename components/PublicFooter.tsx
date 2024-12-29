import Link from "next/link";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
        <p>
          © {currentYear} Made with{" "}
          <span className="text-primary">&hearts;</span> by Jhony Vidal.
        </p>
        <nav className="flex justify-center space-x-4 mt-4">
          <Link href="/privacy-policy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="hover:text-primary">
            Terms of Use
          </Link>
          <Link href="/cookies-policy" className="hover:text-primary">
            Cookies Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
