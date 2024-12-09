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
              <h2 className="font-bold">UF Saída:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Cidade Saída:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">UF Destino:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Cidade Destino:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Data Saída:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Data Chegada:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Valor Contratado:</h2>
              <p>São Paulo</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h2 className="font-bold">Tipo Viagem:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Tipo Serviço:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Clientes:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Tipo Pagamento:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Motorista:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Veículo:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Status Viagem:</h2>
              <p>São Paulo</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
