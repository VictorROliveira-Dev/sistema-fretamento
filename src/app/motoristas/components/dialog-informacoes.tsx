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
import { Motorista } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface MotoristasProps {
  motoristaId: string;
}

export default function DialogInformacoes({ motoristaId }: MotoristasProps) {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  useEffect(() => {
    if (!motoristaId) return;

    const fetchMotoristas = async () => {
      try {
        const response = await api.get(`/motorista/${motoristaId}`);
        setMotoristas(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("Erro ao buscar motoristas:", error);
      }
    };

    fetchMotoristas();
  }, [motoristaId]);

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
      <DialogContent className="w-[800px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around">
          {motoristas.map((motorista) => (
            <div key={motorista.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Nome Completo:</h2>
                  <p>{motorista.nome}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Nascimento:</h2>
                  <p>{motorista.dataNascimento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">CPF:</h2>
                  <p>{motorista.documento.documento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Bairro:</h2>
                  <p>{motorista.endereco.bairro}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Categoria(as):</h2>
                  <p>{motorista.habilitacao.categoria}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">UF:</h2>
                  <p>{motorista.endereco.uf}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Cidade:</h2>
                  <p>{motorista.endereco.cidade}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Rua:</h2>
                  <p>{motorista.endereco.rua}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Número:</h2>
                  <p>{motorista.endereco.numero}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Documento:</h2>
                  <div className="flex gap-2">
                    <p>{motorista.documento.documento}</p>
                    <p> - {motorista.documento.tipo.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h2 className="font-bold">Cidade CNH:</h2>
                    <p>{motorista.habilitacao.cidade}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="font-bold">UF CNH:</h2>
                    <p>{motorista.habilitacao.uf}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="font-bold">Vencimento CNH:</h2>
                    <p>{motorista.habilitacao.vencimento}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
