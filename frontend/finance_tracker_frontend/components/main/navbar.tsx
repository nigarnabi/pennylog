"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/utils"; // ⬅️ use your helper
import { on } from "events";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean | null }) {
  const router = useRouter();
  const onLogoutClick = async () => {
    await handleLogout();
    router.push("/login");
  };
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
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/profile">Profile</Link>
              </Button>

              <Button
                type="button"
                onClick={onLogoutClick}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full"
              >
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
