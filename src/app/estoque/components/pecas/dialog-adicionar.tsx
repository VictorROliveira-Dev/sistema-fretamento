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
import loadingicon from "@/app/assets/loading.svg";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PecasProps {
  setPecas: React.Dispatch<React.SetStateAction<Peca[]>>;
  pecas: Peca[];
}

export default function DialogAdicionar({ setPecas, pecas }: PecasProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [peca, setPeca] = useState<Peca>({
    id: 0,
    nome: "",
    preco: 0,
    quantidade: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await api.post("/peca", peca);
      if (!response.data.isSucces) {
        toast("nao foi possivel registrar a peça");
        return;
      }
      setPecas([...pecas, peca]);
      toast("Peça registrada com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar registrar peca");
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[420px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Peça
        </span>
      </DialogTrigger>
      <DialogContent className="w-[80%] md:w-[850px] h-auto md:h-auto flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de peça</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">Pecas</legend>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <Label>Nome</Label>
                <Input
                  type="text"
                  onChange={(e) => setPeca({ ...peca, nome: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label>Preco</Label>
                <Input
                  type="number"
                  min={1}
                  onChange={(e) =>
                    setPeca({ ...peca, preco: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setPeca({ ...peca, quantidade: Number(e.target.value) })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex items-center gap-2 mt-10">
              <Button type="submit" className="w-[250px]">
                {loading ? (
                  <Image
                    src={loadingicon}
                    alt="loading"
                    className="text-center animate-spin"
                  />
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}