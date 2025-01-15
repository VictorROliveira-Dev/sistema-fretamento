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
import { Veiculo } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface VeiculoProps {
  veiculo: Veiculo;
  setVeiculos: React.Dispatch<React.SetStateAction<Veiculo[]>>;
}

export default function DialogRemover({ veiculo, setVeiculos }: VeiculoProps) {
  const [removendo, setRemovendo] = useState(false);
  const router = useRouter();
  const handleRemoverVeiculo = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/veiculo/${id}`);
      setVeiculos((prevVeiculos) => prevVeiculos.filter((v) => v.id !== id));
      toast.success("Veículo removido.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar remover veículo.");
      console.error("Erro ao remover motorista:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="w-6 md:w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o veículo?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverVeiculo(veiculo.id)}
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
