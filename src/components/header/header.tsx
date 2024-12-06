"use client";

import painel from "@/app/assets/painel-de-controle.png";
import motorista from "@/app/assets/motorista.png";
import clientes from "@/app/assets/pessoas.png";
import fornecedores from "@/app/assets/grupo.png";
import veiculos from "@/app/assets/onibus.png";
import viagens from "@/app/assets/montanha.png";
import manutencao from "@/app/assets/manutencao.png";
import documentos from "@/app/assets/documentos.png";
import financeiro from "@/app/assets/financa.png";
import sino from "@/app/assets/sino.svg";
import passagens from "@/app/assets/passagens.png";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getActiveClass = (route: string) =>
    pathname === route ? "bg-blue-900 border-blue-900 text-white" : "";

  return (
    <header>
      <div className="h-6 bg-black">
        <p className="text-center font-bold text-white">
          Infoservice Fretamento
        </p>
      </div>
      <nav className="h-28 bg-white flex items-center justify-between mx-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all  ${getActiveClass(
              "/"
            )}`}
          >
            <Image src={painel} alt="Painel" width={45} />
            <p className="font-bold text-xs">Painel</p>
          </Link>
          <Link
            href="/motoristas"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all  ${getActiveClass(
              "/motoristas"
            )}`}
          >
            <Image src={motorista} alt="Motoristas" width={45} />
            <p className="font-bold text-xs">Motoristas</p>
          </Link>
          <Link
            href="/clientes"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all  ${getActiveClass(
              "/clientes"
            )}`}
          >
            <Image src={clientes} alt="Clientes" width={45} />
            <p className="font-bold text-xs">Clientes</p>
          </Link>
          <Link
            href="/fornecedores"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${getActiveClass(
              "/fornecedores"
            )}`}
          >
            <Image src={fornecedores} alt="Fornecedores" width={45} />
            <p className="font-bold text-xs">Fornecedores</p>
          </Link>
          <Link
            href="/veiculos"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${getActiveClass(
              "/veiculos"
            )}`}
          >
            <Image src={veiculos} alt="Veículos" width={45} />
            <p className="font-bold text-xs">Veículos</p>
          </Link>
          <Link
            href="/viagens-servicos"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${getActiveClass(
              "/viagens-servicos"
            )}`}
          >
            <Image src={viagens} alt="Viagens" width={45} />
            <p className="font-bold text-xs">Viagens</p>
          </Link>
          <Link
            href="/manutencoes"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${getActiveClass(
              "/manutencoes"
            )}`}
          >
            <Image src={manutencao} alt="Veículos" width={45} />
            <p className="font-bold text-xs">Manutenções</p>
          </Link>
          <Link
            href="/documentos"
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all ${getActiveClass(
              "/documentos"
            )}`}
          >
            <Image src={documentos} alt="Veículos" width={45} />
            <p className="font-bold text-xs">Documentos</p>
          </Link>
          <span className="flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all">
            <Image src={financeiro} alt="Veículos" width={45} />
            <p className="font-bold text-xs">Financeiro</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 border-2 rounded-md cursor-pointer w-[90px] h-[90px] hover:bg-blue-900 hover:border-blue-900 hover:text-white transition-all">
            <Image src={passagens} alt="Passagens" width={45} />
            <p className="font-bold text-xs">Passagens</p>
          </span>
        </div>

        <Image src={sino} alt="Sino" width={45} className="cursor-pointer" />
      </nav>
    </header>
  );
}
