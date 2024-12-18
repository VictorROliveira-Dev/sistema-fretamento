import Image from "next/image";

import logo from "@/app/assets/Logo-MarceloTurismoBranco.png";
import porta from "@/app/assets/porta.png";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-10 bg-[#070180]">
      <Image
        src={logo}
        alt="Logomarca Marcelo Turismo"
        className="w-[250px] md:w-[300px]"
      />
      <div className="flex flex-col items-center gap-1 cursor-pointer">
        <Image src={porta} alt="Porta" width={60} />
        <p className="text-white">Sair</p>
      </div>
    </footer>
  );
}
