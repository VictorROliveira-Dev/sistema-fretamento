"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo, useEffect, useState } from "react";
import menuIcon from "../../app/assets/menu.svg";
import painel from "@/app/assets/painel-de-controle.png";
import motorista from "@/app/assets/motorista.png";
import clientes from "@/app/assets/pessoas.png";
import fornecedores from "@/app/assets/grupo.png";
import veiculos from "@/app/assets/onibus.png";
import van from "@/app/assets/van.png";
import manutencao from "@/app/assets/manutencao.png";
import servicos from "@/app/assets/servico.png";
import documentos from "@/app/assets/documentos.png";
import financeiro from "@/app/assets/financa.png";
import estoque from "@/app/assets/estoque.png";
import ferias from "@/app/assets/ferias.png";
import viagem from "@/app/assets/montanha.png";
import colaborador from "@/app/assets/colaborador.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

const icons = {
  painel: painel.src,
  motorista: motorista.src,
  clientes: clientes.src,
  fornecedores: fornecedores.src,
  colaboradores: colaborador.src,
  ferias: ferias.src,
  veiculos: van.src,
  fretamento: veiculos.src,
  viagem: viagem.src,
  manutencao: manutencao.src,
  servicos: servicos.src,
  documentos: documentos.src,
  financeiro: financeiro.src,
  estoque: estoque.src,
};

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Painel", icon: icons.painel },
  { href: "/motoristas", label: "Motoristas", icon: icons.motorista },
  { href: "/clientes", label: "Clientes", icon: icons.clientes },
  { href: "/fornecedores", label: "Fornecedores", icon: icons.fornecedores },
  { href: "/colaborador", label: "Colaboradores", icon: icons.colaboradores },
  { href: "/ferias", label: "Férias", icon: icons.ferias },
  { href: "/veiculos", label: "Veículos", icon: icons.veiculos },
  { href: "/viagens-servicos", label: "Fretamento", icon: icons.fretamento },
  { href: "/viagem-programada", label: "Viagens", icon: icons.viagem },
  { href: "/manutencoes", label: "Manutenções", icon: icons.manutencao },
  { href: "/servicos", label: "Serviços", icon: icons.servicos },
  { href: "/documentos", label: "Documentos", icon: icons.documentos },
  { href: "/financeiro", label: "Finanças", icon: icons.financeiro },
  { href: "/estoque", label: "Estoque", icon: icons.estoque },
];

const adminRoutes = [
  "/",
  "/motoristas",
  "/clientes",
  "/fornecedores",
  "/colaboradores",
  "/ferias",
  "/veiculos",
  "/viagens-servicos",
  "/viagem-programada",
  "/manutencoes",
  "/servicos",
  "/documentos",
  "/financeiro",
  "/estoque",
];
const userRoutes = ["/viagem-programada", "/viagens-servicos", "/estoque"];

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = memo(
  ({ href, icon, label, isActive, onClick }) => {
    console.log(`Renderizando NavLink: ${label}`); // Para verificar as re-renderizações
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${
          isActive ? "bg-blue-900 border-blue-900 text-white" : ""
        }`}
      >
        <Image src={icon} alt={label} width={45} height={45} />
        <p className="font-bold text-xs text-center">{label}</p>
      </Link>
    );
  }
);

const Header = memo(function Header() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const closeSheet = () => setIsOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
        setRole(payload.role);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  // Filtra os itens de navegação com base na role
  const filteredNavItems = navItems.filter(({ href }) => {
    if (role === "admin") return adminRoutes.includes(href);
    if (role === "user") return userRoutes.includes(href);
    return false;
  });

  return (
    <header>
      <div className="h-6 bg-black">
        <p className="text-center font-bold text-white">
          Infoservice Fretamento
        </p>
      </div>

      {/* Menu para telas maiores */}
      <nav className="sm:h-28 bg-white sm:flex items-center justify-center mx-10 hidden">
        <div className="flex items-center gap-4">
          {navItems.map(({ href, label, icon }) => (
            <NavLink
              key={href}
              href={href}
              icon={icon}
              label={label}
              isActive={pathname === href}
            />
          ))}
        </div>
      </nav>

      {/* Menu para telas menores com Sheet */}
      <div className="sm:hidden flex items-start px-2 py-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
              <Button className="bg-transparent shadow-none hover:bg-transparent">
                <Image src={menuIcon} alt="menu" className="w-12" />
              </Button>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-4 overflow-y-auto max-h-screen"
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="grid grid-cols-2 gap-4 p-2">
              {navItems.map(({ href, label, icon }) => (
                <NavLink
                  key={href}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={pathname === href}
                  onClick={closeSheet}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
});

NavLink.displayName = "NavLink";

export default Header;
