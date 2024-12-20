"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { IDocumentos } from "@/lib/types";

interface DocumentosProps {
  setDocumentos: React.Dispatch<React.SetStateAction<IDocumentos[]>>;
  documentos: IDocumentos[];
}

export default function DialogAdicionar({
  setDocumentos,
  documentos,
}: DocumentosProps) {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [referencia, setReferencia] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const documentData = {
      tipoDocumento: tipoDocumento,
      vencimento: vencimento,
      referencia: referencia,
    };

    try {
      const response = await api.post("/documento", documentData);
      setDocumentos([...documentos, response.data.data]);
      // LIMPAR
      setTipoDocumento("");
      setVencimento("");
      setReferencia("");
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Documento
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] h-[350px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Documento
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div className="flex flex-col">
              <label htmlFor="tipoDocumento">Doc/Certificado:</label>
              <select
                name="tipoDocumento"
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="w-[250px] border rounded-md p-2"
              >
                <option value="" disabled>
                  Selecione o documento...
                </option>
                <option value="cnh">CNH</option>
                <option value="ipva">IPVA</option>
                <option value="extintor">Extintor</option>
                <option value="alvará">Alvará</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="referencia">Referência:</label>
              <Input
                name="referencia"
                placeholder="Digite a referência..."
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                className="w-[250px]"
              />
            </div>
            <div>
              <label htmlFor="vencimento">Vencimento:</label>
              <Input
                name="vencimento"
                type="date"
                value={vencimento}
                onChange={(e) => setVencimento(e.target.value)}
                className="w-[250px]"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[250px]">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
