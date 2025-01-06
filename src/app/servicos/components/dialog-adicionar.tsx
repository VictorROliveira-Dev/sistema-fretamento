"use client";
import { useState } from "react";
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
import Image from "next/image";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";
import { Servico } from "@/lib/types";

interface ServicoProps {
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
  servicos: Servico[];
}

export default function DialogAdicionarServico({
  setServicos,
  servicos,
}: ServicoProps) {
  const [nomeServico, setNomeServico] = useState("");
  const [adicionando, setAdicionando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdicionando(true);

    const servicoData = {
      nomeServico,
    };
    try {
      const response = await api.post("/servico", servicoData);
      setServicos([...servicos, response.data.data]);
      toast.success("Serviço adicionado.");
      console.log("Serviço adicionado:", response.data.data);
    } catch (error) {
      toast.error("Erro ao tentar adicionar serviço.");
      console.error("Erro ao adicionar serviço:", error);
    } finally {
      setNomeServico("");
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 p-1 text-center text-white rounded-md font-medium cursor-pointer transition-all">
          Adicionar Serviço
        </span>
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
              {adicionando ? (
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
