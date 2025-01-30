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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { AdicionarPeca, Peca } from "@/lib/types";
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
  setReestoques: React.Dispatch<React.SetStateAction<AdicionarPeca[]>>;
  reestoques: AdicionarPeca[];
}

export default function DialogAdicionar({
  setReestoques,
  reestoques,
}: AdicionarProps) {
  const router = useRouter();
  const [tipoPagamento, setTipoPagamento] = useState<string>("");
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [vencimentos, setVencimentos] = useState<string[]>([]);
  const [vencimentoPagamento, setVencimentoPagamento] = useState<string>("");
  const [parcelas, setParcelas] = useState<number>(0);
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

      const requestData = {
        pecaid: reestoque.pecaId,
        quantidade: reestoque.quantidade,
        precoTotal: reestoque.precoTotal,
        tipoPagamento: tipoPagamento,
        parcelas: parcelas,
        vencimentos: vencimentos,
        vencimento: vencimentoPagamento === "" ? null : vencimentoPagamento,
      };

      const response = await api.post("/reestoque", requestData);
      if (!response.data.isSucces) {
        toast("nao foi possivel registrar no historico");
        return;
      }

      setReestoques([...reestoques, response.data.data]);
      console.log(response.data.data);  
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
        <span className="bg-green-600 hover:bg-green-500 w-[160px] md:w-[200px] p-1 text-sm md:text-base text-center rounded-md text-white cursor-pointer transition-all">
          Registrar Reestoque
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-max h-[90%] md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Reestoque de Peça</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">informacoes</legend>
          <span>
            Quantidade Em estoque:{" "}
            {pecas.find((p) => p.id === reestoque.pecaId)
              ? pecas.find((p) => p.id === reestoque.pecaId)?.quantidade
              : 0}
          </span>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex flex-col items-center"
          >
            <div className="grid grid-cols-2 gap-2 w-full justify-center">
              <div>
                <Label>Peça</Label>
                <Select
                  onValueChange={(e) =>
                    setReestoque({ ...reestoque, pecaId: Number(e) })
                  }
                  name="cliente"
                  required
                >
                  <SelectTrigger>
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

              <div>
                <label htmlFor="tipo">Tipo do pagamento:</label>
                <Select
                  name="tipo"
                  value={tipoPagamento}
                  onValueChange={(value) => {
                    setTipoPagamento(value);
                    setVencimentos([]);
                    setVencimentoPagamento("");
                    setParcelas(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectLabel>Tipos</SelectLabel>
                      <SelectItem value="Boleto">Boleto</SelectItem>
                      <SelectItem value="Pix">Pix</SelectItem>
                      <SelectItem value="Credito">Credito</SelectItem>
                      <SelectItem value="Debito">Debito</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {tipoPagamento === "Boleto" ? (
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="parcelas">Quantidade de Parcelas:</label>
                    <Input
                      type="number"
                      name="parcelas"
                      className="border-2 font-medium w-[250px]"
                      max={12}
                      value={parcelas}
                      onChange={(e) => {
                        const novaQuantidadeParcelas = Number(e.target.value);
                        if (novaQuantidadeParcelas <= 12) {
                          setParcelas(novaQuantidadeParcelas);

                          // Redefinir os vencimentos de acordo com a nova quantidade de parcelas
                          setVencimentos(
                            Array(novaQuantidadeParcelas).fill("")
                          );
                        }
                      }}
                    />
                  </div>

                  {/* Lógica para gerar os campos de vencimento das parcelas */}
                  {parcelas > 0 && (
                    <div className="flex flex-col">
                      <label htmlFor="vencimentoParcelas">
                        Vencimentos das Parcelas:
                      </label>
                      {Array.from({ length: parcelas }, (_, index) => (
                        <div key={index} className="flex flex-col">
                          <label htmlFor={`vencimento${index + 1}`}>
                            Vencimento Parcela {index + 1}:
                          </label>
                          <Input
                            type="date"
                            name={`vencimento${index + 1}`}
                            className="border-2 font-medium w-[250px]"
                            value={vencimentos[index] || ""}
                            onChange={(e) =>
                              setVencimentos((prevVencimentos) => {
                                const updatedVencimentos = [...prevVencimentos];
                                updatedVencimentos[index] = e.target.value;
                                return updatedVencimentos;
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col">
                  <label htmlFor="dataRealizada">
                    Vencimento do Pagamento:
                  </label>
                  <Input
                    type="date"
                    name="dataRealizada"
                    className="border-2 font-medium w-[250px]"
                    value={vencimentoPagamento ?? ""}
                    onChange={(e) => setVencimentoPagamento(e.target.value)}
                  />
                </div>
              )}
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
