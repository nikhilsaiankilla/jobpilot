"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="w-full padding py-2 flex items-center justify-between bg-background">
      {/* Logo */}
      <Link href="/" aria-label="JobPilot Home">
        <Image
          src="/logo.png"
          alt="JobPilot Logo"
          width={80}
          height={180}
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex items-center justify-center gap-4"
        aria-label="Main Navigation"
      >
        <Link href="/" className="text-sm text-primary">
          Home
        </Link>
        <Link href="/about" className="text-sm text-primary">
          About
        </Link>
        <Link href="/pricing" className="text-sm text-primary">
          Pricing
        </Link>
        <Link href="/features" className="text-sm text-primary">
          Features
        </Link>
        <Link href="/contact" className="text-sm text-primary">
          Contact
        </Link>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-4 items-center">
        <Link href="/auth/login" className="text-sm text-primary">
          Login
        </Link>
        <Button className="bg-primary">Sign In</Button>
        <ThemeToggle/>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden flex flex-col items-center gap-4 bg-secondary w-full absolute left-0 pt-20 py-10 transition-all duration-300 ease-in-out ${showNav ? "top-0 opacity-100" : "top-[-300px] opacity-0 z-10"
          }`}
        aria-label="Mobile Navigation"
      >
        <Link href="/" className="text-sm text-primary" onClick={() => setShowNav(false)}>
          Home
        </Link>
        <Link href="/about" className="text-sm text-primary" onClick={() => setShowNav(false)}>
          About
        </Link>
        <Link href="/pricing" className="text-sm text-primary" onClick={() => setShowNav(false)}>
          Pricing
        </Link>
        <Link href="/features" className="text-sm text-primary" onClick={() => setShowNav(false)}>
          Features
        </Link>
        <Link href="/contact" className="text-sm text-primary" onClick={() => setShowNav(false)}>
          Contact
        </Link>

        <div className="flex flex-col justify-center gap-4 items-center">
          <Link href="/login" className="text-sm text-primary">
            Login
          </Link>
          <Button className="bg-primary">Sign In</Button>
        </div>

        <ThemeToggle/>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden absolute right-5 top-3.5 z-10 text-foreground"
        onClick={() => setShowNav(!showNav)}
        aria-label="Toggle navigation menu"
      >
        {showNav ? <X size={22} /> : <MenuIcon size={22} />}
      </button>
    </header>
  );
};

export default Navbar;
