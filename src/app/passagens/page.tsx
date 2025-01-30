"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { ViagemProgramda } from "@/lib/types";
import DialogRemover from "./components/dialog-remover";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { DialogDocumento } from "../viagem-programada/components/dialog-document-ida";
import VoucherPassagem from "./components/voucher-passagem";

export default function Passagens() {
  const [viagens, setViagens] = useState<ViagemProgramda[]>([]);
  const [viagemSelecionada, setViagemSeleciona] =
    useState<ViagemProgramda | null>(null);

  async function handleViagemChange(id: number) {
    const url = `/viagemProgramada/${id}?includePassagem=true&includeVeiculo=true`;
    const response = await api.get(url);
    if (!response.data.isSucces) {
      toast("erro ao tentar recuperar viagem");
    }

    console.log(response.data.data);
    setViagemSeleciona(response.data.data);
  }
  async function fetchViagens() {
    const response = await api.get("/viagemprogramada");
    if (!response.data.isSucces) {
      toast("erro ao tentar buscar viagens, recarregue a pagina");
      return;
    }

    setViagens(response.data.data);
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const viagem = searchParams.get("viagem");
    fetchViagens();
    if (viagem) {
      handleViagemChange(Number(viagem));
    }
  }, []);

  const totalValorPassagens = viagemSelecionada?.passagens
    ? viagemSelecionada.passagens.reduce((total, passagem) => {
        return total + (passagem.valorTotal || 0);
      }, 0)
    : 0;

  return (
    <section className="bg-[#070180] pt-12 h-[800px]">
      <div className="h-[700px] w-[95%] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">Lista Passagens</p>
        </div>
        <div className="flex pt-10 md:h-screen h-[800px]">
          <div className="mx-auto md:w-[1100px] ">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <form className="flex flex-col">
                <label htmlFor="name" className="font-bold">
                  Busque a Viagem:
                </label>
                <Select
                  value={
                    viagemSelecionada ? viagemSelecionada.id.toString() : ""
                  }
                  onValueChange={(e) => handleViagemChange(Number(e))}
                  name="tipo"
                >
                  <SelectTrigger className="md:w-[200px] w-[290px]">
                    <SelectValue placeholder="Selecione a viagem..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {viagens.map((viagem) => (
                        <SelectItem
                          key={viagem.id}
                          value={viagem.id.toString()}
                        >
                          {viagem.titulo}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </form>
              <div className="flex items-center justify-between mt-5">
                <div className="md:w-[500px] h-[40px] border p-2 rounded-md">
                  <p className="text-center">
                    <strong>ORIGEM: {viagemSelecionada?.saida.local}</strong> -{" "}
                    <strong>
                      DESTINO: {viagemSelecionada?.retorno.local}{" "}
                    </strong>{" "}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <DialogDocumento
                  viagemId={viagemSelecionada?.id!}
                  titulo={viagemSelecionada?.titulo!}
                  saida={viagemSelecionada?.saida ?? { data: "" }} // Evita undefined
                  retorno={viagemSelecionada?.retorno ?? { data: "" }} // Evita undefined
                />

                <DialogAdicionar
                  viagem={viagemSelecionada!}
                  setViagem={setViagemSeleciona}
                />
              </div>
            </div>
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Passageiro
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Data Emissão
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Valor Pago
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Poltrona IDA
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Poltrona VOLTA
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Situação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {viagemSelecionada ? (
                  viagemSelecionada.passagens!.map((passagem) => (
                    <TableRow
                      className="hover:bg-gray-200"
                      key={passagem.poltronaIda}
                    >
                      <TableCell>
                        {passagem.nomePassageiro
                          ? passagem.nomePassageiro
                          : "Sem passageiro"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {format(
                          toZonedTime(parseISO(passagem.dataEmissao), "UTC"),
                          "dd/MM/yyyy"
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {passagem.formaPagamento}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {passagem.poltronaIda
                          ? passagem.poltronaIda
                          : "Apenas volta"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {passagem.poltronaVolta
                          ? passagem.poltronaVolta
                          : "Apenas ida"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {passagem.situacao}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DialogEditar
                            passagemSelecionada={passagem}
                            setViagem={setViagemSeleciona}
                            viagem={viagemSelecionada}
                            passagens={viagemSelecionada.passagens}
                          />
                          <DialogRemover
                            viagem={viagemSelecionada}
                            setViagem={setViagemSeleciona}
                            passagem={passagem}
                          />
                          <DialogInformacoes
                            trip={viagemSelecionada}
                            passagem={passagem}
                          />
                          <VoucherPassagem passagem={passagem} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      Nenhuma passagem encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-10">
              Valor Total em Passagens:{" "}
              <strong>R$ {totalValorPassagens.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
