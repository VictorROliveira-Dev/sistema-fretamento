import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Receipt,
  Calendar,
  CreditCard,
  Building2,
  DollarSign,
} from "lucide-react";
import { Despesa, PagamentoDespesa } from "@/lib/types";
import Image from "next/image";
import DocumentIcon from "@/app/assets/dadosviagem.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useState } from "react";
import DialogRemoverPagamento from "./dialog-remover-pagamento";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/lib/axios";

interface DespesasDialogProps {
  despesa: Despesa;
}

export function DialogInfo({ despesa }: DespesasDialogProps) {
  const [despesaInfo, setDespesaInfo] = useState<Despesa>(despesa);
  const [pagamentoDespesa, setPagamentoDespesa] = useState<PagamentoDespesa>({
    despesaId: Number(despesa.id),
    valorPago: 0,
    id: 0,
    dataPagamento: "",
    despesa,
  });
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  async function gerarPagamento(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (pagamentoDespesa.valorPago <= 0) {
        toast("digite um valor valido para o pagamento");
      }

      const response = await api.post(
        "/despesa/pagamentoDespesa",
        pagamentoDespesa
      );

      if (!response.data.isSucces) {
        toast("erro ao tentar gerar pagamento");
      }

      setDespesaInfo({
        ...despesaInfo,
        pagamentos: [...despesaInfo.pagamentos, response.data.data],
      });
      toast("pagamento adicionado com sucesso");
    } catch (error) {
      toast("erro ao tentar gerar pagamento");
    }
  }

  async function pagarBoleto(boletoId: number) {
    try {
      const response = await api.post(`despesa/pagamentoboleto/${boletoId}`);
      if (!response.data.isSucces) {
        toast("erro ao tenta pagar boleto");
        return;
      }

      const boletosAtualizados = despesaInfo.boletos.filter(
        (b) => b.id !== boletoId
      );

      setDespesaInfo({
        ...despesaInfo,
        boletos: [...boletosAtualizados, response.data.data],
      });
      toast("boleto pago com sucesso");
    } catch (error) {
      toast("erro ao tentar pagar boleto");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={DocumentIcon}
            alt="documento"
            width={25}
            className="w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Receipt className="h-5 w-5" />
            Despesa # {despesaInfo.id}
          </DialogTitle>
          <span>{despesaInfo.descricao}</span>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Status e Valores</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>

                  <Badge variant={despesaInfo.pago ? "default" : "destructive"}>
                    {despesaInfo.pago ? "Pago" : "Pendente"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Valor Total: {formatCurrency(despesaInfo.valorTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  {despesaInfo.formaPagamento === "Boleto" ? (
                    <div className="space-x-2">
                      <span>Parcelas Pagas: {despesaInfo.parcelasPagas}</span>
                      <span>Total de Parcelas: {despesaInfo.parcelas}</span>
                    </div>
                  ) : (
                    <span>
                      Valor Parcial: {formatCurrency(despesaInfo.valorParcial)}
                    </span>
                  )}
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Datas</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Compra:{" "}
                    {format(
                      toZonedTime(parseISO(despesaInfo.dataCompra), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Vencimento:{" "}
                    {format(
                      toZonedTime(
                        parseISO(
                          despesaInfo.vencimento ? despesaInfo.vencimento : ""
                        ),
                        "UTC"
                      ),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações de Pagamento
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Forma de Pagamento: {despesaInfo.formaPagamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Origem: {despesaInfo.centroCusto}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Centro de Custo: {despesaInfo.centroCusto}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Descricao: {despesaInfo.descricao}</span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Pagamentos</h3>
              {despesaInfo.formaPagamento === "Boleto" ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Valor</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Pago</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {despesaInfo.boletos.map((boleto) => (
                        <TableRow>
                          <TableCell>{formatCurrency(boleto.valor)}</TableCell>
                          <TableCell>
                            {format(
                              toZonedTime(parseISO(boleto.vencimento), "UTC"),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            {boleto.pago ? (
                              <Badge className="bg-green-600">Pago</Badge>
                            ) : (
                              <Badge className="bg-red-600">Pendente</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {!boleto.pago && (
                              <Button
                                onClick={() => pagarBoleto(boleto.id)}
                                className="bg-blue-600"
                              >
                                Pagar
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <div className="w-full flex flex-col">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor Pago</TableHead>
                          <Table>doc</Table>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {despesaInfo.pagamentos.length > 0 ? (
                          despesaInfo.pagamentos.map((pagamento) => (
                            <TableRow key={pagamento.id}>
                              <TableCell>
                                {format(
                                  toZonedTime(
                                    parseISO(pagamento.dataPagamento),
                                    "UTC"
                                  ),
                                  "dd/MM/yyyy"
                                )}
                              </TableCell>
                              <TableCell>{pagamento.valorPago}</TableCell>
                              <TableCell className="flex gap-2">
                                <DialogRemoverPagamento
                                  despesa={despesaInfo}
                                  setDespesa={setDespesaInfo}
                                  pagamentoId={pagamento.id}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <span>Sem registro de pagamentos</span>
                        )}
                      </TableBody>
                    </Table>
                  </Card>

                  <h3 className="text-lg font-semibold mb-3">
                    Adicionar Pagamento
                  </h3>
                  <form
                    onSubmit={(e) => gerarPagamento(e)}
                    className="p-2 flex gap-2 items-end w-full"
                  >
                    <div className="flex-1">
                      <Label>Valor Pago</Label>
                      <Input
                        type="number"
                        value={pagamentoDespesa?.valorPago}
                        onChange={(e) =>
                          setPagamentoDespesa({
                            ...pagamentoDespesa,
                            valorPago: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <Button type="submit" className="bg-green-600">
                      Gerar pagamento
                    </Button>
                  </form>
                </div>
              )}
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
