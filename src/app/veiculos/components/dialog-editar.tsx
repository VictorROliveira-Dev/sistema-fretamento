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
import { Veiculo } from "@/lib/types";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

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
  const [prefixo, setPrefixo] = useState("");
  const [placa, setPlaca] = useState("");
  const [kmAtual, setKmAtual] = useState("");
  const [marca, setMarca] = useState("");
  const [localEmplacado, setLocalEmplacado] = useState("");
  const [uf, setUf] = useState("");
  const [carroceria, setCarroceria] = useState("");
  const [capacidadeTank, setCapacidadeTank] = useState<number>(0);
  const [ano, setAno] = useState<number>(0);
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [quantidadePoltronas, setQuantidadePoltronas] = useState<number>(0);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setPrefixo(veiculo.prefixo);
    setPlaca(veiculo.placa);
    setKmAtual(veiculo.kmAtual);
    setMarca(veiculo.marca);
    setLocalEmplacado(veiculo.localEmplacado);
    setUf(veiculo.uf);
    setCarroceria(veiculo.carroceria);
    setCapacidadeTank(Number(veiculo.capacidadeTank));
    setAno(veiculo.ano);
    setTipo(veiculo.tipo);
    setModelo(veiculo.modelo);
    setQuantidadePoltronas(veiculo.quantidadePoltronas);
  }, [veiculo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEditando(true);

    const veiculoData = {
      prefixo,
      placa,
      kmAtual,
      marca,
      localEmplacado,
      uf,
      carroceria,
      capacidadeTank: Number(capacidadeTank),
      ano: Number(ano),
      tipo,
      modelo,
      quantidadePoltronas: Number(quantidadePoltronas),
    };

    try {
      const response = await api.put(`/veiculo/${veiculo.id}`, veiculoData);
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
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-screen md:h-[420px] flex flex-col items-center overflow-y-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Veículo</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
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
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="localEmplacado">Local Emplacamento:</label>
                <Input
                  name="localEmplacado"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite a cidade..."
                  value={localEmplacado}
                  onChange={(e) => setLocalEmplacado(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="uf">UF Emplacamento:</label>
                <Input
                  name="uf"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o Estado..."
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                />
              </div>
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
