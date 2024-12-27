import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { Motorista } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Car,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  User,
} from "lucide-react";

interface MotoristasProps {
  motoristaId: string;
}

export default function DialogInformacoes({ motoristaId }: MotoristasProps) {
  const [motorista, setMotoristas] = useState<Motorista>();

  const fetchMotoristas = async () => {
    try {
      const response = await api.get(`/motorista/${motoristaId}`);
      setMotoristas(response.data.data);
    } catch (error) {
      console.log("erro", error)
    }
  };

  useEffect(() => {
    if (!motoristaId) return;

    fetchMotoristas();
  }, [motoristaId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
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
            {motorista?.nome ?? "Carregando.."}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Informações Pessoais */}
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Pessoais
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Data de Nascimento:{" "}
                    {motorista
                      ? new Date(motorista.dataNascimento).toLocaleDateString()
                      : "Carregando.."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Telefone: {motorista?.telefone ?? "Carregando.."}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>CPF: {motorista?.cpf ?? "Carregando..."}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Documento */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Documento</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {motorista?.documento.tipo.toUpperCase()}:{" "}
                    {motorista?.documento.documento}
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Endereço */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Endereço</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p>
                      {motorista?.endereco.rua}, {motorista?.endereco.numero}
                    </p>
                    <p>{motorista?.endereco.bairro}</p>
                    <p>
                      {motorista?.endereco.cidade} - {motorista?.endereco.uf}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Habilitação */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Habilitação</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <Car className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p>Protocolo: {motorista?.habilitacao.protocolo}</p>
                    <p>Categoria: {motorista?.habilitacao.categoria.toUpperCase()}</p>
                    <p>
                      Vencimento:{" "}
                      {motorista
                        ? new Date(
                            motorista.habilitacao.vencimento
                          ).toLocaleDateString()
                        : "Carregando.."}
                    </p>
                    <p>
                      Local: {motorista?.habilitacao.cidade} -{" "}
                      {motorista?.habilitacao.uf.toUpperCase()}
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