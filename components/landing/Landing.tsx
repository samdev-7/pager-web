import Link from "next/link";
import Image, { getImageProps } from "next/image";
import { Button } from "@/components/ui/button";

import LandingNav from "./LandingNav";
import graphicImg from "@/public/landing/graphic.png";

export default function Landing() {
  return (
    <>
      <LandingNav />
      <div className="min-h-screen w-full flex justify-center">
        <div className="grid grid-cols-2 w-full max-w-6xl ">
          <div className="flex flex-col items-left justify-center p-6 space-y-6">
            <div className="flex">
              <p>🚧 Pager is currently under construction.</p>
            </div>
            <div className="space-y-4">
              <h2 className="font-semibold text-5xl leading-tight">
                Reach people quickly, without fuss.
              </h2>
              <p className="text-lg text-muted-foreground">
                Keep your team on the same page, update your event attendees.
                Let us worry about delivering your message.
              </p>
            </div>
            <div className="flex">
              <Link href="/auth/signup">
                <Button className="text-lg px-8 py-5">Get started</Button>
              </Link>
            </div>
          </div>
          <div
            className="w-full h-full bg-origin-content bg-contain bg-no-repeat bg-center p-30"
            style={{ backgroundImage: `url(${graphicImg.src})` }}
          ></div>
        </div>
      </div>
    </>
  );
}
