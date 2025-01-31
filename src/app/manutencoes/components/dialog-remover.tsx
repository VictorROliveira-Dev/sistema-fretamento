import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { api } from "@/lib/axios";
import { Manutencao } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { useState } from "react";
import { toast } from "sonner";

interface ManutencoesProps {
  manutencao: Manutencao;
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
  onClose: () => void;
}

export default function DialogRemover({
  manutencao,
  setManutencoes,
  onClose,
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
      onClose();
    } catch (error) {
      toast.error("Erro ao tentar remover manutenção.");
      console.error("Erro ao remover manutenção:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="md:w-[450px] w-[80%] md:h-auto flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogClose>
            <Button
              className="absolute right-2 bg-white text-black z-20 top-2"
              onClick={() => onClose()}
            >
              X
            </Button>
          </DialogClose>
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
