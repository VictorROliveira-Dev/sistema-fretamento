import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import {
  CreditCard,
  FileText,
  IdCard,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Passageiro } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoProps {
  passageiro: Passageiro;
}

export default function DialogInformacoes({ passageiro }: InfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Informações do Passageiro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">{passageiro.nome}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Data de Nascimento
                </p>
                <p className="font-medium">
                  {new Date(passageiro.dataNascimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
              </div>
              <div className="space-y-1 flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{passageiro.telefone}</p>
                </div>
              </div>
              <div className="space-y-1 flex items-start gap-2">
                <CreditCard className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Cartão</p>
                  <p className="font-medium">{passageiro.cartao}</p>
                </div>
              </div>
              <div className="space-y-1 flex items-start gap-2">
                <IdCard className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Matrícula</p>
                  <p className="font-medium">{passageiro.matricula}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">CPF</p>
                <p className="font-medium">{passageiro.cpf}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {passageiro.documento.tipo}
                </p>
                <p className="font-medium">{passageiro.documento.documento}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <p className="font-medium">{passageiro.endereco.uf}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cidade</p>
                    <p className="font-medium">{passageiro.endereco.cidade}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rua</p>
                  <p className="font-medium">
                    {passageiro.endereco.rua}, {passageiro.endereco.numero}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bairro</p>
                  <p className="font-medium">{passageiro.endereco.bairro}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}