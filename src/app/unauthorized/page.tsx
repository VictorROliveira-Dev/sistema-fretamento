import Image from "next/image";
import imageUnauthorized from "../assets/image-unauthorized.png";

export default function Unauthorized() {
  return (
    <section className="flex flex-col justify-center items-center bg-[#070180] h-[425px]">
      <h1 className="text-2xl font-bold text-white">
        Desculpe, você não tem permissão para acessar essa página.
      </h1>
      <p className="text-lg font-medium text-gray-400">
        Por favor, verifique suas credenciais e tente novamente.
      </p>
      <Image src={imageUnauthorized} alt="Unauthorized" width={400} />
    </section>
  );
}
