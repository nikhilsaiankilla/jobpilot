import { Github, Linkedin, TwitterIcon} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background w-full text-foreground padding py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* App Name & Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">The JobPilot</h2>
          <p className="text-sm opacity-80">© {new Date().getFullYear()} The JobPilot. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/features" className="hover:underline">Features</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300 transition"><TwitterIcon size={20} /></Link>
          <Link href="/" className="hover:text-gray-300 transition"><Github size={20} /></Link>
          <Link href="/" className="hover:text-gray-300 transition"><Linkedin size={20} /></Link>
        </div>

      </div>
    </footer>
  );
}
