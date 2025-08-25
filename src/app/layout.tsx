import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo",
  description: "todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
