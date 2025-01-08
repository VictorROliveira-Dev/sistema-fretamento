"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import Image from "next/image";
import loading from "@/app/assets/loading-dark.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ferias } from "@/lib/types";
import DialogRemover from "../ferias/components/dialog-remover";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FeriasPage() {
  const router = useRouter();
  const [ano, setAno] = useState<number>(0);
  const [ferias, setFerias] = useState<Ferias[]>([]);
  const [carregando, setCarregando] = useState(false);

  function feriasAtivas(dataInicial: string, dataFinal: string): string {
    const dataInicio = new Date(dataInicial);
    const dataFim = new Date(dataFinal);
    const diaAtual = new Date();

    if (diaAtual > dataFim) return "JA_UTILIZADAS";
    if (diaAtual >= dataInicio && diaAtual <= dataFim)
      return "SENDO_UTILIZADAS";
    if (diaAtual < dataInicio) return "SERAO_UTILIZADAS";

    return "INDEFINIDO";
  }

  async function fetchFerias() {
    try {
      const params: Record<string, string> = {};
      if (ano) params["year"] = ano.toString();
      const queryString = new URLSearchParams(params).toString();
      setCarregando(true);
      const response = await api.get(`/ferias?${queryString}`);
      if (!response.data.isSucces) {
        toast("erro ao consultar dados");
      }

      setFerias(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast("erro ao tentar consultar dados");
        }
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    fetchFerias();
  }, []);

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[650px]">
      <div className="md:h-[500px] h-[550px] md:w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">Vizualizar Férias</p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto space-y-4 md:w-full">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between w-full">
              <div className="flex  gap-2 font-bold items-end">
                <div>
                  <Label>Ano das férias</Label>
                  <Input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                  />
                </div>
                <Button onClick={() => fetchFerias()} className="bg-blue-600">
                  <Search className="text-white" />
                </Button>
              </div>
            </div>
            {carregando ? (
              <div className="flex items-center justify-center">
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
                        Responsavel
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data início
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data Final
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {ferias.map((feriasAtual) => (
                      <TableRow
                        key={feriasAtual.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell className="hidden sm:table-cell">
                          {feriasAtual.responsavel
                            ? feriasAtual.responsavel.nome
                            : "n/a"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {feriasAtual.inicioFerias}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {feriasAtual.fimFerias}
                        </TableCell>
                        <TableCell>
                          {(() => {
                            const status = feriasAtivas(
                              feriasAtual.inicioFerias,
                              feriasAtual.fimFerias
                            );
                            switch (status) {
                              case "JA_UTILIZADAS":
                                return (
                                  <Badge variant="destructive">
                                    Já Utilizadas
                                  </Badge>
                                );
                              case "SENDO_UTILIZADAS":
                                return (
                                  <Badge className="bg-green-500">
                                    Sendo Utilizadas
                                  </Badge>
                                );
                              case "SERAO_UTILIZADAS":
                                return (
                                  <Badge className="bg-yellow-500">
                                    Serão Utilizadas
                                  </Badge>
                                );
                              default:
                                return (
                                  <Badge variant="outline">Indefinido</Badge>
                                );
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogRemover
                              ferias={feriasAtual}
                              setFerias={setFerias}
                            />
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