import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingNav({
  showLogin = true,
  showSignup = true,
}: {
  showLogin?: boolean;
  showSignup?: boolean;
}) {
  return (
    <nav className="fixed top-0 w-full p-4 px-8 flex justify-center bg-white">
      <div className="max-w-7xl grow">
        <div className="flex items-center w-full">
          <div className="grow">
            <Link href="/">
              <h1 className="font-semibold text-2xl">Pager</h1>
            </Link>
          </div>
          <div className="space-x-4">
            {showLogin && (
              <Link href="/auth/login">
                <Button variant="outline">Log in</Button>
              </Link>
            )}
            {showSignup && (
              <Link href="/auth/signup">
                <Button variant={showLogin ? "default" : "outline"}>
                  Sign up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
