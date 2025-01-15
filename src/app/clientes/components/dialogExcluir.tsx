"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import removeIcon from "@/app/assets/remove.svg";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/lib/axios";
import { Cliente } from "@/lib/types";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ExcluirProps {
  clienteName: string;
  cliente: Cliente;
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}
export default function DialogExcluir({
  clienteName,
  cliente,
  setClientes,
}: ExcluirProps) {
  const [removendo, setRemovendo] = useState(false);
  const router = useRouter();

  const handleRemoverCliente = async (id: number) => {
    setRemovendo(true);
    try {
      await api.delete(`/cliente/${id}`);
      setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
      toast.success("Cliente removida.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar remover cliente.");
      console.error("Erro ao remover cliente:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
            <Image
              src={removeIcon}
              alt="Remover"
              width={25}
              className="w-10 md:w-6"
            />
          </span>
        </DialogTrigger>
        <DialogContent className="w-[90%] md:w-[50%] flex flex-col items-center rounded-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <p>
                Você tem certeza que quer excluir o cliente{" "}
                <strong className="text-red-500">{clienteName}</strong>?
              </p>
            </DialogTitle>
            <DialogDescription className="text-center">
              Se você remover este cliente não terá como voltar atrás
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => handleRemoverCliente(cliente.id)}
              >
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
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
