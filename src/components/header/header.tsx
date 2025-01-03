"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo, useState } from "react";
import menuIcon from "../../app/assets/menu.svg";
import painel from "@/app/assets/painel-de-controle.png";
import motorista from "@/app/assets/motorista.png";
import clientes from "@/app/assets/pessoas.png";
import fornecedores from "@/app/assets/grupo.png";
import veiculos from "@/app/assets/onibus.png";
import manutencao from "@/app/assets/manutencao.png";
import servicos from "@/app/assets/servico.png";
import documentos from "@/app/assets/documentos.png";
import financeiro from "@/app/assets/financa.png";
import pacote from "@/app/assets/pacote.png";
import estoque from "@/app/assets/estoque.png";
import sino from "@/app/assets/sino.svg";
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
  veiculos: veiculos.src,
  fretamento: pacote.src,
  manutencao: manutencao.src,
  servicos: servicos.src,
  documentos: documentos.src,
  financeiro: financeiro.src,
  estoque: estoque.src,
  sino: sino.src,
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
  { href: "/veiculos", label: "Veículos", icon: icons.veiculos },
  { href: "/viagens-servicos", label: "Fretamento", icon: icons.fretamento },
  { href: "/manutencoes", label: "Manutenções", icon: icons.manutencao },
  { href: "/servicos", label: "Serviços", icon: icons.servicos },
  { href: "/documentos", label: "Documentos", icon: icons.documentos },
  { href: "/financeiro", label: "Finanças", icon: icons.financeiro },
  { href: "/estoque", label: "Estoque", icon: icons.estoque },
];

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = memo(({ href, icon, label, isActive, onClick }) => {
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
});

const Header = memo(function Header() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu lateral
  // Função para fechar o Sheet
  const closeSheet = () => setIsOpen(false);

  return (
    <header>
      <div className="h-6 bg-black">
        <p className="text-center font-bold text-white">
          Infoservice Fretamento
        </p>
      </div>

      {/* Menu para telas maiores */}
      <nav className="sm:h-28 bg-white sm:flex items-center justify-between mx-10 hidden">
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
        <Image
          src={icons.sino}
          alt="Notificações"
          width={45}
          height={45}
          className="cursor-pointer"
        />
      </nav>

      {/* Menu para telas menores com Sheet */}
      <div className="sm:hidden flex items-center justify-around p-2">
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
                  onClick={closeSheet} // Fecha o Sheet ao clicar no link
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Image
          src={icons.sino}
          alt="Notificações"
          width={45}
          height={45}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
});

NavLink.displayName = "NavLink";

export default Header;
