import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/BricolageGrotesque-Bold.ttf",
      style: "swap",
      weight: "700",
    },
    {
      path: "../public/fonts/BricolageGrotesque-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/BricolageGrotesque-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/BricolageGrotesque-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/BricolageGrotesque-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/BricolageGrotesque-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../public/fonts/BricolageGrotesque-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
  ],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Yalla Ride",
  description: "Yalla Ride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased`}>{children}</body>
    </html>
  );
}
