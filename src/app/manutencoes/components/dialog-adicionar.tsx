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
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface ManutencaoProps {
  manutencoes: Manutencao[];
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
}

export default function DialogAdicionar({
  manutencoes,
  setManutencoes,
}: ManutencaoProps) {
  const [dataPrevista, setDataPrevista] = useState("");
  const [vencimentoPagamento, setVencimentoPagamento] = useState<string | null>(
    ""
  );
  const [dataRealizada, setDataRealizada] = useState<string | null>("");
  const [tipo, setTipo] = useState("");
  const [servicoId, setServico] = useState<number>(0);
  const [veiculoId, setVeiculo] = useState<number>(0);
  const [kmPrevista, setKmPrevista] = useState<number>();
  const [kmAtual, setKmAtual] = useState<number>();
  const [kmRealizada, setKmRealizada] = useState<number>();
  const [custo, setCusto] = useState<number>();
  const [tipoPagamento, setTipoPagamento] = useState<string>("");
  const [realizada, setRealizada] = useState<number>(0);
  const [parcelas, setParcelas] = useState<number>(0);
  const [vencimentos, setVencimentos] = useState<string[]>([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<
    Veiculo | undefined
  >();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  const [adicionando, setAdicionando] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdicionando(true);
    if (!veiculoId || !servicoId) {
      alert("Por favor, selecione um veículo e um serviço.");
      return;
    }

    if (realizada == 1 && tipoPagamento == "") {
      toast("Preencha os dados da despesa corretamente");
      return;
    }

    if (
      (realizada === 1 && tipoPagamento === "Boleto" && parcelas === 0) ||
      vencimentos.includes("")
    ) {
      toast("verifique os valores de pagamentos do boleto e as parcelas");
      return;
    }

    const manutencaoData = {
      dataPrevista: dataPrevista,
      dataRealizada: realizada === 1 ? dataRealizada : null,
      tipo,
      servicoId: Number(servicoId),
      veiculoId: Number(veiculoId),
      kmPrevista,
      kmAtual,
      kmRealizada,
      custo,
      vencimentos,
      tipoPagamento,
      vencimentoPagamento:
        realizada === 1 && tipoPagamento !== "Boleto"
          ? vencimentoPagamento
          : null,
      realizada: realizada === 1 ? true : false,
      parcelas,
    };

    try {
      const response = await api.post("/manutencao", manutencaoData);
      setManutencoes([...manutencoes, response.data.data]);
      toast.success("Manutenção adicionada.");
      console.log("Manutenção adicionada:", response.data.data);
    } catch (error) {
      toast.error("Erro ao tentar adicionar manutenção.");
      console.error("Erro ao adicionar manutenção:", error);
    } finally {
      setDataPrevista("");
      setDataRealizada("");
      setTipo("");
      setServico(0);
      setVeiculo(0);
      setKmPrevista(0);
      setKmAtual(0);
      setKmRealizada(0);
      setCusto(0);
      setAdicionando(false);
    }
  };

  const selecionarVeiculo = (id: number) => {
    const veiculo = veiculos.find((v) => Number(v.id) === id);
    setVeiculoSelecionado(veiculo);
    setKmAtual(veiculo?.kmAtual);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[255px] md:w-[200px] p-1 text-center text-white rounded-md cursor-pointer transition-all">
          Adicionar Manutenção
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-[600px] md:h-[90%] flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Manutenção
          </DialogTitle>
        </DialogHeader>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <fieldset className="border flex-1 p-4 rounded w-auto">
              <legend className="font-bold text-lg">Informações</legend>
              <div className="grid grid-cols-2 gap-4 w-auto justify-center">
                <div>
                  <label htmlFor="tipo">Tipo:</label>
                  <Select
                    name="tipo"
                    value={tipo}
                    onValueChange={(value) => setTipo(value)}
                  >
                    <SelectTrigger className="md:w-[250px]">
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
                  <label htmlFor="servico">Serviço:</label>
                  <select
                    id="servico"
                    name="servico"
                    value={servicoId}
                    onChange={(e) => setServico(Number(e.target.value))}
                    className="md:w-[250px] border rounded-md p-2"
                  >
                    <option value="">Selecione o serviço...</option>
                    {servicos.map((servico) => (
                      <option key={servico.id} value={servico.id}>
                        {servico.nomeServico}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="veiculo">Veículo:</label>
                  <select
                    id="veiculo"
                    name="veiculo"
                    value={veiculoId}
                    onChange={(e) => {
                      setVeiculo(Number(e.target.value));
                      selecionarVeiculo(Number(e.target.value));
                    }}
                    className="md:w-[250px] border rounded-md p-2"
                  >
                    <option value="0">Selecione o veículo...</option>
                    {veiculos.map((veiculo) => (
                      <option key={veiculo.id} value={veiculo.id}>
                        {veiculo.prefixo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="kmAtual">KM Atual:</label>
                  <Input
                    type="number"
                    name="kmAtual"
                    className="border-2 font-medium md:w-[250px]"
                    placeholder="Digite a quilometragem..."
                    value={veiculoSelecionado ? veiculoSelecionado.kmAtual : 0}
                    onChange={(e) => setKmAtual(Number(e.target.value))}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dataPrevista">Data Prevista:</label>
                  <Input
                    type="date"
                    name="dataPrevista"
                    className="border-2 font-medium  md:w-[250px]"
                    placeholder="Digite o valor..."
                    value={dataPrevista}
                    onChange={(e) => setDataPrevista(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="kmPrevista">KM Prevista:</label>
                  <Input
                    name="kmPrevista"
                    type="number"
                    className="border-2 font-medium  md:w-[250px]"
                    placeholder="Digite a quilometragem..."
                    value={kmPrevista ? kmPrevista : ""}
                    onChange={(e) => setKmPrevista(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="tipo">Status:</label>
                  <Select
                    name="status"
                    value={realizada.toString()}
                    onValueChange={(value) => {
                      setRealizada(Number(value));
                      if (realizada == 0) {
                        setDataRealizada("");
                        setKmRealizada(0);
                      }
                    }}
                    required
                  >
                    <SelectTrigger className="md:w-[250px]">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="0">Prevista</SelectItem>
                        <SelectItem value="1">Realizada</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="dataRealizada">Data Realizada:</label>
                  <Input
                    type="date"
                    name="dataRealizada"
                    className="border-2 font-medium md:w-[250px]"
                    value={dataRealizada ?? ""}
                    onChange={(e) =>
                      setDataRealizada(e.target.value.toString())
                    }
                    disabled={realizada == 0}
                    required={realizada == 1}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="kmRealizada">KM Realizada:</label>
                  <Input
                    type="number"
                    name="kmRealizada"
                    className="border-2 font-medium  md:w-[250px]"
                    placeholder="Digite a quilometragem..."
                    value={kmRealizada ? kmRealizada : ""}
                    onChange={(e) => setKmRealizada(Number(e.target.value))}
                    disabled={realizada == 0}
                    required={realizada == 1}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="custo">Custo:</label>
                  <Input
                    type="number"
                    name="custo"
                    className="border-2 font-medium  md:w-[250px]"
                    placeholder="Digite o valor..."
                    value={custo ? custo : ""}
                    onChange={(e) => setCusto(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="border p-4 flex-1 rounded w-auto">
              <legend className="font-bold text-lg">
                Informações da Despesa
              </legend>
              <div className="grid grid-cols-2 gap-4 w-auto justify-center">
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
                    disabled={realizada == 0}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
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
                                  const updatedVencimentos = [
                                    ...prevVencimentos,
                                  ];
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
                      disabled={realizada == 0}
                    />
                  </div>
                )}
              </div>
            </fieldset>
          </div>

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
