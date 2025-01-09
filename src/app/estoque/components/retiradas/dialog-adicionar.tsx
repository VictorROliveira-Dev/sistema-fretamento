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
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Peca, RetiradaPeca, Veiculo } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loadingicon from "@/app/assets/loading.svg";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SelectContent } from "@radix-ui/react-select";

interface AdicionarProps {
  setRetiradas: React.Dispatch<React.SetStateAction<RetiradaPeca[]>>;
  retiradas: RetiradaPeca[];
}

export default function DialogAdicionar({
  setRetiradas,
  retiradas,
}: AdicionarProps) {
  const router = useRouter();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [retirada, setRetirada] = useState<RetiradaPeca>({
    id: 0,
    pecaId: 0,
    quantidade: 0,
    veiculoId: 0,
    dataDeRetirada: "",
    precoTotal: 0,
  });

  async function fetchVeiculos() {
    const response = await api.get("/veiculo");

    if (!response.data.isSucces) {
      toast("erro ao consultar dados");
    }

    setVeiculos(response.data.data);
  }

  async function fetchPecas() {
    const response = await api.get("/peca");

    if (!response.data.isSucces) {
      toast("erro ao consultar dados");
    }

    setPecas(response.data.data);
  }
  useEffect(() => {
    fetchPecas();
    fetchVeiculos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await api.post("/retirada", retirada);
      if (!response.data.isSucces) {
        toast("nao foi possivel registrar a retirada de peca");
        return;
      }

      setRetiradas([...retiradas, retirada]);
      toast("Retirada registrada com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar registrar retirada");
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[340px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Retirada
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-auto md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Retirada de peça</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">informações</legend>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <Label>Peça</Label>
                <Select
                  onValueChange={(e) =>
                    setRetirada({ ...retirada, pecaId: Number(e) })
                  }
                  name="cliente"
                  required
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Selecione a peca" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-sm">
                    <SelectGroup>
                      {pecas.map((peca) => (
                        <SelectItem key={peca.id} value={peca.id.toString()}>
                          {peca.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Veículo</Label>
                <Select
                  onValueChange={(e) =>
                    setRetirada({ ...retirada, veiculoId: Number(e) })
                  }
                  name="cliente"
                  required
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Selecione o veiculo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {veiculos.map((veiculo) => (
                        <SelectItem
                          key={veiculo.id}
                          value={veiculo.id.toString()}
                        >
                          {veiculo.prefixo} | {veiculo.placa}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min={1}
                  onChange={(e) =>
                    setRetirada({
                      ...retirada,
                      quantidade: Number(e.target.value),
                    })
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