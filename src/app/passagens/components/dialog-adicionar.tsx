import BusSelector from "@/components/bus-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Passagem, ViagemProgramda } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import loading from "../../assets/loading.svg";
import Image from "next/image";

interface AdicionarProps {
  viagem: ViagemProgramda;
  setViagem: React.Dispatch<React.SetStateAction<ViagemProgramda | null>>;
}

export default function DialogAdicionar({ viagem, setViagem }: AdicionarProps) {
  const [passagem, setPassagem] = useState<Passagem>({
    viagemId: 0,
    passageiroEmail: "",
    telefonePassageiro: "",
    cpfPassageiro: "",
    nomePassageiro: "",
    dataEmissao: "",
    formaPagamento: "",
    poltrona: 0,
    situacao: "",
  });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setPassagem((prevPassagem) => ({
      ...prevPassagem,
      viagemId: viagem ? viagem.id : 0, // Certifique-se de que viagem.id é correto
    }));
  }, [viagem]);

  async function registrarPassagem() {
    setCarregando(true);
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
    setCarregando(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[255px] text-center px-4 py-1 rounded-md text-white transition-all cursor-pointer">
          Adicionar Passagem
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Passagem</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="passageiro">Passageiro:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, nomePassageiro: e.target.value })
                }
                value={passagem.nomePassageiro}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="passageiro">Email:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, passageiroEmail: e.target.value })
                }
                value={passagem.passageiroEmail}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="passageiro">Telefone:</label>
              <Input
                onChange={(e) =>
                  setPassagem({
                    ...passagem,
                    telefonePassageiro: e.target.value,
                  })
                }
                value={passagem.telefonePassageiro}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="passageiro">CPF:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, cpfPassageiro: e.target.value })
                }
                value={passagem.cpfPassageiro}
                type="text"
              />
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
            <Button onClick={() => registrarPassagem()}>
              {carregando ? (
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Registrar"
              )}
            </Button>
          </div>
          <BusSelector
            totalSeats={viagem?.veiculo?.quantidadePoltronas || 0}
            ocupados={viagem?.passagens?.map((passagem) => passagem) || []}
            setPassagem={setPassagem}
            passagem={passagem}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
