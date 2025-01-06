import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { Fornecedor } from "@/lib/types";
import {
  Building2,
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-select";

interface FornecedorProps {
  fornecedor: Fornecedor;
}

export default function DialogInformacoes({ fornecedor }: FornecedorProps) {
  console.log(fornecedor);
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
      <DialogContent className="max-w-[90vw] md:max-w-[600px] h-auto rounded-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" />
            {fornecedor?.nome}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Principais
              </h3>
              <div className="grid gap-3">
                {fornecedor ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span>Tipo: {fornecedor.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Data de Nascimento:{" "}
                        {new Date(
                          fornecedor.dataNascimento
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Telefone: {fornecedor.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>CPF: {fornecedor.cpf}</span>
                    </div>
                  </>
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Documento</h3>
              <div className="grid gap-3">
                {fornecedor ? (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {fornecedor.documento.tipo.toUpperCase()}:{" "}
                      {fornecedor.documento.documento}
                    </span>
                  </div>
                ) : (
                  <p>carregando...</p>
                )}
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Endereço</h3>
              <div className="grid gap-3">
                {fornecedor ? (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p>
                        {fornecedor.endereco.rua}, {fornecedor.endereco.numero}
                      </p>
                      <p>{fornecedor.endereco.bairro}</p>
                      <p>
                        {fornecedor.endereco.cidade} - {fornecedor.endereco.uf}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>carregando...</p>
                )}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
