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
import { ViagemProgramda } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import loading from "../../assets/loading.svg";

interface RemoverProps {
  viagemId: number;
  setViagens: React.Dispatch<React.SetStateAction<ViagemProgramda[]>>;
}

export default function DialogRemover({
  viagemId,
  setViagens,
}: RemoverProps) {
  const [removendo, setRemovendo] = useState(false);

  const handleRemoverMotorista = async (id: number) => {
    setRemovendo(true);
    try {
      await api.delete(`/viagemprogramada/${id}`);
      setViagens((prevMotoristas) =>
        prevMotoristas.filter((m) => m.id !== id)
      );
      toast.success("Viagem removida com sucesso.");
    } catch (error) {

      toast.error("Erro ao tentar remover viagem.");
      console.error("Erro ao remover viagem:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-red-600 text-white rounded-md shadow-none px-2 hover:scale-110 cursor-pointer transition-all">
         Remover
        </span>
      </DialogTrigger>
      <DialogContent className="w-[350px] h-[150px] rounded-md flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o pacote de viagem?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverMotorista(viagemId)}
          >
            {removendo ? (
              <Image
                src={loading}
                alt="removendo"
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
