import Image from "next/image";

import logo from "@/app/assets/Logo-MarceloTurismoBranco.png";
import porta from "@/app/assets/porta.png";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-10 bg-[#070180]">
      <Image src={logo} alt="Logomarca Marcelo Turismo" width={343} />
      <div className="flex flex-col items-center gap-1 cursor-pointer">
        <Image src={porta} alt="Porta" width={100} />
        <p className="text-white">Sair</p>
      </div>
    </footer>
  );
}
