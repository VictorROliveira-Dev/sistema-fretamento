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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Manutencao, Servico, Veiculo } from "@/lib/types";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface ManutencaoProps {
  manutencoes: Manutencao[];
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
  manutencao: Manutencao;
}

export default function DialogEditar({
  manutencoes,
  setManutencoes,
  manutencao,
}: ManutencaoProps) {
  const [dataVencimento, setDataVencimento] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [dataRealizada, setDataRealizada] = useState("");
  const [tipo, setTipo] = useState("");
  const [servicoId, setServico] = useState<number | "">("");
  const [veiculoId, setVeiculo] = useState<number | "">("");
  const [kmPrevista, setKmPrevista] = useState<number>();
  const [kmAtual, setKmAtual] = useState<number>();
  const [kmRealizada, setKmRealizada] = useState<number>();
  const [custo, setCusto] = useState<number>();

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setDataLancamento(
      manutencao.dataLancamento
        ? new Date(manutencao.dataLancamento).toISOString().split("T")[0]
        : ""
    );
    setDataVencimento(
      manutencao.dataVencimento
        ? new Date(manutencao.dataVencimento).toISOString().split("T")[0]
        : ""
    );
    setDataRealizada(
      manutencao.dataRealizada
        ? new Date(manutencao.dataRealizada).toISOString().split("T")[0]
        : ""
    );
    setTipo(manutencao.tipo);
    setServico(manutencao.servicoId);
    setVeiculo(manutencao.veiculoId);
    setKmPrevista(manutencao.kmPrevista);
    setKmAtual(manutencao.kmAtual);
    setKmRealizada(manutencao.kmRealizada);
    setCusto(manutencao.custo);
    const fetchVeiculos = async () => {
      try {
        const response = await api.get("/veiculo");
        setVeiculos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar veículos", error);
      }
    };

    const fetchServicos = async () => {
      try {
        const response = await api.get("/servico");
        setServicos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar serviços", error);
      }
    };

    fetchVeiculos();
    fetchServicos();
  }, [manutencao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditando(true);

    const manutencaoData = {
      dataVencimento,
      dataLancamento,
      dataRealizada,
      tipo,
      servicoId: Number(servicoId),
      veiculoId: Number(veiculoId),
      kmPrevista,
      kmAtual,
      kmRealizada,
      custo,
    };

    try {
      const response = await api.put(
        `/manutencao/${manutencao.id}`,
        manutencaoData
      );
      const manutencaoAtualizada = response.data.data;

      const manutencoesAtualizados = manutencoes.map((m) => {
        return m.id === manutencaoAtualizada.id ? manutencaoAtualizada : m;
      });
      setManutencoes(manutencoesAtualizados);
      toast.success("Manutenção atualizada.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar atualizar manutenção.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao atualizar manutenção:", error);
    } finally {
      setEditando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="w-8 md:w-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-screen md:h-[480px] flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Manutenção</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend>Informações</legend>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <label htmlFor="tipo">Tipo:</label>
                <Select
                  name="tipo"
                  value={tipo}
                  onValueChange={(value) => setTipo(value)}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipos</SelectLabel>
                      <SelectItem value="preventiva">Preventiva</SelectItem>
                      <SelectItem value="corretiva">Corretiva</SelectItem>
                      <SelectItem value="preditiva">Preditiva</SelectItem>
                      <SelectItem value="ordem">Ordens de Serviço</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="veiculo">Veículo:</label>
                <select
                  id="veiculo"
                  name="veiculo"
                  value={veiculoId}
                  onChange={(e) => setVeiculo(Number(e.target.value))}
                  className="w-[250px] border rounded-md p-2"
                >
                  <option value="" disabled>
                    Selecione o veículo...
                  </option>
                  {veiculos.map((veiculo) => (
                    <option key={veiculo.id} value={veiculo.id}>
                      {veiculo.placa}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="servico">Serviço:</label>
                <select
                  id="servico"
                  name="servico"
                  value={servicoId}
                  onChange={(e) => setServico(Number(e.target.value))}
                  className="w-[250px] border rounded-md p-2"
                >
                  <option value="" disabled>
                    Selecione o serviço...
                  </option>
                  {servicos.map((servico) => (
                    <option key={servico.id} value={servico.id}>
                      {servico.nomeServico}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataVencimento">Data Vencimento:</label>
                <Input
                  type="date"
                  name="dataVencimento"
                  className="border-2 font-medium w-[250px]"
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataLancamento">Data Lançamento:</label>
                <Input
                  type="date"
                  name="dataLancamento"
                  className="border-2 font-medium w-[250px]"
                  value={dataLancamento}
                  onChange={(e) => setDataLancamento(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataRealizada">Data Realizada:</label>
                <Input
                  type="date"
                  name="dataRealizada"
                  className="border-2 font-medium w-[250px]"
                  value={dataRealizada}
                  onChange={(e) => setDataRealizada(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="kmPrevista">KM Prevista:</label>
                <Input
                  name="kmPrevista"
                  type="number"
                  className="border-2 font-medium  w-[250px]"
                  placeholder="Digite a quilometragem..."
                  value={kmPrevista}
                  onChange={(e) => setKmPrevista(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="kmAtual">KM Atual:</label>
                <Input
                  type="number"
                  name="kmAtual"
                  className="border-2 font-medium w-[250px]"
                  placeholder="Digite a quilometragem..."
                  value={kmAtual}
                  onChange={(e) => setKmAtual(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="kmRealizada">KM Realizada:</label>
                <Input
                  type="number"
                  name="kmRealizada"
                  className="border-2 font-medium  w-[250px]"
                  placeholder="Digite a quilometragem..."
                  value={kmRealizada}
                  onChange={(e) => setKmRealizada(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="custo">Custo:</label>
                <Input
                  type="number"
                  name="custo"
                  className="border-2 font-medium  w-[250px]"
                  placeholder="Digite o valor..."
                  value={custo}
                  onChange={(e) => setCusto(Number(e.target.value))}
                />
              </div>
            </div>

            <DialogFooter className="flex items-center gap-2 mt-10">
              <Button type="submit" className="w-[250px]">
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
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
