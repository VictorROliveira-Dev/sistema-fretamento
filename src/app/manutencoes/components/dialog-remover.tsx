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
import { Fornecedor, Manutencao } from "@/lib/types";

interface ManutencoesProps {
  manutencao: Manutencao;
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
}

export default function DialogRemover({
  manutencao,
  setManutencoes,
}: ManutencoesProps) {
  const handleRemoverManutencao = async (id: string) => {
    try {
      await api.delete(`/manutencao/${id}`);
      setManutencoes((prevManutencao) =>
        prevManutencao.filter((m) => m.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover manutenção:", error);
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
            Deseja remover a manutenção?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverManutencao(manutencao.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
