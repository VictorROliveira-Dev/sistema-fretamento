/*import { Button } from "@/components/ui/button";
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
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Passageiro } from "@/lib/types";
import React from "react";

interface ExcluirProps {
  passageiro: Passageiro;
  passageiros: Passageiro[];
  setPassageiros: React.Dispatch<React.SetStateAction<Passageiro[]>>;
}
export default function DialogExcluir({
  passageiro,
  passageiros,
  setPassageiros,
}: ExcluirProps) {
  async function excluirPassageiro() {
    const response = await api.delete(`/passageiro/${passageiro.id}`);
    if (!response.data.isSucces) {
      toast(response.data.message);
      return;
    }

    setPassageiros(passageiros.filter((p) => p.id !== passageiro.id));
    toast(response.data.message);
    return;
  }

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
                <strong className="text-red-500">{passageiro.nome}</strong>?
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
              type="button"
              className="bg-transparent border border-red-600 text-red-600"
              onClick={() => excluirPassageiro()}
            >
              Quero Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
*/