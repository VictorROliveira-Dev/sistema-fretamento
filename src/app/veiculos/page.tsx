"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { Veiculo } from "@/lib/types";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";
import Image from "next/image";
import loading from "../assets/loading-dark.svg";
import Link from "next/link";
import calendar from "../assets/calendar.svg";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [buscarVeiculos, setBuscarVeiculos] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchVeiculos = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/veiculo");
        setVeiculos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar veículos", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchVeiculos();
  }, []);

  const veiculosFiltrados = veiculos.filter((veiculo) => {
    if (!veiculo) return false;

    return veiculo.prefixo.includes(buscarVeiculos);
  });

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[650px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Veículos
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <div>
                  <FormInput
                    label="Prefixo:"
                    name="prefixo"
                    placeholder="Digite o prefixo..."
                    value={buscarVeiculos}
                    onChange={(e) => setBuscarVeiculos(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex gap-2 items-center">
                <Link
                  href="/calendario"
                  className="flex items-center gap-2 py-1.5 px-4 bg-black text-white rounded-md text-sm hover:bg-black/85"
                >
                  <p>Calendário</p>
                  <Image src={calendar} alt="calendar" width={22} />
                </Link>
                <DialogAdicionar
                  veiculos={veiculos}
                  setVeiculos={setVeiculos}
                />
              </div>
            </div>
            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[200px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Prefixo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Placa
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        KM Atual
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Marca
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Tanque
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Tipo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Qtd. Poltronas
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Ano
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {veiculosFiltrados.map((veiculo) => (
                      <TableRow key={veiculo.id} className="hover:bg-gray-200">
                        <TableCell>{veiculo.prefixo}</TableCell>
                        <TableCell>{veiculo.placa}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.kmAtual}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.marca}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.capacidadeTank}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.tipo}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.quantidadePoltronas}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {veiculo.ano}
                        </TableCell>
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
                            <DialogInformacoes veiculo={veiculo} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
