"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import { IDocumentos, Viagem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import loading from "./assets/loading-dark.svg";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

export default function Home() {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const diasDaSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setCarregando(true);
      try {
        const [documentosReponse, viagensResponse] = await Promise.all([
          api.get("/documento"),
          api.get("/viagem"),
        ]);
        // Obtendo a data atual
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth(); // Mês atual (0 = Janeiro, 11 = Dezembro)
        const anoAtual = dataAtual.getFullYear(); // Ano atual
        // Filtrando apenas as viagens do mês atual
        const viagensDoMesAtual = viagensResponse.data.data.filter(
          (viagem: Viagem) => {
            const dataViagem = new Date(viagem.dataHorarioSaida.data);
            const mesViagem = dataViagem.getMonth();
            const anoViagem = dataViagem.getFullYear();
            return mesViagem === mesAtual && anoViagem === anoAtual;
          }
        );
        setDocumentos(documentosReponse.data.data);
        setViagens(viagensDoMesAtual);
      } catch (error) {
        console.log("erro ao tentar recuperar dados", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  function getDateVencimento(dataVencimento: string) {
    const today = new Date();
    const vencimento = parseISO(dataVencimento); // Converte a data para objeto Date
    const diferenca = Math.ceil(
      (vencimento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diferenca <= 7) return "text-red-500 font-bold";
    if (diferenca <= 15) return "text-yellow-500 font-bold";
    if (diferenca <= 30) return "text-blue-500 font-bold";

    return "text-black font-medium";
  }

  return (
    <>
      <main className="md:h-[425px] bg-[#070180] pt-10 pb-10 ">
        <div
          className="w-[90%] mx-auto rounded-md bg-white 
          flex flex-col sm:flex-row sm:justify-around gap-6 p-4"
        >
          <div className="w-full sm:w-[50%] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold">Viagens/Serviços</p>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              {carregando ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={loading}
                    alt="Carregando"
                    className="text-center animate-spin"
                  />
                </div>
              ) : (
                <Table className="md:w-[500px]">
                  <TableHeader>
                    <TableRow className="bg-white text-xs md:text-sm">
                      <TableHead className="text-black font-black text-center">
                        Dia
                      </TableHead>
                      <TableHead className="text-black font-black text-center">
                        Data
                      </TableHead>
                      <TableHead className="text-black font-black text-center">
                        Orçamento
                      </TableHead>
                      <TableHead className="text-black font-black text-center">
                        Tipo Viagem
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white text-center text-[11px] md:text-sm font-medium">
                    {viagens.map((viagem) => (
                      <TableRow key={viagem.id}>
                        <TableCell>
                          {
                            diasDaSemana[
                              new Date(viagem.dataHorarioSaida.data).getDay()
                            ]
                          }
                        </TableCell>
                        <TableCell>
                          {new Date(
                            viagem.dataHorarioSaida.data
                          ).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          {viagem.valorContratado.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>{viagem.tipoViagem}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex justify-center">
              <Link
                href="/viagens-servicos"
                className="bg-black text-white text-sm w-20 m-4 text-center p-2 rounded-md hover:bg-black/85 transition-all font-medium"
              >
                Ver mais
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-[48%] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold">Vencimento Doc/Certificados</p>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              {carregando ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={loading}
                    alt="Carregando"
                    className="text-center animate-spin"
                  />
                </div>
              ) : (
                <Table className="md:w-[500px] w-[200px]">
                  <TableHeader>
                    <TableRow className="bg-white text-xs md:text-sm">
                      <TableHead className="text-black font-black text-center">
                        Vencimento
                      </TableHead>
                      <TableHead className="text-black font-black text-center">
                        Referência
                      </TableHead>
                      <TableHead className="text-black font-black text-center">
                        Doc/Certificados
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white text-center text-xs md:text-sm font-medium">
                    {documentos.map((documento) => (
                      <TableRow key={documento.id} className="">
                        <TableCell
                          className={`${getDateVencimento(
                            documento.vencimento
                          )}`}
                        >
                          {format(
                            toZonedTime(parseISO(documento.vencimento), "UTC"),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>{documento.referencia}</TableCell>
                        <TableCell>
                          {documento.tipoDocumento.toUpperCase()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <p className="text-xs font-medium">30 Dias para o vencimento</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                <p className="text-xs font-medium">15 Dias para o vencimento</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <p className="text-xs font-medium">7 Dias para o vencimento</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                href="/documentos"
                className="bg-black text-white text-sm w-20 m-4 text-center p-2 rounded-md hover:bg-black/85 transition-all font-medium"
              >
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
