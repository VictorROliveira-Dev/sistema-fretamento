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
import { toast } from "sonner";
import { useState } from "react";
import loading from "../../assets/loading.svg";

interface MotoristasProps {
  motorista: Motorista;
  setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
}

export default function DialogRemover({
  motorista,
  setMotoristas,
}: MotoristasProps) {
  const [removendo, setRemovendo] = useState(false);

  const handleRemoverMotorista = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/motorista/${id}`);
      setMotoristas((prevMotoristas) =>
        prevMotoristas.filter((m) => m.id !== id)
      );
      toast.success("Motorista removido com sucesso.", {
        className:
          "bg-slate-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar remover motorista.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao remover motorista:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image
            src={removeIcon}
            alt="Remover"
            className="w-10 md:w-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[350px] h-[150px] rounded-md flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o motorista?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverMotorista(motorista.id)}
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
