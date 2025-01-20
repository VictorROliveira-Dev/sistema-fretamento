"use client";
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
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Passagem, ViagemProgramda } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import loadingIcon from "@/app/assets/loading.svg";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(passagem);
    setPassagem((prevPassagem) => ({
      ...prevPassagem,
      viagemId: viagem.id, // Certifique-se de que viagem.id é correto
    }));
  }, [viagem]);

  async function registrarPassagem() {
    try {
      setLoading(true);
      const response = await api.put(`/passagem/${passagem.id}`, passagem);

      if (!response.data.isSucces) {
        toast("erro ao tentar registrar passagem");
        return;
      }

      const passagensAtualizadas = passagens?.filter(
        (p) => p.id != passagem.id
      );

      setViagem({
        ...viagem,
        passagens: [...passagensAtualizadas!, response.data.data],
      });
      toast("registrada com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    } finally {
      setLoading(false);
    }
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
      <DialogContent className="w-auto h-auto flex flex-col items-center overflow-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Passagem</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
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
              <label htmlFor="viagem">Passageiro:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, nomePassageiro: e.target.value })
                }
                value={passagem.nomePassageiro}
              />
            </div>

            <div>
              <label htmlFor="viagem">Email:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, emailPassageiro: e.target.value })
                }
                value={passagem.emailPassageiro}
              />
            </div>

            <div>
              <label htmlFor="viagem">Cpf:</label>
              <Input
                onChange={(e) =>
                  setPassagem({ ...passagem, cpfPassageiro: e.target.value })
                }
                value={passagem.cpfPassageiro}
              />
            </div>

            <div>
              <label htmlFor="viagem">telefonePassageiro:</label>
              <Input
                onChange={(e) =>
                  setPassagem({
                    ...passagem,
                    telefonePassageiro: e.target.value,
                  })
                }
                value={passagem.telefonePassageiro}
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
            </div>
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
        </div>
        <DialogFooter>
          <Button onClick={() => registrarPassagem()}>
            {loading ? (
              <Image
                src={loadingIcon}
                alt="loading"
                className="text-center animate-spin"
                width={50}
                height={50}
              />
            ) : (
              "Atualizar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
