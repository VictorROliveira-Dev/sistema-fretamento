"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import removeIcon from "@/app/assets/remove.svg";
import { api } from "@/lib/axios";
import { IDocumentos } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";
import { useState } from "react";

interface DocumentosProps {
  documento: IDocumentos;
  setDocumentos: React.Dispatch<React.SetStateAction<IDocumentos[]>>;
}

export default function DialogRemover({
  documento,
  setDocumentos,
}: DocumentosProps) {
  const [removendo, setRemovendo] = useState(false);

  const handleRemoverDocumento = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/documento/${id}`);
      setDocumentos((prevDocumento) =>
        prevDocumento.filter((d) => d.id !== id)
      );
      toast.success("Documento removido.");
    } catch (error) {
      toast.error("Erro ao tentar remover documento.");
      console.error("Erro ao remover documento:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o documento?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverDocumento(documento.id)}
          >
            {removendo ? (
              <Image
                src={loading}
                alt="loading"
                className="text-center animate-spin"
              />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
