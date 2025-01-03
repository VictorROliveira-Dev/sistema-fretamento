import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layoutWrapper";

const raleway = Raleway({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Infoservice Fretamento",
  description: "Sistema de fretamento e transporte de passageiros",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${raleway.className} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
