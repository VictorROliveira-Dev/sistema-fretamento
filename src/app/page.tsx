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
import { IDocumentos, ReceitasMensais } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import loading from "./assets/loading-dark.svg";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { CarIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview/overview";

export default function Home() {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);
  const [despesa, setDespesa] = useState<number>(0);
  const [receita, setReceita] = useState<number>(0);
  const [viagens, setViagens] = useState<number>(0);
  const [, setReceitasMensais] = useState<ReceitasMensais[]>([]);
  const [carregando, setCarregando] = useState(false);

  const fetchData = async () => {
    setCarregando(true);
    try {
      const [
        documentosReponse,
        viagensResponse,
        despesasResponse,
        receitasResponse,
        liquidoResponse,
      ] = await Promise.all([
        api.get("/documento"),
        api.get("/viagens"),
        api.get("/despesas"),
        api.get("/receita"),
        api.get("/liquido"),
      ]);

      setDocumentos(documentosReponse.data.data);
      setViagens(viagensResponse.data.data);
      setDespesa(despesasResponse.data.data);
      setReceita(receitasResponse.data.data);
      setReceitasMensais(liquidoResponse.data.data);
    } catch (error) {
      console.log("erro ao tentar recuperar dados", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
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
    <div className="flex-1 space-y-4 p-8 pt-6 bg-[#070180]">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viagens</CardTitle>
            <CarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {carregando && viagens === 0 ? (
              <Image src={loading} alt="loading" className="animate-spin" />
            ) : (
              <div className="text-2xl font-bold">{viagens}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesa Mensal
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {carregando && despesa === 0 ? (
              <Image src={loading} alt="loading" className="animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                R$ {despesa.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {carregando && receita === 0 ? (
              <Image src={loading} alt="loading" className="animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                R$ {receita.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Liquido</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {carregando && receita - despesa === 0 ? (
              <Image src={loading} alt="loading" className="animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                R$ {(receita - despesa).toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Valores no Ano</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardContent className="">
            <div className="w-full flex h-full flex-col pt-4 items-center gap-4">
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
                              toZonedTime(
                                parseISO(documento.vencimento),
                                "UTC"
                              ),
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
                  <p className="text-xs font-medium">
                    30 Dias para o vencimento
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                  <p className="text-xs font-medium">
                    15 Dias para o vencimento
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                  <p className="text-xs font-medium">
                    7 Dias para o vencimento
                  </p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
