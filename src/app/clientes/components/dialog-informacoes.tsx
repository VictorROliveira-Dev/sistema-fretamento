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
import { Cliente } from "@/lib/types";

interface InfoProps {
  cliente: Cliente;
}

export default function DialogInformacoes({ cliente }: InfoProps) {
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
              <h2 className="font-bold">Nome Completo:</h2>
              <p>{cliente.nome}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">CPF:</h2>
              <p>{cliente.cpf}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Bairro:</h2>
              <p>{cliente.endereco.bairro}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Cidade:</h2>
              <p>{cliente.endereco.cidade}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Número:</h2>
              <p>{cliente.endereco.numero}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Rua:</h2>
            <p>{cliente.endereco.rua}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h2 className="font-bold">Data Nascimento:</h2>
              <p>{cliente.dataNascimento}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">UF:</h2>
              <p>{cliente.endereco.uf}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Telefone:</h2>
              <p>{cliente.telefone}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Documento:</h2>
              <p>{cliente.documento.documento}</p>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Tipo Documento:</h2>
              <p>{cliente.documento.tipo.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
