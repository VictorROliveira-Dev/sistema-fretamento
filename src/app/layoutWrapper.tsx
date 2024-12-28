/*"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Obtém a rota atual
  const isLoginPage = pathname === "/login"; // Verifica se está na página de login

  return (
    <>
      <Toaster />
      {!isLoginPage && <Header />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
}*/
