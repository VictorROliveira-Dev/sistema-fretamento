"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { Veiculo, ViagemProgramda } from "@/lib/types";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";

interface EditProps {
  setViagens: React.Dispatch<React.SetStateAction<ViagemProgramda[]>>;
  viagemEditavel: ViagemProgramda;
  viagens: ViagemProgramda[];
}

export function DialogEditar({
  setViagens,
  viagemEditavel,
  viagens,
}: EditProps) {
  const [viagem, setViagemEditavel] = useState<ViagemProgramda>(viagemEditavel);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    console.log(viagem);
    const response = await api.put(`/viagemprogramada/${viagem.id}`, viagem);

    if (!response.data.isSucces) {
      toast(response.data.message);
      return;
    }

    viagens = viagens.filter((v) => v.id !== viagem.id);
    setViagens([...viagens, viagem]);
    toast("Viagem atualizada com sucesso");
    setCarregando(false);
  }

  async function fetchVeiculos() {
    const response = await api.get("/veiculo");

    if (!response.data.isSucces) {
      toast("erro ao tentar buscar veiculos, recarregue a pagina");
      return;
    }

    setVeiculos(response.data.data);
  }

  useEffect(() => {
    fetchVeiculos();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-800 hover:bg-blue-600">Editar</Button>
        </DialogTrigger>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-center font-semibold">
              Editar Pacote de Viagem
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="w-full">
            <fieldset className="border border-blue-800 rounded-md p-4 w-full">
              <legend>Informações da viagem</legend>
              <div className="flex gap-2">
                <div>
                  <Label htmlFor="titulo">Identificador</Label>
                  <Input
                    name="titulo"
                    placeholder="Identificador da viagem"
                    onChange={(e) =>
                      setViagemEditavel({ ...viagem, titulo: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input
                    name="responsavel"
                    placeholder="Responsável"
                    onChange={(e) =>
                      setViagemEditavel({
                        ...viagem,
                        responsavel: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="valorPassagem">Valor</Label>
                  <Input
                    name="valorPassagem"
                    type="number"
                    placeholder="00,00R$"
                    onChange={(e) =>
                      setViagemEditavel({
                        ...viagem,
                        valorPassagem: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Forma de pagamento</Label>
                  <Select
                    onValueChange={(value) =>
                      setViagemEditavel({ ...viagem, formaPagto: value })
                    }
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="VISTA">À vista</SelectItem>
                        <SelectItem value="PRAZO">À prazo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Veiculo</Label>
                  <Select
                    onValueChange={(value) =>
                      setViagemEditavel({ ...viagem, veiculoId: Number(value) })
                    }
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {veiculos.map((veiculo) => (
                          <SelectItem
                            key={veiculo.id}
                            value={veiculo.id.toString()}
                          >
                            {veiculo.modelo} - {veiculo.placa}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <fieldset className="border border-green-800 rounded-md p-4">
                  <legend>Saída</legend>
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="dataSaida">Data de Saída</Label>
                      <Input
                        type="date"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            saida: { ...viagem.saida, data: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="horaSaida">Horário</Label>
                      <Input
                        type="time"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            saida: { ...viagem.saida, hora: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="localSaida">Local de Saída</Label>
                      <Input
                        placeholder="Local de saída"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            saida: { ...viagem.saida, local: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border border-green-800 rounded-md p-4">
                  <legend>Retorno</legend>
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="dataRetorno">Data de Retorno</Label>
                      <Input
                        type="date"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            retorno: {
                              ...viagem.retorno,
                              data: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="horaRetorno">Horário</Label>
                      <Input
                        type="time"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            retorno: {
                              ...viagem.retorno,
                              hora: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="localRetorno">Local de Retorno</Label>
                      <Input
                        placeholder="Local de retorno"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            retorno: {
                              ...viagem.retorno,
                              local: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border border-green-800 rounded-md p-4">
                  <legend>Chegada</legend>
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="dataChegada">Data de Chegada</Label>
                      <Input
                        type="date"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            chegada: {
                              ...viagem.chegada,
                              data: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="horaChegada">Horário</Label>
                      <Input
                        type="time"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            chegada: {
                              ...viagem.chegada,
                              hora: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="localChegada">Local de Chegada</Label>
                      <Input
                        placeholder="Local de chegada"
                        onChange={(e) =>
                          setViagemEditavel({
                            ...viagem,
                            chegada: {
                              ...viagem.chegada,
                              local: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="flex gap-2 w-full">
                <div>
                  <Label htmlFor="itinerario">Itinerário</Label>
                  <Textarea
                    name="itinerario"
                    placeholder="Itinerário da viagem"
                    onChange={(e) =>
                      setViagemEditavel({
                        ...viagem,
                        itinerario: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    name="descricao"
                    placeholder="Descrição da viagem"
                    onChange={(e) =>
                      setViagemEditavel({
                        ...viagem,
                        descricao: e.target.value,
                      })
                    }
                    className="w-auto"
                  />
                </div>
                <div>
                  <Label htmlFor="observacao">Observacoes</Label>
                  <Textarea
                    name="observacao"
                    id="observacao"
                    placeholder="observacao da viagem"
                    onChange={(e) =>
                      setViagemEditavel({
                        ...viagem,
                        observacoes: e.target.value,
                      })
                    }
                    className="w-auto"
                  />
                </div>

                <Button type="submit" className="bg-green-600 mt-auto">
                  {carregando ? (
                    <Image
                      src={loading}
                      alt="loading"
                      className="text-center animate-spin"
                    />
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </div>
            </fieldset>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
