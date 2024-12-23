"use client";
import documentoIcon from "@/app/assets/documentos.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import DialogInformacoes from "./components/dialog-informacoes";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import { DialogExcluir } from "./components/dialog_excluir";
import { useEffect, useState } from "react";
import { Viagem } from "@/lib/types";
import { api } from "@/lib/axios";

export default function ViagensServicos() {
  const [viagens, setViagens] = useState<Viagem[]>([]);

  async function fetchViagens() {
    const response = await api.get("/viagem");

    if (!response.data.isSucces) {
      console.log(response.data.message);
      return;
    }
    console.log(response.data.data);
    setViagens(response.data.data);
  }
  useEffect(() => {
    fetchViagens();
  }, []);

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[425px]">
      <div className="md:h-[400px] h-[550px] md:w-[1100px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Viagens/Serviços
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
              <form className="flex flex-col md:flex-row gap-2 font-bold">
                <div>
                  <label htmlFor="fantasia">Localizar Viagem:</label>
                  <Input
                    name="fantasia"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o identificador..."
                  />
                </div>
                <div>
                  <label htmlFor="cnpj">Veículo:</label>
                  <Input
                    name="cnpj"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o veículo..."
                  />
                </div>
              </form>

              <DialogAdicionar setViagens={setViagens} viagens={viagens} />
            </div>

            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Motorista
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Veiculo
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Cliente
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Cidade Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Data Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Cidade Destino
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Data Chegada
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Valor Contratado
                  </TableHead>
                  <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                    Status Viagem
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {viagens.map((viagem) => (
                  <TableRow className="hover:bg-gray-200" key={viagem.id}>
                    <TableCell>{viagem.motoristaId}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.veiculoId}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.clienteId}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.rota.saida.cidadeSaida}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.dataHorarioSaida.data}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.rota.retorno.cidadeSaida}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.dataHorarioRetorno.data}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.valorContratado}</TableCell>
                    <TableCell className="hidden sm:table-cell">{viagem.status}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DialogEditar
                          setViagens={setViagens}
                          viagens={viagens}
                          viagemprop={viagem}
                        />

                        <DialogExcluir
                          id={viagem.id}
                          setViagens={setViagens}
                          viagens={viagens}
                        />
                        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                          <Image
                            src={documentoIcon}
                            alt="documento"
                            width={25}
                            className="hover:scale-110"
                          />
                        </Button>
                        <DialogInformacoes />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
