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
import removeIcon from "../../assets/remove.svg";
import { Viagem } from "@/lib/types";
import { api } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ExcluirProps {
  setViagens: React.Dispatch<React.SetStateAction<Viagem[]>>;
  viagens: Viagem[];
  id: number;
}

export function DialogExcluir({ setViagens, viagens, id }: ExcluirProps) {
  const [removendo, setRemovendo] = useState(false);
  const router = useRouter();
  async function excluirViagem() {
    setRemovendo(true);
    try {
      await api.delete(`/viagem/${id}`);
      setViagens(viagens.filter((v) => v.id !== id));
      toast.success("Viagem removida.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar remover viagem.");
      console.log(error);
    } finally {
      setRemovendo(false);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
            <Image src={removeIcon} alt="Remover" width={25} className="w-6" />
          </span>
        </DialogTrigger>
        <DialogContent className="w-[350px] h-[150px] flex flex-col items-center">
          <DialogHeader className="mb-5">
            <DialogTitle className="font-black">
              Deseja remover está viagem?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex items-center">
            <Button className="bg-red-500" onClick={() => excluirViagem()}>
              {removendo ? (
                <Image
                  src={loading}
                  alt="carregando"
                  className="text-center animate-spin"
                />
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
