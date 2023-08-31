import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  BottomBar,
  LeftSideBar,
  RightSideBar,
  TopBar,
} from "@/components/shared";
import { useLoggedUser } from "@/hooks/useLoggedUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Threads Application",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { dbUser } = await useLoggedUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar loggedUserId={dbUser._id.toString()} />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
