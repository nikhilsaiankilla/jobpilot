"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/store";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { use, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useSelector((state: RootState) => state?.auth);

  return (
    <header className="w-full padding py-2 flex items-center justify-between bg-transparent">
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

      <div className="flex items-center gap-2">     {
        user
          ?
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          :
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/auth/login" className="text-sm text-primary">
              Login
            </Link>
            <Button className="bg-primary">Sign In</Button>
          </div>
      }
        <ThemeToggle />
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

        {
          user
            ?
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            :
            <div className="flex flex-col justify-center gap-4 items-center">
              <Link href="/login" className="text-sm text-primary">
                Login
              </Link>
              <Button className="bg-primary">Sign In</Button>
            </div>
        }

        <ThemeToggle />
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
