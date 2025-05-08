import Link from "next/link";
import { Button } from "@/components/ui/button";

import LandingNav from "./LandingNav";
import graphicImg from "@/public/landing/graphic.png";

export default function Landing() {
  return (
    <>
      <LandingNav />
      <div className="min-h-screen w-full flex justify-center">
        <div className="grid lg:grid-cols-3 w-full max-w-6xl">
          <div className="flex flex-col lg:col-span-2 items-left justify-center p-6 sm:p-12 md:p-18 xl:p-6 space-y-4 sm:space-y-6 ">
            <div className="flex text-sm sm:text-base">
              <p>🚧 Pager is currently under construction.</p>
            </div>
            <div className="space-y-4">
              <h2 className="font-semibold text-3xl sm:text-5xl leading-tight">
                Reach people quickly,
                <br />
                without fuss.
              </h2>
              <p className="sm:text-lg text-muted-foreground">
                Keep your team on the same page, update your event attendees.
                <span className="sm:hidden"> </span>
                <br className="hidden sm:block" />
                Let us worry about delivering your message.
              </p>
            </div>
            <div className="flex mt-8 sm:mt-0">
              <Link href="/auth/signup">
                <Button className="text-lg px-8 py-5">Get started</Button>
              </Link>
            </div>
          </div>
          <div
            className="w-full h-full bg-origin-content bg-contain bg-no-repeat bg-center p-18 pl-0 hidden lg:block"
            style={{ backgroundImage: `url(${graphicImg.src})` }}
          ></div>
        </div>
      </div>
    </>
  );
}
