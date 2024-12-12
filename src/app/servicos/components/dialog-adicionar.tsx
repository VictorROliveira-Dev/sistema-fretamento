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

export default function DialogAdicionarServico() {
  const [nomeServico, setNomeServico] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const servicoData = {
      nomeServico,
    };
    try {
      const response = await api.post("/servico", servicoData);
      console.log("Serviço adicionado:", response.data.data);
      setNomeServico("");
    } catch (error) {
      console.error("Erro ao adicionar motorista:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px] h-[300px] flex flex-col items-center">
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
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
