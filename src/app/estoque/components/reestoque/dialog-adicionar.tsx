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
import { AdicionarPeca, Peca, RetiradaPeca, Veiculo } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loadingicon from "@/app/assets/loading.svg";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SelectContent, SelectLabel } from "@radix-ui/react-select";

interface AdicionarProps {
  setReestoques: React.Dispatch<React.SetStateAction<AdicionarPeca[]>>;
  reestoques: AdicionarPeca[];
}

export default function DialogAdicionar({
  setReestoques,
  reestoques,
}: AdicionarProps) {
  const router = useRouter();
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reestoque, setReestoque] = useState<AdicionarPeca>({
    id: 0,
    pecaId: 0,
    quantidade: 0,
    dataDeEntrada: "",
    precoTotal: 0,
  });

  async function fetchPecas() {
    try {
      const response = await api.get("/peca");

      if (!response.data.isSucces) {
        toast("nao foi possivel buscar alguns dados no sistema");
      }

      setPecas(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar registrar peca");
        }
      }
    }
  }
  useEffect(() => {
    fetchPecas();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await api.post("/reestoque", reestoque);
      if (!response.data.isSucces) {
        toast("nao foi possivel registrar no historico");
        return;
      }

      setReestoques([...reestoques, response.data.data]);
      toast("Registrado com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar registrar no historico");
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[180px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Registrar Reestoque
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-screen md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Reestoque de Peça</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">informacoes</legend>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <Label>Peça</Label>
                <Select
                  onValueChange={(e) =>
                    setReestoque({ ...reestoque, pecaId: Number(e) })
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

              <div className="flex flex-col">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min={1}
                  onChange={(e) =>
                    setReestoque({
                      ...reestoque,
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
