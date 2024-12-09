import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";

export default function DialogInformacoes() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap items-center justify-around">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h2 className="font-bold">Prefixo:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Marca:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Carroceria:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Qtd. Poltronas:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Km Atual:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Ano Veículo:</h2>
              <p>São Paulo</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h2 className="font-bold">Local Emplacamento:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Capacidade do Tanque:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Modelo:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Placa:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">UF Emplacamento:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Acessórios:</h2>
              <p>São Paulo</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
