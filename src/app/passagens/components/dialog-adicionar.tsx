/*import BusSelector from "@/components/bus-selector";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/axios";
import { Passageiro, Passagem, ViagemProgramda } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface AdicionarProps {
  viagem: ViagemProgramda;
  setViagem: React.Dispatch<React.SetStateAction<ViagemProgramda | null>>;
}

export default function DialogAdicionar({ viagem, setViagem }: AdicionarProps) {
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);
  const [passagem, setPassagem] = useState<Passagem>({
    viagemId: 0,
    passageiroId: 0,
    dataEmissao: "",
    formaPagamento: "",
    poltrona: 0,
    situacao: "",
  });

  async function fetchPassageiros() {
    const response = await api.get("/passageiro");

    if (!response.data.isSucces) {
      toast("erro ao tentar buscar passageiros, recarregue a página");
      return;
    }

    setPassageiros(response.data.data);
  }

  useEffect(() => {
    setPassagem((prevPassagem) => ({
      ...prevPassagem,
      viagemId: viagem ? viagem.id : 0, // Certifique-se de que viagem.id é correto
    }));
    fetchPassageiros();
  }, [viagem]);

  async function registrarPassagem() {
    const response = await api.post("/passagem", passagem);

    if (!response.data.isSucces) {
      toast("erro ao tentar registrar passagem");
      return;
    }

    const passagensAtualizadas = [
      ...(viagem?.passagens || []),
      response.data.data,
    ];
    console.log(response.data.data);
    setViagem({
      ...viagem,
      passagens: passagensAtualizadas,
    });
    toast("registrada com sucesso");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Passagem
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Passagem</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="passageiro">Passageiro:</label>
              <Select
                onValueChange={(e) =>
                  setPassagem({ ...passagem, passageiroId: Number(e) })
                }
                name="passageiro"
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione o passageiro..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {passageiros.map((passageiro) => (
                      <SelectItem value={passageiro.id.toString()}>
                        {passageiro.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="viagem">Viagem:</label>
              <Input
                onChange={() =>
                  setPassagem({ ...passagem, viagemId: viagem.id })
                }
                value={viagem?.titulo || ""}
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
                />
              </div>
            </div>
            <Button onClick={() => registrarPassagem()}>Registrar</Button>
          </div>
          <BusSelector
            totalSeats={viagem?.veiculo?.quantidadePoltronas || 0}
            ocupados={viagem?.passagens?.map((passagem) => passagem) || []}
            setPassagem={setPassagem}
            passagem={passagem}
          />
        </div>

        <DialogFooter className="flex items-center gap-2 mt-10">
          <Button variant="outline">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}*/