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
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { Cidade, Uf, Veiculo } from "@/lib/types";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import axios from "axios";

interface VeiculosProps {
  setVeiculos: React.Dispatch<React.SetStateAction<Veiculo[]>>;
  veiculos: Veiculo[];
}

export default function DialogAdicionar({
  setVeiculos,
  veiculos,
}: VeiculosProps) {
  const [prefixo, setPrefixo] = useState("");
  const [placa, setPlaca] = useState("");
  const [kmAtual, setKmAtual] = useState("");
  const [marca, setMarca] = useState("");
  const [localEmplacado, setLocalEmplacado] = useState("");
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [carroceria, setCarroceria] = useState("");
  const [capacidadeTank, setCapacidadeTank] = useState<number>();
  const [ano, setAno] = useState<number>();
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [quantidadePoltronas, setQuantidadePoltronas] = useState<number>();
  const [adicionando, setAdicionando] = useState(false);

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
  }, []);

  const handleUfChange = (uf: string) => {
    setLocalEmplacado(uf);
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
    setAdicionando(true);

    const veiculoData = {
      prefixo,
      placa,
      kmAtual,
      marca,
      localEmplacado,
      ufs,
      carroceria,
      capacidadeTank: Number(capacidadeTank),
      ano: Number(ano),
      tipo,
      modelo,
      quantidadePoltronas: Number(quantidadePoltronas),
    };

    try {
      const response = await api.post("/veiculo", veiculoData);
      setVeiculos([...veiculos, response.data.data]);
      toast.success("Veículo adicionado.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar adicionar veículo.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("erro ao tentar adicionar veículo", error);
    } finally {
      setPrefixo("");
      setPlaca("");
      setKmAtual("");
      setMarca("");
      setLocalEmplacado("");
      setUfs([]);
      setCarroceria("");
      setCapacidadeTank(0);
      setAno(0);
      setTipo("");
      setModelo("");
      setQuantidadePoltronas(0);
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Veículo
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[1100px] h-screen md:h-[550px] flex flex-col items-center overflow-y-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Veículo</DialogTitle>
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
                    value={prefixo}
                    onChange={(e) => setPrefixo(e.target.value)}
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
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
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
                    value={kmAtual}
                    onChange={(e) => setKmAtual(e.target.value)}
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
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="uf">UF</label>
                <select
                  id="uf"
                  onChange={(e) => handleUfChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a UF</option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="localEmplacado">Cidade Emplacamento</label>
                <select
                  id="localEmplacado"
                  onChange={(e) => setLocalEmplacado(e.target.value)}
                  className="w-[250px] border border-gray-300 rounded px-1 py-2"
                >
                  <option value="">Selecione a Cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="carroceria">Carroceria:</label>
                  <Input
                    name="carroceria"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a carroceria..."
                    value={carroceria}
                    onChange={(e) => setCarroceria(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="capacidadeTank">Cap. Tanque:</label>
                  <Input
                    name="capacidadeTank"
                    type="number"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite a capacidade..."
                    value={capacidadeTank}
                    onChange={(e) => setCapacidadeTank(Number(e.target.value))}
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
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
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
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
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
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
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
                    value={quantidadePoltronas}
                    onChange={(e) =>
                      setQuantidadePoltronas(Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[250px]">
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
