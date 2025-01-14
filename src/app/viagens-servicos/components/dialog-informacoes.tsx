import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { Abastecimento, Adiantamento, Viagem } from "@/lib/types";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import { DollarSign, Fuel, HandCoins, ReceiptText } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import loading from "../../assets/loading.svg";

interface TravelDialogProps {
  viagem: Viagem;
}

export function TravelDialog({ viagem }: TravelDialogProps) {
  const [viagemCompleta, setViagemCompleta] = useState<Viagem>(viagem);
  const [adiantamento, setAdiantamento] = useState<Adiantamento>(
    viagemCompleta.adiantamento ?? {
      id: 0,
      tipoVerba: "",
      verba: 0,
      valorDeAcerto: 0,
      diferenca: 0, // Calculado como verba - valorDeAcerto
      descricao: "",
      viagemId: 0,
    }
  );
  const [abastecimento, setAbastecimento] = useState<Abastecimento>(
    viagemCompleta.abastecimento ?? {
      id: 0,
      valorTotal: 0,
      litros: 0,
      codigoNfe: "",
      viagemId: 0,
    }
  );
  const [addAbastecimento, setAddAbastecimento] = useState(false);
  const [addAdiantamento, setAddAdiantamento] = useState(false);
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  async function fetchViagem() {
    const response = await api.get(`viagem/${viagem.id}`);
    if (!response.data.isSucces) {
      toast("Erro ao buscar dados da viagem");
      return;
    }

    const viagemResponse = response.data.data;
    setViagemCompleta(viagemResponse);
    setAbastecimento(
      viagemResponse.abastecimento
        ? viagemResponse.abastecimento
        : {
            id: 0,
            valorTotal: 0,
            litros: 0,
            codigoNfe: "",
            viagemId: viagem.id,
          }
    );

    setAdiantamento(
      viagemResponse.adiantamento
        ? viagemResponse.adiantamento
        : {
            id: 0,
            tipoVerba: "",
            verba: 0,
            valorDeAcerto: 0,
            diferenca: 0, // Calculado como verba - valorDeAcerto
            descricao: "",
            viagemId: viagem.id,
          }
    );

    console.log("Viagem completa:", viagemCompleta);
  }
  useEffect(() => {
    fetchViagem();
  }, [viagem.abastecimento, viagem.adiantamento]);

  async function enviarAbastecimento(e: React.FormEvent) {
    e.preventDefault();
    setAddAbastecimento(true);
    if (abastecimento !== undefined && abastecimento.id == 0) {
      const response = await api.post("abastecimento", abastecimento);
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
    } else if (abastecimento !== undefined) {
      const response = await api.put(
        `abastecimento/${abastecimento?.id}`,
        abastecimento
      );
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
      setAddAbastecimento(false);
    }
  }

  function calcularValorTotal(valorTotal: number, litros: number) {
    const valor = valorTotal / litros;

    return valor.toFixed(2);
  }

  async function enviarAdiantamento(e: React.FormEvent) {
    e.preventDefault();
    setAddAdiantamento(true);
    if (adiantamento !== undefined && adiantamento.id == 0) {
      const response = await api.post("adiantamento", adiantamento);
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um adiantamento a viagem");
        return;
      }

      toast("Adiantamento da viagem atualizado com sucesso");
    } else if (adiantamento !== undefined) {
      const response = await api.put(
        `adiantamento/${adiantamento?.id}`,
        adiantamento
      );
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
      setAddAdiantamento(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:scale-110 hover:cursor-pointer">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-10 md:w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações Da Viagem</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Viagem Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Origem</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.rota.saida.cidadeSaida}
                  </p>
                </div>
                <div>
                  <Label>Destino</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.rota.retorno.cidadeSaida}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data Partida</Label>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      toZonedTime(
                        parseISO(viagem.dataHorarioSaida.data),
                        "UTC"
                      ),
                      "dd/MM/yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <Label>Data Retorno</Label>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      toZonedTime(
                        parseISO(viagem.dataHorarioRetorno.data),
                        "UTC"
                      ),
                      "dd/MM/yyyy"
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Motoristas</Label>
                  {viagem.motoristaViagens?.map((motorista) => (
                    <p
                      key={motorista.motoristaId}
                      className="text-sm text-muted-foreground"
                    >
                      {motorista.motorista?.nome}
                    </p>
                  ))}
                </div>
                <div>
                  <Label>Vehicle</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.veiculo?.prefixo} - {viagem.veiculo?.placa}
                  </p>
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground">{viagem.status}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Valor Líquido:{" "}
                <strong className="text-green-600">
                  {formatCurrency(
                    viagemCompleta ? viagemCompleta.valorLiquidoViagem : 0
                  )}
                </strong>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Card className="flex justify-center flex-col p-2 gap-2 items-center w-full md:w-[200px]">
                <CardTitle>Abastecimento</CardTitle>
                <div className="flex gap-2">
                  <Fuel className="text-yellow-500" />
                  <span>
                    {abastecimento
                      ? formatCurrency(abastecimento?.valorTotal)
                      : "0,00 R$"}
                  </span>
                </div>
              </Card>

              <Card className="flex justify-center flex-col p-2 gap-2 items-center w-full md:w-[200px]">
                <CardTitle>Adiantamentos</CardTitle>
                <div className="flex gap-2">
                  <DollarSign className="text-blue-600" />
                  <span>
                    {adiantamento
                      ? formatCurrency(adiantamento?.diferenca)
                      : "0,00 R$"}
                  </span>
                </div>
              </Card>

              <Card className="flex flex-col justify-center p-2 gap-2 items-center w-full md:w-[200px]">
                <CardTitle>Despesas</CardTitle>
                <div className="flex gap-2">
                  <HandCoins className="text-red-600" />
                  <span>{formatCurrency(viagemCompleta?.totalDespesa)}</span>
                </div>
              </Card>

              <Card className="flex flex-col p-2 gap-2 items-center md:w-[200px] w-full">
                <CardTitle>Valor Contrato</CardTitle>
                <div className="flex gap-2">
                  <ReceiptText className="text-green-500" />
                  <span>
                    {abastecimento
                      ? formatCurrency(viagemCompleta.valorContratado)
                      : "0,00 R$"}
                  </span>
                </div>
              </Card>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Origem do Pagamento</TableHead>
                    <TableHead>Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viagemCompleta.despesas != undefined ? (
                    viagemCompleta.despesas.map((despesa) => (
                      <TableRow key={despesa.id}>
                        <TableCell>
                          {formatCurrency(despesa.valorTotal)}
                        </TableCell>
                        <TableCell>{despesa.origemPagamento}</TableCell>
                        <TableCell>
                          {despesa.pago ? (
                            <Badge variant="secondary" className="text-white">
                              Pago
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Pendente</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>Sem despesas</TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Origem do Pagamento</TableHead>
                    <TableHead>Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viagemCompleta.receitas ? (
                    <TableRow>
                      <TableCell>
                        {formatCurrency(viagemCompleta.receitas.valorTotal)}
                      </TableCell>
                      <TableCell>
                        {viagemCompleta.receitas.origemPagamento}
                      </TableCell>
                      <TableCell>
                        {viagemCompleta.receitas.pago ? (
                          <Badge variant="secondary" className="text-white">
                            Pago
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Pendente</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>Sem receitas</TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Abastecimento da viagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={enviarAbastecimento}
                className="flex flex-col w-full"
              >
                <div className="w-full flex gap-2 items-start justify-evenly">
                  <div className="grid gap-2">
                    <Label htmlFor="valorTotal">Total Value (R$)</Label>
                    <Input
                      id="valorTotal"
                      name="valorTotal"
                      defaultValue={abastecimento?.valorTotal}
                      onChange={(e) =>
                        setAbastecimento({
                          ...abastecimento!,
                          valorTotal: Number(e.target.value),
                        })
                      }
                      type="number"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="litros">Litros</Label>
                    <Input
                      id="litros"
                      name="litros"
                      type="number"
                      step="0.01"
                      defaultValue={abastecimento?.litros}
                      required
                      onChange={(e) =>
                        setAbastecimento({
                          ...abastecimento!,
                          litros: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="codigoNfe">NFe de pagamento</Label>
                    <Input
                      id="codigoNfe"
                      name="codigoNfe"
                      defaultValue={abastecimento?.codigoNfe}
                      required
                      onChange={(e) =>
                        setAbastecimento({
                          ...abastecimento!,
                          codigoNfe: e.target.value,
                        })
                      }
                    />
                    <p className="text-gray-500 text-xs">
                      Informe quando efetuar o pagamento
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span>Km Inicial: {viagem.kmInicialVeiculo} | </span>
                  <span>Km Final: {viagem.kmFinalVeiculo} | </span>
                  {viagem.kmFinalVeiculo > 0 ? (
                    <span>
                      Total: {viagem.kmFinalVeiculo - viagem.kmInicialVeiculo}{" "}
                    </span>
                  ) : (
                    <span>Total: 0</span>
                  )}
                </div>
                <div className="space-x-2 mb-2">
                  {viagem.kmFinalVeiculo > 0 ? (
                    <span>
                      Km/L:{" "}
                      {(viagem.kmFinalVeiculo - viagem.kmInicialVeiculo) /
                        abastecimento!.litros}
                    </span>
                  ) : (
                    <span>Km/L: 0 |</span>
                  )}

                  {abastecimento!.valorTotal > 0 ? (
                    <span>
                      Valor Litro: R${" "}
                      {calcularValorTotal(
                        abastecimento!.valorTotal,
                        abastecimento!.litros
                      )}
                    </span>
                  ) : (
                    <span>Valor Litro: 0</span>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  {addAbastecimento ? (
                    <Image
                      src={loading}
                      alt="loading"
                      className="text-center animate-spin"
                    />
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Adiantamento de viagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={enviarAdiantamento}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end"
              >
                <div className="grid gap-2">
                  <Label htmlFor="tipoVerba">Origem</Label>
                  <input
                    type="text"
                    id="tipoVerba"
                    value="Motorista"
                    readOnly
                    className="border border-gray-300 w-[120px] px-2 py-1 rounded"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="verba">Valor</Label>
                  <Input
                    id="verba"
                    name="verba"
                    value={adiantamento!.verba}
                    onChange={(e) =>
                      setAdiantamento({
                        ...adiantamento!,
                        verba: Number(e.target.value),
                      })
                    }
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorDeAcerto">Valor de Acerto</Label>
                  <Input
                    id="valorDeAcerto"
                    name="valorDeAcerto"
                    value={adiantamento!.valorDeAcerto}
                    onChange={(e) =>
                      setAdiantamento({
                        ...adiantamento!,
                        valorDeAcerto: Number(e.target.value),
                      })
                    }
                    required
                    type="number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diferenca">Diferença</Label>
                  <Input
                    id="diferenca"
                    name="diferenca"
                    value={adiantamento!.verba - adiantamento!.valorDeAcerto}
                    required
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    defaultValue={adiantamento!.descricao}
                    onChange={(e) =>
                      setAdiantamento({
                        ...adiantamento!,
                        descricao: e.target.value,
                      })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  {addAdiantamento ? (
                    <Image
                      src={loading}
                      alt="loading"
                      className="text-center animate-spin"
                    />
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
