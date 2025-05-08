"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingNav() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <nav
      className={`fixed top-0 w-full p-4 px-8 flex justify-center bg-white ${
        scrollY > 0 ? "shadow-xs border-b" : ""
      }`}
    >
      <div className="max-w-7xl grow ">
        <div className="flex items-center w-full">
          <h1 className="font-bold text-2xl grow">Pager</h1>
          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
