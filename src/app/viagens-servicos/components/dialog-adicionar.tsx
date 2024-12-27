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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { Cidade, Cliente, Motorista, Uf, Veiculo, Viagem } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";

interface AdicionarProps {
  setViagens: React.Dispatch<React.SetStateAction<Viagem[]>>;
  viagens: Viagem[];
}

export default function DialogAdicionar({
  setViagens,
  viagens,
}: AdicionarProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [ufsSaida, setUfsSaida] = useState<Uf[]>([]);
  const [cidadesSaida, setCidadesSaida] = useState<Cidade[]>([]);
  const [ufsRetorno, setUfsRetorno] = useState<Uf[]>([]);
  const [cidadesRetorno, setCidadesRetorno] = useState<Cidade[]>([]);
  const [viagem, setViagem] = useState<Viagem>({
    id: 0,
    rota: {
      saida: {
        ufSaida: "",
        cidadeSaida: "",
        localDeSaida: "",
      },
      retorno: {
        ufSaida: "",
        cidadeSaida: "",
        localDeSaida: "",
      },
    },
    dataHorarioSaida: {
      data: "",
      hora: "",
    },
    dataHorarioRetorno: {
      data: "",
      hora: "",
    },
    dataHorarioSaidaGaragem: {
      data: "",
      hora: "",
    },
    dataHorarioChegada: {
      data: "",
      hora: "",
    },
    clienteId: 0,
    tipoServico: "",
    status: "",
    tipoViagem: "",
    tipoPagamento: "",
    valorContratado: 0,
    itinerario: "",
    veiculoId: 0,
    motoristaId: 0,
    kmInicialVeiculo: 0,
    kmFinalVeiculo: 0,
  });
  const [adicionando, setAdicionando] = useState(false);

  async function fetchClientes() {
    const response = await api.get("/cliente");

    if (!response.data.isSucces) {
      console.log(response.data.message);
    }

    setClientes(response.data.data);
  }

  async function fetchMotoristas() {
    const response = await api.get("/motorista");

    if (!response.data.isSucces) {
      console.log(response.data.message);
    }

    setMotoristas(response.data.data);
  }

  async function fetchVeiculos() {
    const response = await api.get("/veiculo");

    if (!response.data.isSucces) {
      console.log(response.data.message);
    }

    setVeiculos(response.data.data);
  }

  useEffect(() => {
    fetchClientes();
    fetchMotoristas();
    fetchVeiculos();
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const sortedUfs = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUfsSaida(sortedUfs);
        setUfsRetorno(sortedUfs);
      })
      .catch((error) => {
        console.error("Error fetching UFs:", error);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAdicionando(true);

    try {
      const response = await api.post("/viagem", viagem);
      if (!response.data.isSucces) {
        toast(
          "erro ao tentar criar viagem, recarregue a pagina e tente novamente"
        );
        return;
      }
      setViagens([...viagens, viagem]);
      toast.success("Viagem adicionada.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      setAdicionando(false);
    } catch (error) {
      toast.error("Erro ao tentar adicionar viagem.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log(error);
      setAdicionando(false);
    }
  }

  const handleUfSaidaChange = (uf: string) => {
    setViagem({
      ...viagem,
      rota: { ...viagem.rota, saida: { ...viagem.rota.saida, ufSaida: uf } },
    });
    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const sortedCidades = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCidadesSaida(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  const handleUfDestinoChange = (uf: string) => {
    setViagem({
      ...viagem,
      rota: {
        ...viagem.rota,
        retorno: { ...viagem.rota.retorno, ufSaida: uf },
      },
    });
    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const sortedCidades = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCidadesRetorno(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  function selecionarVeiculo(id: number) {
    const veiculoSelecionado = veiculos.find((v) => Number(v.id) === id);
    setViagem((prevViagem) => ({
      ...prevViagem,
      veiculoId: id,
      kmInicialVeiculo:
        Number(veiculoSelecionado?.kmAtual) || prevViagem.kmInicialVeiculo,
      veiculo: veiculoSelecionado,
    }));
  }

  function selecionarMotorista(id: number) {
    const motoristaSelecionado = motoristas.find((m) => Number(m.id) === id);
    setViagem((prevViagem) => ({
      ...prevViagem,
      motoristaId: id,
      motorista: motoristaSelecionado,
    }));
  }

  function selecionarCliente(id: number) {
    const clienteSelecionado = clientes.find((c) => Number(c.id) === id);
    setViagem((prevViagem) => ({
      ...prevViagem,
      clienteId: id,
      cliente: clienteSelecionado,
    }));
  }
  const servicos = [
    { nome: "Turismo", valor: "TURISMO" },
    { nome: "Escolar", valor: "ESCOLAR" },
    { nome: "Especial", valor: "ESPECIAL" },
    { nome: "Fretamento", valor: "FRETAMENTO" },
    { nome: "Translado", valor: "TRANSLADO" },
    { nome: "Turismo Religioso", valor: "TURISMO_RELIGIOSO" },
    { nome: "Trans Funcionarios", valor: "TRANS_FUNCIONARIOS" },
  ];

  const tipo_viagem = [
    "INTERMUNICIPAL",
    "MUNICIPAL",
    "INTERESTADUAL",
    "INTERNACIONAL",
  ];
  const status_viagem = [
    { nome: "Pendente", valor: "PENDENTE" },
    { nome: "Orcamento", valor: "ORCAMENTO" },
    { nome: "Agendado", valor: "AGENDADO" },
    { nome: "Confirmado", valor: "CONFIRMADO" },
    { nome: "Finalizado", valor: "FINALIZADO" },
    { nome: "Cancelado", valor: "TURISMO_RELIGIOSO" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[250px] md:w-[250px] rounded-sm text-white text-center p-1 cursor-pointer transition-all">
          Adicionar Viagem/Serviço
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[90%] md:h-[700px] flex flex-col items-center h-screen overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Viagem/Serviço
          </DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex h-full overflow-y-scroll md:overflow-auto flex-col">
            <div className="w-full flex flex-col md:flex-row md:h-[200px] justify-evenly gap-4">
              <fieldset className="border h-[200px] border-blue-900 rounded-md p-4 flex-1 flex-col md:flex-row flex gap-2">
                <legend>Cliente</legend>
                <div className="flex-1">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select
                    onValueChange={(e) => selecionarCliente(Number(e))}
                    name="cliente"
                    required
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {clientes.map((cliente) => (
                          <SelectItem
                            key={cliente.id}
                            value={cliente.id.toString()}
                          >
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label htmlFor="telefone">Telefone Cliente</Label>
                  <Input
                    name="telefone"
                    value={
                      clientes.find((cliente) => cliente.id == viagem.clienteId)
                        ?.telefone
                    }
                    placeholder="(xx) x xxxx-xxxx"
                    type="tel"
                    id="telefone"
                  />
                </div>
              </fieldset>
              <fieldset className="border border-blue-900 flex-1 flex-col md:flex-row rounded-md p-4 flex gap-2">
                <legend>Servico</legend>
                <div className="flex-1">
                  <Label htmlFor="tiposervico">Tipo do Servico</Label>
                  <Select
                    onValueChange={(e) =>
                      setViagem({ ...viagem, tipoServico: e })
                    }
                    name="tiposervico"
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {servicos.map((servico) => (
                          <SelectItem key={servico.nome} value={servico.valor}>
                            {servico.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label htmlFor="tiposervico">Tipo da viagem</Label>
                  <Select
                    onValueChange={(e) =>
                      setViagem({ ...viagem, tipoViagem: e })
                    }
                    name="tiposervico"
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {tipo_viagem.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="pagamento">Tipo do Pagamento</Label>
                  <Select
                    onValueChange={(e) =>
                      setViagem({ ...viagem, tipoPagamento: e })
                    }
                    name="pagamento"
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PRAZO">A prazo</SelectItem>
                        <SelectItem value="VISTA">A vista</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 w-[100px]">
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    name="valor"
                    onChange={(e) =>
                      setViagem({
                        ...viagem,
                        valorContratado: Number(e.target.value),
                      })
                    }
                    placeholder="0,00R$"
                    type="number"
                  />
                </div>
              </fieldset>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-2 mt-2">
              <div className="flex flex-col flex-1">
                <div className="w-full">
                  <fieldset className="border-2 border-green-600 rounded-md justify-between p-4 flex flex-col md:flex-row gap-2">
                    <legend>Local Inicial / Origem / Destino</legend>

                    <div className="flex flex-col md:flex-row gap-2">
                      <div>
                        <Label htmlFor="ufsaida">UF Saida</Label>
                        <Select
                          onValueChange={handleUfSaidaChange}
                          name="ufsaida"
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Uf" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {ufsSaida.map((uf) => (
                                <SelectItem key={uf.sigla} value={uf.sigla}>
                                  {uf.sigla}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="origem">Origem</Label>
                        <Select
                          name="origem"
                          onValueChange={(e) =>
                            setViagem({
                              ...viagem,
                              rota: {
                                ...viagem.rota,
                                saida: {
                                  ...viagem.rota.saida,
                                  cidadeSaida: e,
                                },
                              },
                            })
                          }
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Origem" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {cidadesSaida.map((cidade) => (
                                <SelectItem value={cidade.nome}>
                                  {cidade.nome}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="localsaida">Local saida</Label>
                        <Input
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              rota: {
                                ...viagem.rota,
                                saida: {
                                  ...viagem.rota.saida,
                                  localDeSaida: e.target.value,
                                },
                              },
                            })
                          }
                          name="localsaida"
                          type="text"
                          placeholder="digite o local de saída"
                        />
                      </div>

                      <div>
                        <Label htmlFor="date">Data saida</Label>
                        <Input
                          name="date"
                          type="date"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioSaida: {
                                ...viagem.dataHorarioSaida,
                                data: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="horariosaida">Horario </Label>
                        <Input
                          name="horariosaida"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioSaida: {
                                ...viagem.dataHorarioSaida,
                                hora: e.target.value,
                              },
                            })
                          }
                          type="time"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <Label htmlFor="saidagaragem">Saida Garagem</Label>
                        <Input
                          name="saidagaragem"
                          type="date"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioSaidaGaragem: {
                                ...viagem.dataHorarioSaidaGaragem,
                                data: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="horasaida">Hora Saida</Label>
                        <Input
                          name="horasaida"
                          type="time"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioSaidaGaragem: {
                                ...viagem.dataHorarioSaidaGaragem,
                                hora: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="w-full">
                  <fieldset className="border-2 border-red-600 rounded-md justify-between p-4 flex flex-col md:flex-row gap-2">
                    <legend>Local Final / Destino / Retorno</legend>

                    <div className="flex flex-col md:flex-row gap-2">
                      <div>
                        <Label htmlFor="ufdestino">UF Destino</Label>
                        <Select
                          onValueChange={handleUfDestinoChange}
                          name="ufdestino"
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Uf" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {ufsRetorno.map((uf) => (
                                <SelectItem key={uf.sigla} value={uf.sigla}>
                                  {uf.sigla}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="destino">Destino</Label>
                        <Select
                          name="destino"
                          onValueChange={(e) =>
                            setViagem({
                              ...viagem,
                              rota: {
                                ...viagem.rota,
                                retorno: {
                                  ...viagem.rota.retorno,
                                  cidadeSaida: e,
                                },
                              },
                            })
                          }
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Origem" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {cidadesRetorno.map((cidade) => (
                                <SelectItem value={cidade.nome}>
                                  {cidade.nome}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="localsaida">Local saida</Label>
                        <Input
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              rota: {
                                ...viagem.rota,
                                retorno: {
                                  ...viagem.rota.retorno,
                                  localDeSaida: e.target.value,
                                },
                              },
                            })
                          }
                          name="localsaida"
                          type="text"
                          placeholder="digite o local de saída"
                        />
                      </div>

                      <div>
                        <Label htmlFor="date">Data retorno</Label>
                        <Input
                          name="date"
                          type="date"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioRetorno: {
                                ...viagem.dataHorarioRetorno,
                                data: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="horariosaida">hora retorno </Label>
                        <Input
                          name="horariosaida"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioRetorno: {
                                ...viagem.dataHorarioRetorno,
                                hora: e.target.value,
                              },
                            })
                          }
                          type="time"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <Label htmlFor="saidagaragem">Data Chegada</Label>
                        <Input
                          name="saidagaragem"
                          type="date"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioChegada: {
                                ...viagem.dataHorarioChegada,
                                data: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="horasaida">Hora Chegada</Label>
                        <Input
                          name="horasaida"
                          type="time"
                          onChange={(e) =>
                            setViagem({
                              ...viagem,
                              dataHorarioChegada: {
                                ...viagem.dataHorarioChegada,
                                hora: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="flex flex-col md:min-w-[20%]">
                <Label htmlFor="intinerario" className="text-md">
                  Itinerario
                </Label>
                <Textarea
                  name="itinerario"
                  id=""
                  className="border border-black rounded-md h-full"
                  onChange={(e) =>
                    setViagem({ ...viagem, itinerario: e.target.value })
                  }
                ></Textarea>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <fieldset className="rounded border border-yellow-500 p-4">
                <legend>Veiculo</legend>
                <div>
                  <Label htmlFor="veiculo">Veiculo</Label>
                  <Select
                    onValueChange={(e) => selecionarVeiculo(Number(e))}
                    name="veiculo"
                    required
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecionar Veiculo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {veiculos.map((veiculo) => (
                          <SelectItem value={veiculo.id.toString()}>
                            {veiculo.placa}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Km Inicial</Label>
                  <Input disabled value={viagem.kmInicialVeiculo} />
                </div>
              </fieldset>
              <fieldset className="rounded border border-blue-500 p-4">
                <legend>Motorista</legend>
                <div>
                  <Label>Motorista</Label>
                  <Select
                    onValueChange={(e) => selecionarMotorista(Number(e))}
                    name="ufsaida"
                    required
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecionar Motorista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {motoristas.map((motorista) => (
                          <SelectItem value={motorista.id.toString()}>
                            {motorista.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>
              <div>
                <Label htmlFor="status">Situacao da viagem</Label>
                <Select
                  onValueChange={(e) => setViagem({ ...viagem, status: e })}
                  name="status"
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Situação" />
                  </SelectTrigger>
                  <SelectContent className="absolute max-h-[200px]">
                    <SelectGroup>
                      {status_viagem.map((status_viagem) => (
                        <SelectItem
                          key={status_viagem.nome}
                          value={status_viagem.valor}
                        >
                          {status_viagem.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-center items-center gap-2 pb-10">
            <DialogClose>
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit">
              {adicionando ? (
                <Image
                  src={loading}
                  alt="carregando"
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
