import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Abastecimento, Adiantamento, Viagem } from "@/lib/types";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TravelDialogProps {
  viagem: Viagem;
}

export function TravelDialog({ viagem }: TravelDialogProps) {
  const [adiantamento, setAdiantamento] = useState<Adiantamento | undefined>(
    viagem.adiantamento
  );

  const [abastecimento, setAbastecimento] = useState<Abastecimento | undefined>(
    viagem.abastecimento
  );

  const [valorTotal, setValorTotal] = useState(
    abastecimento?.valorTotal.toFixed(2) || "0,00"
  );

  const [verba, setVerba] = useState(adiantamento?.verba.toFixed(2) || "0,00");
  const [valorDeAcerto, setValorDeAcerto] = useState(
    adiantamento?.valorDeAcerto.toFixed(2) || "0,00"
  );
  const [diferenca, setDiferenca] = useState(
    adiantamento?.diferenca.toFixed(2) || "0,00"
  );

  async function adicionarAdiantamento() {
    if (adiantamento != undefined) return;

    setAdiantamento({
      id: 0,
      tipoVerba: "",
      verba: 0,
      valorDeAcerto: 0,
      diferenca: 0, // Calculado como verba - valorDeAcerto
      descricao: "",
      viagemId: viagem.id,
    });
  }

  async function adicionarAbastecimento() {
    if (abastecimento != undefined) return;

    setAbastecimento({
      id: 0,
      valorTotal: 0,
      litros: 0,
      codigoNfe: "",
      viagemId: viagem.id,
    });
  }

  function handleValorTotalChange(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = event.target.value;

    // Remove caracteres não numéricos (exceto vírgula e ponto)
    inputValue = inputValue.replace(/[^\d,]/g, "").replace(",", ".");

    // Converte para número
    let numericValue = parseFloat(inputValue);

    if (isNaN(numericValue) || numericValue < 0) {
      numericValue = 0;
    }

    // Atualiza o estado com o valor formatado
    setValorTotal(
      numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  }

  function handleMonetaryChange(
    event: React.ChangeEvent<HTMLInputElement>,
    setState: (value: string) => void
  ) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d,]/g, "").replace(",", ".");
    let numericValue = parseFloat(inputValue);
    if (isNaN(numericValue) || numericValue < 0) {
      numericValue = 0;
    }
    setState(
      numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer transition-all hover:scale-110">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            className="w-10"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Travel Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Travel Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Viagem Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Origem</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.rota.saida.cidadeSaida}
                  </p>
                </div>
                <div>
                  <Label>Destination</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.rota.retorno.cidadeSaida}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data Partida</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.dataHorarioSaida.data}
                  </p>
                </div>
                <div>
                  <Label>Data Retorno</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.dataHorarioRetorno.data}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Driver</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.motorista?.nome}
                  </p>
                </div>
                <div>
                  <Label>Vehicle</Label>
                  <p className="text-sm text-muted-foreground">
                    {viagem.veiculo?.prefixo} - {viagem.veiculo?.placa}
                  </p>
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground">{viagem.status}</p>
              </div>
            </CardContent>
          </Card>

          {/* Fueling Section */}
          <Card>
            <CardHeader>
              <CardTitle>Abastecimento da viagem</CardTitle>
            </CardHeader>
            <CardContent>
              {abastecimento == undefined ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => adicionarAbastecimento()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Registro
                </Button>
              ) : (
                <form className="flex flex-col w-full">
                  <div className="w-full flex gap-2 items-start justify-evenly">
                    <div className="grid gap-2">
                      <Label htmlFor="valorTotal">Total Value (R$)</Label>
                      <Input
                        id="valorTotal"
                        name="valorTotal"
                        value={valorTotal}
                        onChange={handleValorTotalChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="litros">Litros</Label>
                      <Input
                        id="litros"
                        name="litros"
                        type="number"
                        step="0.01"
                        defaultValue={abastecimento.litros}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="codigoNfe">NFe de pagamento</Label>
                      <Input
                        id="codigoNfe"
                        name="codigoNfe"
                        defaultValue={abastecimento.codigoNfe}
                        required
                      />
                      <p className="text-gray-500 text-xs">
                        Informe quando efetuar o pagamento
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span>Km Inicial:{viagem.kmInicialVeiculo}</span>
                    <span>Km Final:{viagem.kmFinalVeiculo}</span>
                    <span>
                      Total:{viagem.kmFinalVeiculo - viagem.kmInicialVeiculo}{" "}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <span>Km/L: </span>
                    <span>Valor Litro: </span>
                  </div>
                  <Button type="submit" className="w-full">
                    Update Fueling Record
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Advance Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Adiantamento de viagem</CardTitle>
            </CardHeader>
            <CardContent>
              {adiantamento == undefined ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => adicionarAdiantamento()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Adiantamento
                </Button>
              ) : (
                <form className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end">
                  <div className="grid gap-2">
                    <Label htmlFor="tipoVerba">Origem da Verba</Label>
                    <Select
                      value={adiantamento.tipoVerba}
                      onValueChange={(e) =>
                        setAdiantamento({ ...adiantamento, tipoVerba: e })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="origem da verba"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectItem value="Almoço">Almoço</SelectItem>
                          <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                          <SelectItem value="Estacionamento">
                            Estacionamento
                          </SelectItem>
                          <SelectItem value="Pedagio">Pedagio</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="verba">Valor</Label>
                    <Input
                      id="verba"
                      name="verba"
                      value={verba}
                      onChange={(e) => handleMonetaryChange(e, setVerba)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="valorDeAcerto">Valor de Acerto</Label>
                    <Input
                      id="valorDeAcerto"
                      name="valorDeAcerto"
                      value={valorDeAcerto}
                      onChange={(e) =>
                        handleMonetaryChange(e, setValorDeAcerto)
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diferenca">Diferenca</Label>
                    <Input
                      id="diferenca"
                      name="diferenca"
                      value={diferenca}
                      onChange={(e) => handleMonetaryChange(e, setDiferenca)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descricao">Description</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      defaultValue={adiantamento!.descricao}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Atualizar
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
