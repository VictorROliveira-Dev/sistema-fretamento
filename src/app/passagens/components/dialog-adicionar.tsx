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
import BusSelectorVolta from "@/components/bus-selector-volta";
import axios from "axios";

interface AdicionarProps {
  viagem: ViagemProgramda;
  setViagem: React.Dispatch<React.SetStateAction<ViagemProgramda | null>>;
}

export default function DialogAdicionar({ viagem, setViagem }: AdicionarProps) {
  const [passagem, setPassagem] = useState<Passagem>({
    viagemId: 0,
    emailPassageiro: "",
    telefonePassageiro: "",
    cpfPassageiro: "",
    nomePassageiro: "",
    dataEmissao: "",
    formaPagamento: "",
    poltronaIda: undefined,
    poltronaVolta: undefined,
    paradaPassageiro: "",
    valorPersonalizado: 0,
    situacao: "",
    cidadePassageiro: "",
    tipo: "",
    valorTotal: 0,
  });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setPassagem((prevPassagem) => ({
      ...prevPassagem,
      viagemId: viagem ? viagem.id : 0, // Certifique-se de que viagem.id é correto
    }));
  }, [viagem]);

  async function registrarPassagem() {
    console.log(passagem);
    try {
      setCarregando(true);
      if (!passagem.poltronaIda && !passagem.poltronaVolta) {
        toast("Selecione um acento");
        return;
      }
      if (
        (passagem.tipo === "IDA" && passagem.poltronaVolta) ||
        (passagem.tipo === "IDA" && passagem.poltronaIda == undefined)
      ) {
        toast(
          "selecione somente a passagem de ida ou altere o tipo da passagem para ida e volta"
        );
        return;
      } else if (
        (passagem.tipo === "VOLTA" && passagem.poltronaIda) ||
        (passagem.tipo === "VOLTA" && passagem.poltronaVolta === undefined)
      ) {
        toast(
          "selecione somente a passagem de volta ou altere o tipo da passagem para ida e volta"
        );
        return;
      } else if (
        passagem.tipo === "IDA-VOLTA" &&
        passagem.poltronaIda === undefined
      ) {
        toast(
          "selecione as poltronas de ida e volta corretamente, ou altere o tipo da viagem"
        );
        return;
      }
      const response = await api.post("/passagem", passagem);

      if (!response.data.isSucces) {
        toast(response.data.message + "entre em contato com o sistema");
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
      setPassagem({
        viagemId: 0,
        emailPassageiro: "",
        telefonePassageiro: "",
        cpfPassageiro: "",
        nomePassageiro: "",
        dataEmissao: "",
        formaPagamento: "",
        poltronaIda: undefined,
        poltronaVolta: undefined,
        paradaPassageiro: "",
        valorPersonalizado: 0,
        situacao: "",
        cidadePassageiro: "",
        tipo: "",
        valorTotal: 0,
      });
      setCarregando(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          toast("erro ao tentar registrar passagem");
        }
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[200px] text-center px-4 py-2 rounded-md text-white transition-all cursor-pointer">
          Adicionar Passagem
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-[600px] md:h-[700px] flex flex-col items-center overflow-scroll md:overflow-auto">
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
                required
              />
            </div>
            <div>
              <label htmlFor="passageiro">Email:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, emailPassageiro: e.target.value })
                }
                value={passagem.emailPassageiro}
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
              <label htmlFor="passageiro">Cidade:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, cidadePassageiro: e.target.value })
                }
                value={passagem.cidadePassageiro}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="passageiro">Parada Passageiro:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, paradaPassageiro: e.target.value })
                }
                value={passagem.paradaPassageiro}
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
              <label htmlFor="pagamento">Tipo Da Passagem:</label>
              <Select
                onValueChange={(e) => setPassagem({ ...passagem, tipo: e })}
                name="pagamento"
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione o tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo Passagem</SelectLabel>
                    <SelectItem value="IDA">Ida</SelectItem>
                    <SelectItem value="IDA-VOLTA">Ida e Volta</SelectItem>
                    <SelectItem value="VOLTA">Somente volta</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="passageiro">Valor Personalizado:</label>
              <Input
                onChange={(e) =>
                  setPassagem({
                    ...passagem,
                    valorPersonalizado: Number(e.target.value),
                  })
                }
                value={
                  passagem.valorPersonalizado ? passagem.valorPersonalizado : ""
                }
                type="number"
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
          <div className="flex flex-col">
            <span className="text-lg font-bold text-center">Ida</span>
            <BusSelector
              totalSeats={viagem?.veiculo?.quantidadePoltronas || 0}
              ocupados={viagem?.passagens?.map((passagem) => passagem) || []}
              setPassagem={setPassagem}
              passagem={passagem}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-center">Volta</span>
            <BusSelectorVolta
              totalSeats={viagem?.veiculo?.quantidadePoltronas || 0}
              ocupados={viagem?.passagens?.map((passagem) => passagem) || []}
              setPassagem={setPassagem}
              passagem={passagem}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
