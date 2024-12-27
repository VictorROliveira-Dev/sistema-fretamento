"use client";
/*import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import passageirosIcon from "@/app/assets/passageiros.svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import removeIcon from "@/app/assets/remove.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

export default function Passagens() {
  const [viagens, setViagens] = useState<ViagemProgramda[]>([]);
  const [viagemSelecionada, setViagemSeleciona] =
    useState<ViagemProgramda | null>(null);

  async function handleViagemChange(id: number) {
    const response = await api.get(`
      /ViagemProgramada/${id}?includePassagem=true&includeVeiculo=true
    `);
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
    fetchViagens();
  }, []);
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1100px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">Lista Passagens</p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:w-[1000px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Busque a Viagem:
                </label>
                <Select
                  onValueChange={(e) => handleViagemChange(Number(e))}
                  name="tipo"
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecione a viagem..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {viagens.map((viagem) => (
                        <SelectItem value={viagem.id.toString()}>
                          {viagem.titulo}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </form>
              <div className="flex items-center justify-between">
                <div className="w-[500px] h-[40px] border p-2 rounded-md">
                  <p className="text-center">
                    <strong>ORIGEM:</strong> Irece- <strong>DESTINO:</strong>{" "}
                    Santa Cruz.
                  </p>
                </div>
              </div>
              <DialogAdicionar
                viagem={viagemSelecionada!}
                setViagem={setViagemSeleciona}
              />
            </div>
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Passageiro
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Emissão
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Valor Pago
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Poltrona
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Situação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {viagemSelecionada ? (
                  viagemSelecionada.passagens!.map((passagem) => (
                    <TableRow
                      className="hover:bg-gray-200"
                      key={passagem.poltrona}
                    >
                      <TableCell>{passagem.passageiro?.nome}</TableCell>
                      <TableCell>{passagem.dataEmissao}</TableCell>
                      <TableCell>{passagem.formaPagamento}</TableCell>
                      <TableCell>{passagem.poltrona}</TableCell>
                      <TableCell>{passagem.situacao}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DialogEditar
                            passagemSelecionada={passagem}
                            setViagem={setViagemSeleciona}
                            viagem={viagemSelecionada}
                            passagens={viagemSelecionada.passagens}
                          />
                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={removeIcon}
                              alt="Remover"
                              width={25}
                              className="hover:scale-110"
                            />
                          </Button>
                          <DialogInformacoes />
                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={passageirosIcon}
                              alt="Passageiros"
                              width={25}
                              className="hover:scale-110"
                            />
                          </Button>
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
          </div>
        </div>
      </div>
    </section>
  );
}
*/