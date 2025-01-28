"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Despesa, Manutencao, Servico, Veiculo } from "@/lib/types";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import loading from "../../assets/loading.svg";
import loadingDark from "../../assets/loading-dark.svg";
import { toast } from "sonner";

interface ManutencaoProps {
  manutencoes: Manutencao[];
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>;
  manutencao: Manutencao;
  onClose: () => void;
}

export default function DialogEditar({
  manutencoes,
  setManutencoes,
  manutencao,
  onClose,
}: ManutencaoProps) {
  const [manutencaoEditar, setManutencaoEditar] =
    useState<Manutencao>(manutencao);
  const [parcelas, setParcelas] = useState<number>(0);
  const [vencimentos, setVencimentos] = useState<string[]>([]);
  const [vencimentoPagamento, setVencimentoPagamento] = useState<string | null>(
    ""
  );

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function fetchManutencao() {
    try {
      setCarregando(true);
      const response = await api.get(`/manutencao/${manutencao.id}`);
      if (!response.data.isSucces) {
        toast("nao foi possivel consultar os dados");
        onClose();
        return;
      }

      if (response.data.data.manutencao.realizada) {
        toast("Não é possivel editar um manutenção que já foi realizada");
        onClose();
        return;
      }

      setManutencaoEditar(response.data.data.manutencao);
    } catch (error) {
      toast("nao foi possivel consultar os dados");
      onClose();
      return;
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    fetchManutencao();
  }, [manutencao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditando(true);

    const manutencaoData = {
      dataPrevista: manutencaoEditar.dataPrevista,
      dataRealizada: manutencaoEditar.realizada
        ? manutencaoEditar.dataRealizada
        : null,
      tipo: manutencaoEditar.tipo,
      kmPrevista: manutencaoEditar.kmPrevista,
      kmAtual: manutencaoEditar.veiculo?.kmAtual,
      kmRealizada: manutencaoEditar.kmRealizada,
      custo: manutencaoEditar.custo,
      vencimentos,
      tipoPagamento: manutencaoEditar.tipoPagamento,
      vencimentoPagamento:
        manutencaoEditar.realizada &&
        manutencaoEditar.tipoPagamento !== "Boleto"
          ? vencimentoPagamento
          : null,
      realizada: manutencaoEditar.realizada,
      parcelas,
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
      toast.success("Manutenção atualizada.");
    } catch (error) {
      toast.error("Erro ao tentar atualizar manutenção.");
      console.error("Erro ao atualizar manutenção:", error);
    } finally {
      setEditando(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="md:w-[1200px] h-[550px] md:h-[90%] flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogClose>
            <Button
              className="absolute right-2 bg-white text-black z-20 top-2"
              onClick={() => onClose()}
            >
              X
            </Button>
          </DialogClose>
          <DialogTitle className="font-black">
            Cadastro de Manutenção
          </DialogTitle>
        </DialogHeader>
        {carregando ? (
          <Image
            src={loadingDark}
            alt="loading"
            className="text-center animate-spin"
          />
        ) : (
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
                      value={manutencaoEditar.tipo}
                      onValueChange={(value) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          tipo: value,
                        })
                      }
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
                          <SelectItem value="ordem">
                            Ordens de Serviço
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="servico">Serviço:</label>
                    <select
                      id="servico"
                      name="servico"
                      value={manutencaoEditar.servicoId}
                      className="w-[250px] border rounded-md p-2"
                      disabled
                    >
                      <option value="">
                        {manutencaoEditar.servico
                          ? manutencaoEditar.servico.nomeServico
                          : ""}
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="veiculo">Veículo:</label>
                    <select
                      id="veiculo"
                      name="veiculo"
                      value={manutencaoEditar.veiculoId}
                      className="w-[250px] border rounded-md p-2"
                      disabled
                    >
                      <option value="0">
                        {manutencaoEditar.veiculo
                          ? manutencaoEditar.veiculo.prefixo
                          : ""}
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="kmAtual">KM Atual:</label>
                    <Input
                      type="number"
                      name="kmAtual"
                      className="border-2 font-medium w-[250px]"
                      placeholder="Digite a quilometragem..."
                      value={
                        manutencaoEditar.veiculo
                          ? manutencaoEditar.veiculo.kmAtual
                          : 0
                      }
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dataPrevista">Data Prevista:</label>
                    <Input
                      type="date"
                      name="dataPrevista"
                      className="border-2 font-medium  w-[250px]"
                      placeholder="Digite o valor..."
                      value={manutencaoEditar.dataPrevista}
                      onChange={(e) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          dataPrevista: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="kmPrevista">KM Prevista:</label>
                    <Input
                      name="kmPrevista"
                      type="number"
                      className="border-2 font-medium  w-[250px]"
                      placeholder="Digite a quilometragem..."
                      value={manutencao.kmPrevista}
                      onChange={(e) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          kmPrevista: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="tipo">Status:</label>
                    <Select
                      name="status"
                      value={manutencaoEditar.realizada ? "1" : "0"} // Converte o booleano para string ("1" ou "0")
                      onValueChange={(value) => {
                        const isRealizada = value === "1"; // Converte o valor string para booleano
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          realizada: isRealizada,
                        });

                        if (!isRealizada) {
                          setManutencaoEditar({
                            ...manutencaoEditar,
                            dataRealizada: "",
                            kmRealizada: 0,
                          }); // Limpa os campos caso não seja realizada
                        }
                      }}
                      required
                    >
                      <SelectTrigger className="w-[250px]">
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
                      className="border-2 font-medium w-[250px]"
                      value={manutencaoEditar.dataRealizada ?? ""}
                      onChange={(e) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          dataRealizada: e.target.value.toString(),
                        })
                      }
                      disabled={!manutencaoEditar.realizada}
                      required={manutencaoEditar.realizada}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="kmRealizada">KM Realizada:</label>
                    <Input
                      type="number"
                      name="kmRealizada"
                      className="border-2 font-medium  w-[250px]"
                      placeholder="Digite a quilometragem..."
                      value={manutencaoEditar.kmRealizada}
                      onChange={(e) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          kmRealizada: Number(e.target.value),
                        })
                      }
                      disabled={!manutencaoEditar.realizada}
                      required={manutencaoEditar.realizada}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="custo">Custo:</label>
                    <Input
                      type="number"
                      name="custo"
                      className="border-2 font-medium  w-[250px]"
                      placeholder="Digite o valor..."
                      value={manutencaoEditar.custo}
                      onChange={(e) =>
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          custo: Number(e.target.value),
                        })
                      }
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
                      value={manutencaoEditar.tipoPagamento}
                      onValueChange={(value) => {
                        setManutencaoEditar({
                          ...manutencaoEditar,
                          tipoPagamento: value,
                        });
                        setVencimentos([]);
                        setVencimentoPagamento("");
                        setParcelas(0);
                      }}
                      disabled={!manutencaoEditar.realizada}
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
                  {manutencaoEditar.tipoPagamento === "Boleto" ? (
                    <div>
                      <div className="flex flex-col">
                        <label htmlFor="parcelas">
                          Quantidade de Parcelas:
                        </label>
                        <Input
                          type="number"
                          name="parcelas"
                          className="border-2 font-medium w-[250px]"
                          max={12}
                          value={parcelas}
                          onChange={(e) => {
                            const novaQuantidadeParcelas = Number(
                              e.target.value
                            );
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
                        disabled={!manutencaoEditar.realizada}
                      />
                    </div>
                  )}
                </div>
              </fieldset>
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
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
