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
import { IReceitas } from "@/lib/types";
import Image from "next/image";
import DocumentIcon from "@/app/assets/dadosviagem.svg";
interface DespesasDialogProps {
  receita: IReceitas;
}

export function DialogInformacoesReceitas({ receita }: DespesasDialogProps) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
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
                        receita.valorParcial,
                        receita.valorTotal
                      )
                        ? "default"
                        : "destructive"
                    }
                  >
                    {getStatusPagamento(
                      receita.pago,
                      receita.valorParcial,
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
                    Valor Parcial: {formatCurrency(receita.valorParcial)}
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
                  <span>Emissão: {formatDate(receita.dataPagamento)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Compra: {formatDate(receita.dataCompra)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Vencimento: {formatDate(receita.vencimento)}</span>
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
              <h3 className="text-lg font-semibold mb-3">
                Responsável e Viagem
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Responsável:{" "}
                    {receita.responsavel ? receita.responsavel.nome : "n/a"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>Viagem ID: {receita.viagemId}</span>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
