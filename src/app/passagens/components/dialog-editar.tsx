"use client";
import BusSelector from "@/components/bus-selector";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formFieldsPassagens } from "@/lib/objects";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Passageiro, Passagem, ViagemProgramda } from "@/lib/types";

interface AtualizarProps {
  viagem: ViagemProgramda;
  setViagem: React.Dispatch<React.SetStateAction<ViagemProgramda | null>>;
  passagens?: Passagem[];
  passagemSelecionada: Passagem;
}
export default function DialogEditar({
  viagem,
  setViagem,
  passagens,
  passagemSelecionada,
}: AtualizarProps) {
  const [passagem, setPassagem] = useState<Passagem>(passagemSelecionada);

  useEffect(() => {
    console.log(passagem);
    setPassagem((prevPassagem) => ({
      ...prevPassagem,
      viagemId: viagem.id, // Certifique-se de que viagem.id é correto
    }));
  }, [viagem]);

  async function registrarPassagem() {
    console.log(passagem);
    const response = await api.put(`/passagem/${passagem.id}`, passagem);

    if (!response.data.isSucces) {
      toast("erro ao tentar registrar passagem");
      return;
    }

    const passagensAtualizadas = passagens?.filter((p) => p.id != passagem.id);
    console.log(response.data.data);
    setViagem({
      ...viagem,
      passagens: [...passagensAtualizadas!, passagem],
    });
    toast("registrada com sucesso");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className="cursor-pointer"
          src={editIcon}
          alt="Editar"
          width={25}
        />
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Passagem</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>
              <label htmlFor="passageiro">Passageiro:</label>
              <Input
                name="passageiro"
                value={passagem.passageiro ? passagem.passageiro.nome : ""}
                disabled
              />
            </div>
            <div>
              <label htmlFor="viagem">Viagem:</label>
              <Input
                onChange={() =>
                  setPassagem({ ...passagem, viagemId: viagem.id })
                }
                value={viagem?.titulo}
                disabled={true}
              />
            </div>
            <div>
              <label htmlFor="pagamento">Tipo Pagamento:</label>
              <Select
                onValueChange={(e) =>
                  setPassagem({ ...passagem, formaPagamento: e })
                }
                name="pagamento"
                value={passagem.formaPagamento}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione o tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pagamentos</SelectLabel>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="CREDITO">Cartão Crédito</SelectItem>
                    <SelectItem value="DEBITO">Cartão Débito</SelectItem>
                    <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="situacao">Situação:</label>
              <Select
                onValueChange={(e) => setPassagem({ ...passagem, situacao: e })}
                name="situacao"
                value={passagem.situacao}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione a situação..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Situações</SelectLabel>
                    <SelectItem value="PAGO">Pago</SelectItem>
                    <SelectItem value="RESERVADO">Reservado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <Label htmlFor="date">Data de Emissão</Label>
                <Input
                  name="date"
                  type="date"
                  onChange={(e) =>
                    setPassagem({ ...passagem, dataEmissao: e.target.value })
                  }
                  value={passagem.dataEmissao}
                />
              </div>
            </div>
            <Button onClick={() => registrarPassagem()}>Registrar</Button>
          </div>
        </div>

        <DialogFooter className="flex items-center gap-2 mt-10">
          <Button variant="outline">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
