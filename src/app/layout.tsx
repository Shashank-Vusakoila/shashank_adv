import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shashank Vusakoila | Straw Hat Developer - Interactive Portfolio",
  description: "Set sail with Shashank Vusakoila, a world-class Full Stack Developer, on his Grand Line interactive portfolio adventure inspired by One Piece. Explore code bases, Devil Fruit skills, and epic Boss Battles.",
  keywords: ["Shashank Vusakoila", "Full Stack Developer", "Next.js", "Three.js", "React Three Fiber", "GSAP Portfolio", "One Piece Developer Portfolio"],
  authors: [{ name: "Shashank Vusakoila" }],
  openGraph: {
    title: "Shashank Vusakoila | Straw Hat Developer - Grand Line Portfolio",
    description: "An interactive, cinematic One Piece-themed developer adventure showcasing full-stack capabilities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Vusakoila | Straw Hat Developer Portfolio",
    description: "An interactive cinematic developer portfolio inspired by One Piece, built with Next.js, Three.js, GSAP, and Tailwind.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-dark-ocean text-white min-h-full font-sans overflow-x-hidden selection:bg-sunny-orange selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
