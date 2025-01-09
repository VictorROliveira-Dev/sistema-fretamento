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
      <head>
        {/* Ícone para tela de início no iPhone */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Configurações adicionais para PWA no iOS */}
        <meta name="apple-mobile-web-app-title" content="Sistema fretamento" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={` ${raleway.className} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
