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
              <h2 className="font-bold">Nome Escala:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">CPF:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Bairro:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Categoria(as):</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Nome Completo:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Cidade:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Número:</h2>
              <p>São Paulo</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h2 className="font-bold">Cidade CNH:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Data Nascimento:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">UF:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Telefone:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">UF CNH:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Vencimento CNH:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Documento:</h2>
              <p>São Paulo</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Rua:</h2>
              <p>São Paulo</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
