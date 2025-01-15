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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Cidade, Motorista, Uf, Veiculo, Viagem } from "@/lib/types";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import { useRouter } from "next/navigation";

interface EditarProps {
  setViagens: React.Dispatch<React.SetStateAction<Viagem[]>>;
  viagens: Viagem[];
  viagemprop: Viagem;
}

export default function DialogEditar({
  setViagens,
  viagens,
  viagemprop,
}: EditarProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidadesSaida, setCidadesSaida] = useState<Cidade[]>([]);
  const [cidadesVolta, setCidadesVolta] = useState<Cidade[]>([]);
  const [viagem, setViagem] = useState<Viagem>(viagemprop);
  const [editando, setEditando] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [motorista1, setMotorista1] = useState<number>(viagemprop.motoristaViagens.length > 0 ? viagemprop.motoristaViagens[0].motoristaId : 0);
  const [motorista2, setMotorista2] = useState<number>(viagemprop.motoristaViagens.length > 1 ? viagemprop.motoristaViagens[1].motoristaId : 0);
  const router = useRouter();
  async function fetchMotoristas() {
    try {
      const response = await api.get("/motorista");
      setMotoristas(response.data.data);
    } catch (error) {
      console.log("erro", error);
    }
  }

  async function fetchVeiculos() {
    try {
      const response = await api.get("/veiculo");
      setVeiculos(response.data.data);
    } catch (error) {
      console.log("Erro ao capturar veículos", error);
    }
  }

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

    fetchVeiculos();
    fetchMotoristas();
    handleUfSaidaChange(viagem.rota.saida.ufSaida);
    handleUfDestinoChange(viagem.rota.retorno.ufSaida);
  }, []);

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
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEditando(true);

    try {
      if(motorista1 === 0 ){
        toast("Selecione um motorista novamente");	
        return
      }
      const motoristasId = [motorista1, motorista2].filter((m) => m !== 0);
      setViagem({...viagem, motoristasId: motoristasId});
      const response = await api.put(`viagem/${viagem.id}`, viagem);
      if (!response.data.isSucces) {
        toast.error("Erro ao tentar atualizar viagem.");
        return;
      }
      const viagensAtualizada = viagens.filter((v) => v.id !== viagem.id);
      let viagemCriada = response.data.data as Viagem;
      viagemCriada = {
        ...viagemCriada,
        despesas: [],
        veiculo: viagem.veiculo,
        motoristasId: viagem.motoristasId,
        cliente: viagem.cliente,
        motoristaViagens: viagemCriada.motoristaViagens.map((m) => ({
          ...m,
          motorista: motoristas.find((motorista) => motorista.id === m.motoristaId),
        })),
      } ;
      console.log(viagemCriada);
      setViagens([...viagensAtualizada, {...viagemCriada}]);
      toast.success("Viagem atualizada.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar atualizar viagem.");
    } finally {
      setEditando(false);
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
        setCidadesVolta(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  function selecionarMotorista(id: number, motorista: number) {
    if (motorista === 1) {
      // Atualiza motorista1 e reinicia a lista com apenas motorista1
      setMotorista1(id);
      setMotorista2(0); // Reseta motorista2
      setViagem({
        ...viagem,
        motoristasId: [id], // Lista com apenas motorista1
      });
    } else if (motorista === 2 && motorista1 !== motorista2) {
      // Atualiza motorista2 sem remover motorista1 da lista

      setMotorista2(id);
      setViagem((prevViagem) => ({
        ...prevViagem,
        motoristasId: [
          motorista1, // Garante que motorista1 permaneça na lista
          ...(prevViagem.motoristasId
            ? prevViagem.motoristasId.filter(
                (m) => m !== motorista2 && m !== motorista1
              )
            : []), // Remove apenas o antigo motorista2
          id !== 0 ? id : null, // Adiciona o novo motorista2 apenas se id for diferente de 0
        ].filter((m) => m !== null), // Remove valores null ou indesejados da lista
      }));
    }

    console.log(motorista1, motorista2);
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
    { nome: "Confirmado", valor: "CONFIRMADO" },
    { nome: "Finalizado", valor: "FINALIZADO" },
    { nome: "Cancelado", valor: "TURISMO_RELIGIOSO" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:scale-110 cursor-pointer transition-all">
          <Image src={editIcon} alt="Editar" className="w-6" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[90%] md:h-[700px] h-[550px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Edição de Viagem/Serviço
          </DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col h-full overflow-y-scroll md:overflow-auto">
            <div className="w-full flex flex-col md:flex-row md:h-[200px] justify-evenly gap-4">
              <fieldset className="border h-[200px] border-blue-900 rounded-md p-4 flex-1 flex-col md:flex-row flex gap-2">
                <legend>Cliente</legend>
                <div className="flex-1">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select
                    value={viagem.clienteId.toString()}
                    name="cliente"
                    disabled
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={viagem.clienteId.toString()}>
                          {viagem.cliente?.nome}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="telefone">Telefone Cliente</Label>
                  <Input
                    name="telefone"
                    value={viagem.cliente?.telefone}
                    placeholder="(xx) x xxxx-xxxx"
                    type="tel"
                    id="telefone"
                    disabled
                  />
                </div>
              </fieldset>
              <fieldset className="border border-blue-900 flex-1 flex-col md:flex-row rounded-md p-4 flex gap-2">
                <legend>Servico</legend>
                <div className="flex-1">
                  <Label htmlFor="tiposervico">Tipo do Servico</Label>
                  <Select
                    value={viagem.tipoServico}
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
                    value={viagem.tipoViagem}
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
                    value={viagem.tipoPagamento}
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
                    value={viagem.valorContratado}
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
                          value={viagem.rota.saida.ufSaida}
                          onValueChange={handleUfSaidaChange}
                          name="ufsaida"
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Uf" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {ufs.map((uf) => (
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
                          value={viagem.rota.saida.cidadeSaida}
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
                                <SelectItem key={cidade.id} value={cidade.nome}>
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
                          value={viagem.rota.saida.localDeSaida}
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
                          value={viagem.dataHorarioSaida.data}
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
                          value={viagem.dataHorarioSaida.hora}
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
                          value={viagem.dataHorarioSaidaGaragem.data}
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
                          value={viagem.dataHorarioSaidaGaragem.hora}
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
                          value={viagem.rota.retorno.ufSaida}
                          onValueChange={handleUfDestinoChange}
                          name="ufdestino"
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Uf" />
                          </SelectTrigger>
                          <SelectContent className="absolute max-h-[200px]">
                            <SelectGroup>
                              {ufs.map((uf) => (
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
                          value={viagem.rota.retorno.cidadeSaida}
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
                              {cidadesVolta.map((cidade) => (
                                <SelectItem key={cidade.id} value={cidade.nome}>
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
                          value={viagem.rota.retorno.localDeSaida}
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
                          value={viagem.dataHorarioRetorno.data}
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
                          value={viagem.dataHorarioRetorno.hora}
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
                          value={viagem.dataHorarioChegada.data}
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
                          value={viagem.dataHorarioChegada.hora}
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
                <Label htmlFor="itinerario" className="text-md">
                  Itinerario
                </Label>
                <Textarea
                  value={viagem.itinerario}
                  name="itinerario"
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
                    defaultValue={viagem.veiculoId.toString()}
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
                          <SelectItem
                            key={veiculo.id}
                            value={veiculo.id.toString()}
                          >
                            {veiculo.placa}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 ">
                <div className="w-full">
                  <Label>Km Inicial</Label>
                  <Input disabled value={viagem.kmInicialVeiculo} />
                </div>
                <div className="w-full">
                  <Label>Km Final</Label>
                  <Input onChange={(e) => setViagem({ ...viagem, kmFinalVeiculo: Number(e.target.value) })} value={viagem.kmFinalVeiculo} />
                </div>
                </div>
              </fieldset>
              <fieldset className="rounded border border-blue-500 p-4">
                <legend>Motorista</legend>
                <div>
                  <Label htmlFor="motorista1">Motorista 1</Label>
                  <Select
                    defaultValue={viagemprop.motoristaViagens.length >0 ? viagem.motoristaViagens[0].motoristaId.toString() : "0"}
                    onValueChange={(e) => selecionarMotorista(Number(e), 1)}
                    name="motorista1"
                    required
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecionar Motorista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {motoristas.map((motorista) => (
                          <SelectItem
                            key={motorista.id}
                            value={motorista.id.toString()}
                          >
                            {motorista.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Label htmlFor="motorista2">Motorista 2</Label>
                  <Select
                    onValueChange={(e) => selecionarMotorista(Number(e), 2)}
                    name="motorista2"
                    defaultValue={viagemprop.motoristaViagens.length >1 ? viagem.motoristaViagens[1].motoristaId.toString() : "0"}
                    required
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Selecionar Motorista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Nenhum</SelectItem>
                        {motoristas
                          .filter((m) => m.id !== motorista1)
                          .map((motorista) => (
                            <SelectItem
                              key={motorista.id}
                              value={motorista.id.toString()}
                            >
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
                  value={viagem.status.toString()}
                  onValueChange={(e) => setViagem({ ...viagem, status: e })}
                  name="status"
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Status" />
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
          <DialogFooter className="flex items-center gap-2">
            <DialogClose>
              <Button type="button" variant="outline" className="mb-10">
                Fechar
              </Button>
            </DialogClose>

            <Button type="submit" className="md:mb-10">
              {editando ? (
                <Image
                  src={loading}
                  alt="carregando"
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
