import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProviders } from "@/utils/theme-provider";

const metadata: Metadata = {
  title: "React Prodigy | Learn Anytime, Anywhere with Expert-Led Courses",
  description:
    "Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const Josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${Josefin.variable} antialiased bg-no-repeat bg-white container`}
      >
        <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
};

export default RootLayout;
