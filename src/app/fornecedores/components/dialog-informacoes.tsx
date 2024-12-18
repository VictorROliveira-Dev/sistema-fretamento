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
import { Fornecedor } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface FornecedorProps {
  fornecedorId: string;
}

export default function DialogInformacoes({ fornecedorId }: FornecedorProps) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  useEffect(() => {
    if (!fornecedorId) return;
    const fetchFornecedores = async () => {
      try {
        const response = await api.get(`/api/fornecedor/${fornecedorId}`);
        setFornecedores(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("Erro ao buscar fornecedores:", error);
      }
    };

    fetchFornecedores();
  }, [fornecedorId]);

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
      <DialogContent className="md:w-[800px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap items-center justify-around">
          {fornecedores.map((fornecedor) => (
            <div key={fornecedor.id} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <h2 className="font-bold">Nome Completo:</h2>
                <p>{fornecedor.nome}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Data Nascimento:</h2>
                <p>
                  {new Date(fornecedor.dataNascimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Telefone:</h2>
                <p>{fornecedor.telefone}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Documento:</h2>
                <p>{fornecedor.documento.documento}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">CPF:</h2>
                <p>{fornecedor.cpf}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">UF:</h2>
                <p>{fornecedor.endereco.uf}</p>
              </div>

              <div className="flex gap-2">
                <h2 className="font-bold">Cidade:</h2>
                <p>{fornecedor.endereco.cidade}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Bairro:</h2>
                <p>{fornecedor.endereco.bairro}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Rua:</h2>
                <p>{fornecedor.endereco.rua}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Número:</h2>
                <p>{fornecedor.endereco.numero}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="font-bold">Tipo Pessoa:</h2>
                <p>{fornecedor.tipo}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
