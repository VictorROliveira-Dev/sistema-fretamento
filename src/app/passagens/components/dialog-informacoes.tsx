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
import { CalendarDays, MapPin, Bus, CreditCard, User2 } from "lucide-react";
import { Passagem, ViagemProgramda } from "@/lib/types";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

interface TripDialogProps {
  trip: ViagemProgramda;
  passagem: Passagem;
}

export default function DialogInformacoes({ trip, passagem }: TripDialogProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent hover:bg-white font-medium transition-all px-4 py-1.5 border-2 border-gray-300 rounded-md cursor-pointer">
          Detalhes
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
          {/* Responsáveis */}
          <div className="space-y-4 mb-3">
            <div className="flex items-center gap-2 text-primary">
              <User2 className="h-5 w-5" />
              <h3 className="font-semibold">Passageiro</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p>
                  Nome: <strong>{passagem.nomePassageiro}</strong>
                </p>
                <p>
                  email: <strong>{passagem.emailPassageiro}</strong>
                </p>
                <p>
                  telefone: <strong>{passagem.telefonePassageiro}</strong>
                </p>
                <p>
                  Cidade: <strong>{passagem.cidadePassageiro}</strong>
                </p>
                <p>
                  Cpf: <strong>{passagem.cpfPassageiro}</strong>
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold">Responsavel e Guia</p>
                <p>Responsavel: {trip.responsavel}</p>
                <p>Guia: {trip.guia}</p>
              </div>
            </div>
          </div>

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
                  <p className="font-semibold">Destino</p>
                  <p>
                    {format(
                      toZonedTime(parseISO(trip.retorno.data), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <p className="text-muted-foreground">{trip.retorno.local}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Volta</p>
                  <p>
                    {format(
                      toZonedTime(parseISO(trip.chegada.data), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <p className="text-muted-foreground">{trip.chegada.local}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-semibold">Valor e Pagamento</h3>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p>
                  <span className="font-semibold">Tipo da Passagem:</span>{" "}
                  {passagem.tipo === "IDA"
                    ? "Somente Ida"
                    : passagem.tipo === "IDA-VOLTA"
                    ? "Ida e Volta"
                    : "Somente Volta"}
                </p>
                <p>
                  <span className="font-semibold">Valor da Passagem:</span>{" "}
                  {formatCurrency(
                    passagem.valorPersonalizado &&
                      passagem.valorPersonalizado > 0
                      ? passagem.valorPersonalizado
                      : passagem.valorTotal
                  )}
                </p>

                <p>
                  <span className="font-semibold">Forma de Pagamento:</span>{" "}
                  {trip.formaPagto}
                </p>
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
                    {trip.veiculo.placa.toUpperCase()}
                  </p>
                </div>
              </div>
            )}

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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
