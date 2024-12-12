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
import { Fornecedor, IDocumentos, Manutencao } from "@/lib/types";

interface DocumentosProps {
  documento: IDocumentos;
  setDocumentos: React.Dispatch<React.SetStateAction<IDocumentos[]>>;
}

export default function DialogRemover({
  documento,
  setDocumentos,
}: DocumentosProps) {
  const handleRemoverDocumento = async (id: string) => {
    try {
      await api.delete(`/documento/${id}`);
      setDocumentos((prevDocumento) =>
        prevDocumento.filter((d) => d.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover documento:", error);
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
      <DialogContent className="w-[350px] h-[150px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o documento?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverDocumento(documento.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
