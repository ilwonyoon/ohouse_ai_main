import type { Metadata } from "next";
import { RootLayoutClient } from "./layout-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Consultant",
  description: "AI-powered consultant application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
