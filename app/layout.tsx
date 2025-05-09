import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components/AuthProvider";
import { toUser } from "@/lib/auth.client";
import { getTokensFromCookies } from "@/lib/auth.server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pager",
  description: "A quick way to reach people, without fuss.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokens = await getTokensFromCookies(await cookies());

  const user = tokens ? toUser(tokens) : null;
  console.log("User:", user);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        <AuthProvider user={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
