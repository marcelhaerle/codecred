import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-400">CodeCred</Link>
      <LogoutButton />
    </nav>
  );
}
