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
                    value={buscarVeiculos}
                    onChange={(e) => setBuscarVeiculos(e.target.value)}
                  />
                </div>
              </form>
              <DialogAdicionar veiculos={veiculos} setVeiculos={setVeiculos} />
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
                    {veiculosFiltrados.map((veiculo) => (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
