// import RootLayout from "@/components/RootLayout"; // Import the client component
// import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";

// export const metadata: Metadata = {
//   title: "React Prodigy | Learn Anytime, Anywhere with Expert-Led Courses",
//   description:
//     "Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today",
// };

// Load fonts on the server
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export const fontsStyles = `${poppins.variable} ${josefin.variable} antialiased bg-no-repeat bg-white container`;
