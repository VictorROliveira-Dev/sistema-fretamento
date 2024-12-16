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
  const handleRemoverCliente = async (id: number) => {
    setRemovendo(true);
    try {
      await api.delete(`/cliente/${id}`);
      setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
      toast.success("Cliente removida.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar remover cliente.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao remover cliente:", error);
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </DialogTrigger>
        <DialogContent className="w-[90%] md:w-[50%] flex flex-col items-center">
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
