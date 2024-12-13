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
import { Servico } from "@/lib/types";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import { useState } from "react";

interface VeiculoProps {
  servico: Servico;
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
}

export default function DialogRemover({ servico, setServicos }: VeiculoProps) {
  const [removendo, setRemovendo] = useState(false);
  const handleRemoverVeiculo = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/servico/${id}`);
      setServicos((prevServicos) => prevServicos.filter((s) => s.id !== id));
      toast.success("Serviço removido.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar remover serviço.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao remover serviço:", error);
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
      <DialogContent className="w-[350px] h-[150px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o serviço?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverVeiculo(servico.id)}
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
