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
import { Motorista } from "@/lib/types";

interface MotoristasProps {
  motorista: Motorista;
  setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
}

export default function DialogRemover({
  motorista,
  setMotoristas,
}: MotoristasProps) {
  const handleRemoverMotorista = async (id: string) => {
    try {
      await api.delete(`/motorista/${id}`);
      setMotoristas((prevMotoristas) =>
        prevMotoristas.filter((m) => m.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover motorista:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-transparent shadow-none p-0 hover:bg-transparent"
        >
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
            Deseja remover o motorista?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button className="bg-red-500" onClick={() => handleRemoverMotorista(motorista.id)}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
