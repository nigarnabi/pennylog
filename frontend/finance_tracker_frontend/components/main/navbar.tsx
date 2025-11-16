"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold text-primary">
            Penny Log
          </Link>

          <div className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>

            <Link
              href="#learn"
              className="text-foreground hover:text-primary transition-colors"
            >
              Learn
            </Link>
          </div>
        </div>

        {/* Right Side: Auth Actions */}
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
          >
            <Link href="/login">Log in</Link>
          </Button>

          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
          >
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
