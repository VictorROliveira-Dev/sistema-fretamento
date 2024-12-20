"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

// Importação explícita das imagens e obtenção do caminho correto
import painel from "@/app/assets/painel-de-controle.png";
import motorista from "@/app/assets/motorista.png";
import clientes from "@/app/assets/pessoas.png";
import fornecedores from "@/app/assets/grupo.png";
import veiculos from "@/app/assets/onibus.png";
import viagens from "@/app/assets/montanha.png";
import manutencao from "@/app/assets/manutencao.png";
import servicos from "@/app/assets/servico.png";
import documentos from "@/app/assets/documentos.png";
import financeiro from "@/app/assets/financa.png";
import passageiros from "@/app/assets/passageiro.png";
import passagens from "@/app/assets/passagens.png";
import sino from "@/app/assets/sino.svg";

const icons = {
  painel: painel.src,
  motorista: motorista.src,
  clientes: clientes.src,
  fornecedores: fornecedores.src,
  veiculos: veiculos.src,
  viagens: viagens.src,
  manutencao: manutencao.src,
  servicos: servicos.src,
  documentos: documentos.src,
  financeiro: financeiro.src,
  passageiros: passageiros.src,
  passagens: passagens.src,
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
  { href: "/viagens-servicos", label: "Viagens", icon: icons.viagens },
  { href: "/manutencoes", label: "Manutenções", icon: icons.manutencao },
  { href: "/servicos", label: "Serviços", icon: icons.servicos },
  { href: "/documentos", label: "Documentos", icon: icons.documentos },
  { href: "/financeiro", label: "Finanças", icon: icons.financeiro },
  { href: "/passageiros", label: "Passageiros", icon: icons.passageiros },
  { href: "/passagens", label: "Passagens", icon: icons.passagens },
  {
    href: "/viagensprogramadas",
    label: "Viagem Programada",
    icon: icons.viagens,
  },
];

// Tipagem do componente NavLink
interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
}

const NavLink: FC<NavLinkProps> = ({ href, icon, label, isActive }) => (
  <Link
    href={href}
    className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${
      isActive ? "bg-blue-900 border-blue-900 text-white" : ""
    }`}
  >
    <Image src={icon} alt={label} width={45} height={45} />
    <p className="font-bold text-xs">{label}</p>
  </Link>
);

const Header: FC = () => {
  const pathname = usePathname() || "";

  return (
    <header>
      <div className="h-6 bg-black">
        <p className="text-center font-bold text-white">
          Infoservice Fretamento
        </p>
      </div>
      <nav className="h-28 bg-white flex items-center justify-between mx-10">
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
    </header>
  );
};

export default Header;
