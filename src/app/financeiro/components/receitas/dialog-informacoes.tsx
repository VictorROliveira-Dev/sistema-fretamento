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
  User,
  CreditCard,
  Building2,
  DollarSign,
  Car,
  Ticket,
} from "lucide-react";
import { IReceitas, Pagamento } from "@/lib/types";
import Image from "next/image";
import DocumentIcon from "@/app/assets/dadosviagem.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import GeneratePDF from "./recibo";
import DialogRemoverPagamento from "./dialog-remover-pagamento";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

interface DespesasDialogProps {
  receita: IReceitas;
}

export function DialogInformacoesReceitas({ receita }: DespesasDialogProps) {
  const router = useRouter();
  const [receitaInfo, setReceitaInfo] = useState<IReceitas>(receita);
  const [pagamento, setPagamento] = useState<Pagamento>({
    receitaId: Number(receita.id),
    valorPago: 0,
    id: 0,
    dataPagamento: "",
  });
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  function getStatusPagamento(
    pago: boolean,
    valorParcial: number,
    valorTotal: number
  ) {
    if (valorParcial != valorTotal) {
      return (pago = false);
    }
    return (pago = true);
  }

  async function gerarPagamento(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (pagamento.valorPago <= 0) {
        toast("digite um valor valido para o pagamento");
      }

      const response = await api.post("/pagamento", pagamento);

      if (!response.data.isSucces) {
        toast("erro ao tentar gerar pagamento");
      }

      setReceitaInfo({
        ...receitaInfo,
        pagamentos: [...receitaInfo.pagamentos, pagamento],
      });
      toast("pagamento adicionado com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
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
            Receita # {receita.id}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Status e Valores</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      getStatusPagamento(
                        receita.pago,
                        receita.valorPago,
                        receita.valorTotal
                      )
                        ? "default"
                        : "destructive"
                    }
                  >
                    {getStatusPagamento(
                      receita.pago,
                      receita.valorPago,
                      receita.valorTotal
                    )
                      ? "Pago"
                      : "Pendente"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Valor Total: {formatCurrency(receita.valorTotal)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Valor Parcial: {formatCurrency(receita.valorPago)}
                  </span>
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
                    Emissão:{" "}
                    {format(
                      toZonedTime(parseISO(receita.dataPagamento), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Compra:{" "}
                    {format(
                      toZonedTime(parseISO(receita.dataCompra), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Vencimento:{" "}
                    {format(
                      toZonedTime(parseISO(receita.vencimento), "UTC"),
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
                  <span>Forma de Pagamento: {receita.formaPagamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Origem: {receita.origemPagamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Centro de Custo: {receita.centroCusto}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  <span>Codigo Documento: {receita.numeroDocumento}</span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Cliente e Viagem</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Responsável:{" "}
                    {receita.viagem ? receita.viagem.cliente?.nome : "n/a"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>Viagem ID: {receita.viagemId}</span>
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Historico de Pagamentos
              </h3>
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
                    {receitaInfo.pagamentos.length > 0 ? (
                      receitaInfo.pagamentos.map((pagamento) => (
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
                              receita={receitaInfo}
                              setReceita={setReceitaInfo}
                              pagamentoId={pagamento.id}
                            />
                            <GeneratePDF
                              receita={receitaInfo}
                              pagamento={pagamento}
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
            </section>
            <section>
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
                    value={pagamento.valorPago}
                    onChange={(e) =>
                      setPagamento({
                        ...pagamento,
                        valorPago: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label>Valor Pago</Label>
                  <Input
                    type="date"
                    value={pagamento.dataPagamento}
                    onChange={(e) =>
                      setPagamento({
                        ...pagamento,
                        dataPagamento: e.target.value,
                      })
                    }
                  />
                </div>
                <Button type="submit" className="bg-green-600">
                  Gerar pagamento
                </Button>
              </form>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
