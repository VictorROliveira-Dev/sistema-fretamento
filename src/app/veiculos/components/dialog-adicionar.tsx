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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";

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
  const [uf, setUf] = useState("");
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [carroceria, setCarroceria] = useState("");
  const [capacidadeTank, setCapacidadeTank] = useState<number>();
  const [ano, setAno] = useState<number>();
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [quantidadePoltronas, setQuantidadePoltronas] = useState<number>();
  const [adicionando, setAdicionando] = useState(false);
  const [acessoriosVeiculo, setAcessoriosVeiculo] = useState<string[]>([]);
  const router = useRouter();

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
    setUf(uf);
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

  const adicionarRemoverAcessorio = (acessorio: string) => {
    if (acessoriosVeiculo.includes(acessorio)) {
      setAcessoriosVeiculo(
        acessoriosVeiculo.filter(
          (a) => a.toLocaleLowerCase() !== acessorio.toLocaleLowerCase()
        )
      );

      return;
    }
    setAcessoriosVeiculo([...acessoriosVeiculo, acessorio]);
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
      acessorios: acessoriosVeiculo.toString(),
    };

    try {
      const response = await api.post("/veiculo", veiculoData);
      setVeiculos([...veiculos, response.data.data]);
      toast.success("Veículo adicionado.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar adicionar veículo.");
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

  const acessorios = [
    "Ar condicionado",
    "Tvs",
    "Radio",
    "1 Wc",
    "2 Wc",
    "bebedouro",
    "Geladeira",
    "Cafeteira",
    "USB",
    "Wi-Fi",
    "dvd",
    "som",
    "microfone",
    "apoio de pernas",
    "suporte para celular",
    "sala vip",
    "Mantas",
    "elevador",
    "acessibilidade",
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 py-1 px-2 md:p-1 md:w-[200px] text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Veículo
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[1100px] h-[550px] md:h-[80%] flex flex-col items-center overflow-y-scroll md:overflow-auto">
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
                    value={kmAtual ? kmAtual : ""}
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
              <div className="flex flex-col gap-2">
                <label htmlFor="uf">UF</label>
                <select
                  id="uf"
                  value={uf}
                  onChange={(e) => handleUfChange(e.target.value)}
                  className="w-[250px] border border-gray-300 rounded px-1 py-2"
                >
                  <option value="">Selecione a UF</option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
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
                    value={capacidadeTank ? capacidadeTank : ""}
                    onChange={(e) => setCapacidadeTank(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ano">Ano:</label>
                  <Input
                    type="number"
                    name="ano"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o ano..."
                    value={ano ? ano : ""}
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
                    value={quantidadePoltronas ? quantidadePoltronas : ""}
                    onChange={(e) =>
                      setQuantidadePoltronas(Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 p-4 space-y-4">
              <span className="text-center font-semibold text-md">
                {" "}
                Acessórios
              </span>
              <ToggleGroup
                type="multiple"
                className="grid grid-cols-4"
                value={acessoriosVeiculo}
              >
                {acessorios.map((nome) => (
                  <ToggleGroupItem
                    className="bg-slate-300 data-[state=on]:bg-blue-600"
                    key={nome}
                    value={nome}
                    onClick={() => adicionarRemoverAcessorio(nome)}
                  >
                    {nome}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
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
