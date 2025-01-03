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
import editIcon from "@/app/assets/edit.svg";
import Image from "next/image";
import { Cidade, Uf, Veiculo } from "@/lib/types";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";
import axios from "axios";
import { Label } from "@/components/ui/label";

interface VeiculoProps {
  veiculo: Veiculo;
  setVeiculos: React.Dispatch<React.SetStateAction<Veiculo[]>>;
  veiculos: Veiculo[];
}

export default function DialogEditar({
  veiculo,
  setVeiculos,
  veiculos,
}: VeiculoProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [veiculoState, setVeiculoState] = useState<Veiculo>(veiculo);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const sortedUfs = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUfs(sortedUfs);
      })
      .catch((error) => {
        console.error("Error fetching UFs:", error);
      });

    handleUfChange(veiculo.uf);
  }, []);

  const handleUfChange = (uf: string) => {
    setVeiculoState({ ...veiculoState, uf: uf });

    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const sortedCidades = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCidades(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEditando(true);

    try {
      const response = await api.put(`/veiculo/${veiculo.id}`, veiculoState);
      const veiculoAtualizado = response.data.data;

      const veiculosAtualizados = veiculos.map((v) => {
        return v.id === veiculoAtualizado.id ? veiculoAtualizado : v;
      });
      setVeiculos(veiculosAtualizados);
      toast.success("Veículo atualizado.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar atualizar veículo.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("erro ao atualizar veículo", error);
    } finally {
      setEditando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent cursor-pointer hover:scale-110">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="w-6 md:w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[1100px] h-[550px] md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Veículo</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <fieldset className="border p-4 rounded w-full">
            <legend className="font-semibold">Veículo</legend>
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="prefixo">Prefixo:</label>
                  <Input
                    name="prefixo"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o prefixo..."
                    value={veiculoState.prefixo}
                    onChange={(e) => {
                      setVeiculoState({
                        ...veiculoState,
                        prefixo: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="placa">Placa:</label>
                  <Input
                    name="placa"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a placa..."
                    value={veiculoState.placa}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        placa: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="kmAtual">KM Atual:</label>
                  <Input
                    name="kmAtual"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a quilometragem atual..."
                    value={veiculoState.kmAtual}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        kmAtual: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="marca">Marca:</label>
                  <Input
                    name="marca"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a marca..."
                    value={veiculoState.marca}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        marca: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <Label htmlFor="uf">UF Emplacamento</Label>
                <select
                  id="uf"
                  value={veiculoState.uf}
                  onChange={(e) => handleUfChange(e.target.value)}
                  className="w-[250px] border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a UF</option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mt-4">
                <Label htmlFor="localEmplacado">Local Emplacamento</Label>
                <select
                  id="localEmplacado"
                  value={veiculoState.localEmplacado}
                  onChange={(e) =>
                    setVeiculoState({
                      ...veiculoState,
                      localEmplacado: e.target.value,
                    })
                  }
                  className="w-[250px] border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="capacidadeTank">Cap. Tanque:</label>
                  <Input
                    name="capacidadeTank"
                    type="number"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a capacidade..."
                    value={veiculoState.capacidadeTank}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        capacidadeTank: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ano">Ano:</label>
                  <Input
                    name="ano"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o ano..."
                    value={veiculoState.ano}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        ano: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="tipo">Tipo:</label>
                  <Input
                    name="tipo"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o tipo..."
                    value={veiculoState.tipo}
                    onChange={(e) => setVeiculoState({
                      ...veiculoState,
                      tipo: e.target.value
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="modelo">Modelo:</label>
                  <Input
                    name="modelo"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o modelo..."
                    value={veiculoState.modelo}
                    onChange={(e) => setVeiculoState({
                      ...veiculoState,
                      modelo: e.target.value
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="quantidadePoltronas">Qtd. Poltronas:</label>
                  <Input
                    name="quantidadePoltronas"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a quantidade..."
                    value={veiculoState.quantidadePoltronas}
                    onChange={(e) =>
                      setVeiculoState({
                        ...veiculoState,
                        quantidadePoltronas: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[250px]">
              {editando ? (
                <Image
                  src={loading}
                  alt="editando"
                  width={25}
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
