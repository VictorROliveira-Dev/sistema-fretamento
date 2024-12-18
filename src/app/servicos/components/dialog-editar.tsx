"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Servico } from "@/lib/types";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface ServicoProps {
  servico: Servico;
  servicos: Servico[];
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
}

export default function DialogEditar({
  servico,
  servicos,
  setServicos,
}: ServicoProps) {
  const [nomeServico, setNomeServico] = useState("");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setNomeServico(servico.nomeServico);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditando(true);

    const servicoData = {
      nomeServico,
    };
    try {
      const response = await api.put(`/servico/${servico.id}`, servicoData);
      const servicoAtualizado = response.data.data;

      const servicosAtualizados = servicos.map((s) => {
        return s.id === servicoAtualizado.id ? servicoAtualizado : s;
      });
      setServicos(servicosAtualizados);
      toast.success("Serviço atualizado.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("Serviço atualizado:", response.data.data);
    } catch (error) {
      toast.error("Erro ao tentar atualizar serviço.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao adicionar motorista:", error);
    } finally {
      setEditando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[400px] md:h-[300px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Serviço</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="servico">Serviço:</label>
                <Input
                  name="servico"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o nome completo..."
                  value={nomeServico}
                  onChange={(e) => setNomeServico(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[200px]">
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
