import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { Cliente } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Tag,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
interface InfoProps {
  cliente: Cliente;
}
export default function DialogInformacoes({ cliente }: InfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-10 md:w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            {cliente.nome}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Principais
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Tipo: {cliente.tipo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Data de Nascimento:{" "}
                    {format(
                      toZonedTime(parseISO(cliente.dataNascimento), "UTC"),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Telefone: {cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>CPF: {cliente.cpf}</span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Documento</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {cliente.documento.tipo.toUpperCase()}:{" "}
                    {cliente.documento.documento}
                  </span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Endereço</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p>
                      {cliente.endereco.rua}, {cliente.endereco.numero}
                    </p>
                    <p>{cliente.endereco.bairro}</p>
                    <p>
                      {cliente.endereco.cidade} - {cliente.endereco.uf}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
