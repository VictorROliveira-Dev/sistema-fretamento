"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { IDocumentos } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { format, toZonedTime } from "date-fns-tz";
import { parseISO } from "date-fns";

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

  function getDateVencimento(dataVencimento: string) {
    const today = new Date();
    const vencimento = parseISO(dataVencimento); // Converte a data para objeto Date
    const diferenca = Math.ceil(
      (vencimento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diferenca <= 7) return "text-red-500 font-bold";
    if (diferenca <= 15) return "text-yellow-500 font-bold";
    if (diferenca <= 30) return "text-blue-500 font-bold";

    return "text-black font-medium";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-6 md:w-6"
          />
        </span>
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
                  <p>{documento.tipoDocumento.toUpperCase()}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Referência:</h2>
                  <p>{documento.referencia}</p>
                </div>
                <div
                  className={`flex gap-2 ${getDateVencimento(
                    documento.vencimento
                  )}`}
                >
                  <h2 className="font-bold">Vencimento:</h2>
                  <p>
                    {format(
                      toZonedTime(parseISO(documento.vencimento), "UTC"),
                      "dd/MM/yyyy"
                    )}
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
