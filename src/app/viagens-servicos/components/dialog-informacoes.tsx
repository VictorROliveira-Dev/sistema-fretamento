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

import {
  DollarSign,
  Fuel,
  HandCoins,
  PlusCircle,
  ReceiptText,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";

interface TravelDialogProps {
  viagem: Viagem;
}

export function TravelDialog({ viagem }: TravelDialogProps) {
  const [viagemCompleta, setViagemCompleta] = useState<Viagem>(viagem);
  const [adiantamento, setAdiantamento] = useState<Adiantamento | undefined>(
    viagem.adiantamento
  );
  const [abastecimento, setAbastecimento] = useState<Abastecimento | undefined>(
    viagem.abastecimento
  );
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
    setAbastecimento(viagemResponse.abastecimento);
    setAdiantamento(viagemResponse.adiantamento);
  }
  useEffect(() => {
    fetchViagem();
  }, []);

  async function adicionarAdiantamento() {
    if (adiantamento != undefined) return;

    setAdiantamento({
      id: 0,
      tipoVerba: "",
      verba: 0,
      valorDeAcerto: 0,
      diferenca: 0, // Calculado como verba - valorDeAcerto
      descricao: "",
      viagemId: viagem.id,
    });
  }

  async function adicionarAbastecimento() {
    if (abastecimento != undefined) return;

    setAbastecimento({
      id: 0,
      valorTotal: 0,
      litros: 0,
      codigoNfe: "",
      viagemId: viagem.id,
    });
  }

  async function enviarAbastecimento(e: React.FormEvent) {
    e.preventDefault();
    if (abastecimento !== undefined && abastecimento.id == 0) {
      const response = await api.post("abastecimento", abastecimento);
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
    } else {
      const response = await api.put(
        `/abastecimento/${abastecimento?.id}`,
        abastecimento
      );
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
    }
  }

  async function enviarAdiantamento(e: React.FormEvent) {
    e.preventDefault();
    if (abastecimento !== undefined && abastecimento.id == 0) {
      const response = await api.post("adiantamento", adiantamento);
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um adiantamento a viagem");
        return;
      }

      toast("Adiantamento da viagem atualizado com sucesso");
    } else {
      const response = await api.put(
        `/adiantamento/${adiantamento?.id}`,
        adiantamento
      );
      if (!response.data.isSucces) {
        toast("não foi possivel adicionar um abastecimento a viagem");
        return;
      }

      toast("abastecimento da viagem atualizado com sucesso");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-8"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações da Viagem</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Travel Details Section */}
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
                    {new Date(viagem.dataHorarioSaida.data).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div>
                  <Label>Data Retorno</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      viagem.dataHorarioRetorno.data
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Driver</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.motorista?.nome}
                  </p>
                </div>
                <div>
                  <Label>Vehicle</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.veiculo?.prefixo} - {viagem.veiculo?.placa}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Badge className="w-[100px] bg-blue-500 hover:bg-blue-500 select-none">
                  {viagem.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Valor Líquido:{" "}
                <strong className="text-green-600">
                  {formatCurrency(viagemCompleta.valorLiquidoViagem)}
                </strong>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Card className="flex justify-center flex-col p-2 gap-2 items-center w-min">
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

              <Card className="flex justify-center flex-col p-2 gap-2 items-center w-min">
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

              <Card className="flex flex-col justify-center p-2 gap-2 items-center w-min">
                <CardTitle>Despesas</CardTitle>
                <div className="flex gap-2">
                  <HandCoins className="text-red-600" />
                  <span>{formatCurrency(viagemCompleta?.totalDespesa)}</span>
                </div>
              </Card>

              <Card className="flex flex-col p-2 gap-2 items-center w-min">
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
                  {viagemCompleta.despesas?.map((despesa) => (
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
                  ))}
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
                    <TableRow key={viagemCompleta.receitas.id}>
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
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Nenhuma receita encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Fueling Section */}
          <Card>
            <CardHeader>
              <CardTitle>Abastecimento da viagem</CardTitle>
            </CardHeader>
            <CardContent>
              {abastecimento == undefined ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => adicionarAbastecimento()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Registro
                </Button>
              ) : (
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
                        value={abastecimento.valorTotal}
                        onChange={(e) =>
                          setAbastecimento({
                            ...abastecimento,
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
                        defaultValue={abastecimento.litros}
                        required
                        onChange={(e) =>
                          setAbastecimento({
                            ...abastecimento,
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
                        defaultValue={abastecimento.codigoNfe}
                        required
                        onChange={(e) =>
                          setAbastecimento({
                            ...abastecimento,
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
                    <span>Km Inicial:{viagem.kmInicialVeiculo}</span>
                    <span>Km Final:{viagem.kmFinalVeiculo}</span>
                    <span>
                      Total:{viagem.kmFinalVeiculo - viagem.kmInicialVeiculo}{" "}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <span>
                      Km/L:{" "}
                      {(viagem.kmFinalVeiculo - viagem.kmInicialVeiculo) /
                        abastecimento.litros}
                    </span>
                    <span>
                      Valor Litro:{" "}
                      {abastecimento.valorTotal / abastecimento.litros}
                    </span>
                  </div>
                  <Button type="submit" className="w-full">
                    Atualizar
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Advance Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Adiantamento de viagem</CardTitle>
            </CardHeader>
            <CardContent>
              {adiantamento == undefined ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => adicionarAdiantamento()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Adiantamento
                </Button>
              ) : (
                <form
                  onSubmit={enviarAdiantamento}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="tipoVerba">Origem da Verba</Label>
                    <Select
                      value={adiantamento.tipoVerba}
                      onValueChange={(e) =>
                        setAdiantamento({ ...adiantamento, tipoVerba: e })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="origem da verba"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectItem value="Almoço">Almoço</SelectItem>
                          <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                          <SelectItem value="Estacionamento">
                            Estacionamento
                          </SelectItem>
                          <SelectItem value="Pedagio">Pedagio</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="verba">Valor</Label>
                    <Input
                      id="verba"
                      name="verba"
                      value={adiantamento.verba}
                      onChange={(e) =>
                        setAdiantamento({
                          ...adiantamento,
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
                      value={adiantamento.valorDeAcerto}
                      onChange={(e) =>
                        setAdiantamento({
                          ...adiantamento,
                          valorDeAcerto: Number(e.target.value),
                        })
                      }
                      required
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diferenca">Diferenca</Label>
                    <Input
                      id="diferenca"
                      name="diferenca"
                      value={adiantamento.verba - adiantamento.valorDeAcerto}
                      required
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descricao">Description</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      defaultValue={adiantamento!.descricao}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Atualizar
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
