import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mission Control Suite",
  description: "AI Agent Mission Management",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root" style={{ display: "flex", minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
