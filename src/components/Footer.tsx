import Link from "next/link";

export default function Footer() {
  const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

  return (
    <footer className="border-t border-gray-900 bg-gray-950">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2025 CodeCred. All rights reserved.</p>
      </div>
      {isSaas && (
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
          <Link href="/terms-of-use" className="text-gray-400 hover:text-white hover:underline">
            Terms of Use
          </Link>
          <span className="mx-2">|</span>
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link href="/impressum" className="text-gray-400 hover:text-white hover:underline">
            Impressum
          </Link>
        </div>
      )}
    </footer>
  );
}
