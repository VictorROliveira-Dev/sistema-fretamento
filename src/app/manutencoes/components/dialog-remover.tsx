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
import { Manutencao } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { useState } from "react";
import { toast } from "sonner";

interface ManutencoesProps {
  manutencao: Manutencao;
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
}

export default function DialogRemover({
  manutencao,
  setManutencoes,
}: ManutencoesProps) {
  const [removendo, setRemovendo] = useState(false);
  const handleRemoverManutencao = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/manutencao/${id}`);
      setManutencoes((prevManutencao) =>
        prevManutencao.filter((m) => m.id !== id)
      );
      toast.success("Manutenção removida.");
    } catch (error) {
      toast.error("Erro ao tentar remover manutenção.");
      console.error("Erro ao remover manutenção:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image src={removeIcon} alt="Remover" className="w-6 md:w-6" />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover a manutenção?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverManutencao(manutencao.id)}
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
