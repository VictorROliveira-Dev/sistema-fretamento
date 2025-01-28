"use client";
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
import { Despesa } from "@/lib/types";
import { useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import removeIcon from "../../../assets/remove.svg";
import loading from "../../../assets/loading.svg";

interface DespesaProps {
  despesa: Despesa;
  setDespesas: React.Dispatch<React.SetStateAction<Despesa[]>>;
}

export default function DialogRemoverDespesa({
  despesa,
  setDespesas,
}: DespesaProps) {
  const [removendo, setRemovendo] = useState(false);

  const handleRemoverDocumento = async (id: number) => {
    setRemovendo(true);
    try {
      await api.delete(`/despesa/${id}`);
      setDespesas((prevDespesa) => prevDespesa.filter((d) => d.id !== id));
      toast.success("Despesa removida.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar remover despesa.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao remover despesa:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image src={removeIcon} alt="Remover" width={25} className="w-6" />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover a despesa?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverDocumento(despesa.id)}
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
