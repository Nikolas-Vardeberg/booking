import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/Calendar.css";
import { cn } from "../../lib/utils";
import NavBar from "../../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vertio - Bookingsystem",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
    </html>
  );
}
