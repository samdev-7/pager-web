import Link from "next/link";
import LandingNav from "./LandingNav";

import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <>
      <LandingNav />
      <div className="min-h-screen grid grid-cols-2 w-full">
        <div className="flex flex-col items-left justify-center p-12 space-y-6">
          <div className="flex">
            <p>🚧 Pager is currently under construction.</p>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-5xl leading-tight">
              Reach people quickly,
              <br />
              without fuss.
            </h2>
            <p className="text-lg text-muted-foreground">
              Keep your team on the same page, notify your event attendees.
              <br />
              Let us worry about delivering your message.
            </p>
          </div>
          <div className="flex">
            <Link href="/auth/signup">
              <Button className="text-lg px-8 py-5">Get started</Button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
