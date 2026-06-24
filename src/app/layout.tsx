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
  title: 'Shashank Vusakoila | Full Stack Developer - Grand Line Portfolio',
  description: 'Shashank Vusakoila is a Full Stack Developer from Hyderabad, India. Founder of DiveIn WebWorks. Explore an interactive One Piece-inspired portfolio featuring cinematic project showcases, 3D skill orbits, and the Grand Line journey.',
  keywords: [
    'Shashank Vusakoila',
    'Full Stack Developer Hyderabad',
    'DiveIn WebWorks',
    'Next.js Developer India',
    'React Developer Portfolio',
    'One Piece Portfolio',
    'B.Tech CSE Anurag University',
  ],
  authors: [{ name: 'Shashank Vusakoila', url: 'https://github.com/Shashank-Vusakoila' }],
  openGraph: {
    title: 'Shashank Vusakoila | Full Stack Developer - Grand Line Portfolio',
    description: 'An interactive cinematic One Piece-themed developer adventure. Built with Next.js, Three.js, GSAP, Framer Motion, and Tailwind CSS.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shashank Vusakoila | Straw Hat Developer Portfolio',
    description: 'Full Stack Developer from Hyderabad. Interactive One Piece portfolio by Shashank Vusakoila — Founder of DiveIn WebWorks.',
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
