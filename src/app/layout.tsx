import type { Metadata } from "next";

import "./globals.css";

import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "CodeCred",
  description: "Your hub for developer reputation and contributions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#101828" />
      </head>
      <body
        className="bg-gray-950 text-gray-200 antialiased"
      >
        <Providers>
          <main className="bg-gray-950 min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
