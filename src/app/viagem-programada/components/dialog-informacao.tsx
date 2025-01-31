import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  MapPin,
  DollarSign,
  CreditCard,
  User,
  Route,
  AlertCircle,
  Armchair,
  PiggyBank,
} from "lucide-react";
import { LocationTimeInfo } from "./LocationTimeInfo";
import { ViagemProgramda } from "@/lib/types";

interface TripDetailsDialogProps {
  viagem: ViagemProgramda;
}

export function DialogInfo({ viagem }: TripDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-slate-100 border-2 w-full mb-1 border-gray-300 shadow-none text-black">
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {viagem.titulo}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">{viagem.descricao}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LocationTimeInfo
              title="Saída"
              info={viagem.saida}
              icon={<MapPin className="h-5 w-5 text-primary" />}
            />
            <LocationTimeInfo
              title="Retorno"
              info={viagem.retorno}
              icon={<CalendarDays className="h-5 w-5 text-primary" />}
            />
            <LocationTimeInfo
              title="Chegada"
              info={viagem.chegada}
              icon={<Clock className="h-5 w-5 text-primary" />}
            />
          </div>

          <Separator />

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Valor da Passagem Ida</p>
                    <p className="text-muted-foreground">
                      R$ {viagem.valorPassagem.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Valor da Passagem Ida e Volta</p>
                    <p className="text-muted-foreground">
                      R$ {viagem.valorPassagemIdaVolta.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Forma de Pagamento</p>
                    <p className="text-muted-foreground">{viagem.formaPagto}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Responsável</p>
                    <p className="text-muted-foreground">
                      {viagem.responsavel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Armchair className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Poltronas Oculpadas</p>
                    <p className="text-muted-foreground">
                      {viagem.passagens.length}/{" "}
                      {viagem.veiculo
                        ? viagem.veiculo.quantidadePoltronas
                        : "..."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Total Arrecadado</p>
                    <p className="text-muted-foreground">
                      {viagem.passagens
                        ? `R$ ${viagem.passagens
                            .reduce(
                              (total, passagem) => total + passagem.valorTotal,
                              0
                            )
                            .toFixed(2)}`
                        : "R$ 0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Route className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Itinerário</p>
                    <p className="text-muted-foreground">{viagem.itinerario}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Observações</p>
                    <p className="text-muted-foreground">
                      {viagem.observacoes}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Adicionar Passagem</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
