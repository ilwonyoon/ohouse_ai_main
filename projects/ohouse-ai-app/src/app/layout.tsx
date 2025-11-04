import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { EmotionProvider } from "./emotion-provider";

export const metadata: Metadata = {
  title: "Ohouse AI - Interior Design Assistant",
  description: "AI-powered interior design recommendations for your home",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}
