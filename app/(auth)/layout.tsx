import { ReactNode } from "react";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`bg-dark-1 ${inter.className}`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
