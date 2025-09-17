import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope, Geist } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800','900'],
  display: 'swap',
});
const geist = Geist({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: "CS Layout",
  description: "CS Layout App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${manrope.variable} ${geist.variable} antialiased text-black`}
      >
        {children}
      </body>
    </html>
  );
}
