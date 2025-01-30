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

import React, { useState } from "react";
import { Peca } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loading from "@/app/assets/loading.svg";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import axios from "axios";
import editicon from "@/app/assets/edit.svg";
interface PecasProps {
  setPecas: React.Dispatch<React.SetStateAction<Peca[]>>;
  pecas: Peca[];
  peca: Peca;
}

export default function DialogEditar({ setPecas, pecas, peca }: PecasProps) {
  const router = useRouter();
  const [pecaAtualizada, setPecaAtualizada] = useState<Peca>(peca);
  const [editando, setEditando] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setEditando(true);
      const response = await api.put(`/peca/${peca.id}`, pecaAtualizada);
      if (!response.data.isSucces) {
        toast("nao foi possivel atualizar a peca");
        return;
      }

      const pecasAtualizadas = pecas.filter((p) => p.id !== peca.id);
      setPecas([...pecasAtualizadas, pecaAtualizada]);
      toast("Peça atualizada com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar atualizar peca");
        }
      }
    } finally {
      setEditando(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:scale-110 cursor-pointer transition-all">
          <Image src={editicon} alt="Editar" className="w-8" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[80%] md:w-[850px] h-auto md:h-auto flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de peça</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div>
              <Label>Nome</Label>
              <Input
                type="text"
                defaultValue={peca.nome}
                onChange={(e) =>
                  setPecaAtualizada({ ...peca, nome: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <Label>Preco</Label>
              <Input
                type="number"
                defaultValue={peca.preco}
                min={1}
                onChange={(e) =>
                  setPecaAtualizada({ ...peca, preco: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[250px]">
              {editando ? (
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Atualizar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}