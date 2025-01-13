import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  MapPin,
  Users,
  Bus,
  CreditCard,
  User2,
  ClipboardList,
} from "lucide-react";
import { ViagemProgramda } from "@/lib/types";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

interface TripDialogProps {
  trip: ViagemProgramda;
}

export default function DialogInformacoes({ trip }: TripDialogProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent hover:bg-white font-medium transition-all px-4 py-1 border-2 border-gray-300 rounded-md cursor-pointer">
          Ver Detalhes da Viagem
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {trip.titulo}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {trip.descricao}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Horários e Locais */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-5 w-5" />
                <h3 className="font-semibold">Horários e Locais</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Saída</p>
                  <p>
                    {format(
                      toZonedTime(parseISO(trip.saida.data), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <p className="text-muted-foreground">{trip.saida.local}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Chegada</p>
                  <p>
                    {format(
                      toZonedTime(parseISO(trip.chegada.data), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <p className="text-muted-foreground">{trip.chegada.local}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Retorno</p>
                  <p>
                    {format(
                      toZonedTime(parseISO(trip.retorno.data), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <p className="text-muted-foreground">{trip.retorno.local}</p>
                </div>
              </div>
            </div>
            <Separator />
            {trip.veiculo && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Bus className="h-5 w-5" />
                  <h3 className="font-semibold">Informações do Veículo</h3>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p>
                    <span className="font-semibold">Modelo:</span>{" "}
                    {trip.veiculo.modelo}
                  </p>
                  <p>
                    <span className="font-semibold">Placa:</span>{" "}
                    {trip.veiculo.placa}
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-semibold">Valor e Pagamento</h3>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p>
                  <span className="font-semibold">Valor da Passagem:</span>{" "}
                  {formatCurrency(trip.valorPassagem)}
                </p>
                <p>
                  <span className="font-semibold">Forma de Pagamento:</span>{" "}
                  {trip.formaPagto}
                </p>
              </div>
            </div>

            {/* Responsáveis */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <User2 className="h-5 w-5" />
                <h3 className="font-semibold">Responsáveis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Responsável</p>
                  <p>{trip.responsavel}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Guia</p>
                  <p>{trip.guia}</p>
                </div>
              </div>
            </div>

            {/* Itinerário */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">Itinerário</h3>
              </div>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-line">
                {trip.itinerario}
              </div>
            </div>

            {/* Passageiros */}
            {trip.passagens && trip.passagens.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" />
                  <h3 className="font-semibold">Lista de Passageiros</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-muted">
                        <th className="p-2">Nome</th>
                        <th className="p-2">Poltrona</th>
                        <th className="p-2">Situação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trip.passagens.map((passagem) => (
                        <tr key={passagem.id} className="border-b">
                          <td className="p-2">{passagem.nomePassageiro}</td>
                          <td className="p-2">{passagem.poltrona}</td>
                          <td className="p-2">{passagem.situacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Observações */}
            {trip.observacoes && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <ClipboardList className="h-5 w-5" />
                  <h3 className="font-semibold">Observações</h3>
                </div>
                <div className="p-4 bg-muted rounded-lg whitespace-pre-line">
                  {trip.observacoes}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
