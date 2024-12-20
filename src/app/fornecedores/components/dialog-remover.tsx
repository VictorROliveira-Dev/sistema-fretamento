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
import loading from "../../assets/loading.svg";
import { useState } from "react";
import { toast } from "sonner";
import { Fornecedor } from "@/lib/types";

interface FornecedoresProps {
  fornecedor: Fornecedor;
  setFornecedores: React.Dispatch<React.SetStateAction<Fornecedor[]>>;
}

export default function DialogRemover({
  fornecedor,
  setFornecedores,
}: FornecedoresProps) {
  const [removendo, setRemovendo] = useState(false);
  const handleRemoverFornecedor = async (id: string) => {
    setRemovendo(true);
    try {
      await api.delete(`/api/fornecedor/${id}`);
      setFornecedores((prevFornecedor) =>
        prevFornecedor.filter((m) => m.id !== id)
      );
      toast.success("Fornecedor removido.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar remover fornecedor.", {
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
            width={25}
            className="w-6 md:w-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o fornecedor?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverFornecedor(fornecedor.id)}
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
