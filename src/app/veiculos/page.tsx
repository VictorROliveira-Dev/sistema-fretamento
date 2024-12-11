"use client";
import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/documentos.svg";
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
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { Veiculo } from "@/lib/types";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await api.get("/veiculo");
        setVeiculos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar veículos", error);
      }
    };
    fetchVeiculos();
  }, []);

  return (
    <section className="bg-[#070180] pt-12 h-[425px]">
      <div className="h-[400px] w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Veículos
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <FormInput
                    label="Prefixo:"
                    name="prefixo"
                    placeholder="Digite o prefixo..."
                  />
                </div>
              </form>
              <DialogAdicionar veiculos={veiculos} setVeiculos={setVeiculos} />
            </div>
            <div className="h-[200px] overflow-y-scroll">
              <Table>
                <TableHeader className="border-b-2">
                  <TableRow>
                    <TableHead className="text-black font-bold text-center">
                      Prefixo
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Placa
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      KM Atual
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Marca
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Tanque
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Tipo
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Qtd. Poltronas
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Ano
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  {veiculos.map((veiculo) => (
                    <TableRow key={veiculo.id} className="hover:bg-gray-200">
                      <TableCell>{veiculo.prefixo}</TableCell>
                      <TableCell>{veiculo.placa}</TableCell>
                      <TableCell>{veiculo.kmAtual}</TableCell>
                      <TableCell>{veiculo.marca}</TableCell>
                      <TableCell>{veiculo.capacidadeTank}</TableCell>
                      <TableCell>{veiculo.tipo}</TableCell>
                      <TableCell>{veiculo.quantidadePoltronas}</TableCell>
                      <TableCell>{veiculo.ano}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DialogEditar
                            veiculo={veiculo}
                            setVeiculos={setVeiculos}
                            veiculos={veiculos}
                          />
                          <DialogRemover
                            veiculo={veiculo}
                            setVeiculos={setVeiculos}
                          />
                          <DialogInformacoes veiculoId={veiculo.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
