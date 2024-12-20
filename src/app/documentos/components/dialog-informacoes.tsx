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
import { IDocumentos, Motorista } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface DocumentoProps {
  documentoId: string;
}

export default function DialogInformacoes({ documentoId }: DocumentoProps) {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);

  useEffect(() => {
    if (!documentoId) return;

    const fetchDocumentos = async () => {
      try {
        const response = await api.get(`/documento/${documentoId}`);
        setDocumentos(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("Erro ao buscar documentos:", error);
      }
    };

    fetchDocumentos();
  }, [documentoId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-6 md:w-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[400px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around">
          {documentos.map((documento) => (
            <div key={documento.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Doc/Certificado:</h2>
                  <p>{documento.tipoDocumento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Referência:</h2>
                  <p>{documento.referencia}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Vencimento:</h2>
                  <p>
                    {new Date(documento.vencimento).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
