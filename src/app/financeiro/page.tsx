"use client";
import removeIcon from "@/app/assets/remove.svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import DialogEditar from "./components/despesas/dialog-editar";
import DialogEditarReceita from "./components/receitas/dialog-editar";
import Despesas from "./components/despesas/despesas";
import Receitas from "./components/receitas/receitas";
import documentoIcon from "@/app/assets/documentos.svg";
import { useEffect, useState } from "react";
import { IDespesas, IReceitas } from "@/lib/types";
import { api } from "@/lib/axios";

export default function Financeiro() {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [receitas, setReceitas] = useState<IReceitas[]>([]);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await api.get("/despesa");
        setDespesas(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao tentar recuperar despesas", error);
      }
    };
    const fetchReceitas = async () => {
      try {
        const response = await api.get("/api/receita");
        setReceitas(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao tentar recuperar receitas", error);
      }
    };

    fetchDespesas();
    fetchReceitas();
  }, []);

  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Finanças
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] space-y-4">
            <Tabs defaultValue="despesas" className="flex flex-col">
              <TabsList className="gap-4">
                <TabsTrigger value="despesas" className="font-bold">
                  Despesas
                </TabsTrigger>
                <TabsTrigger value="receitas" className="font-bold">
                  Receitas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="despesas">
                <Despesas />
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Vencimento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Origem
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Responsável
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Pago
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Centro de Custo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor Parcial
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {despesas.map((despesa) => (
                      <TableRow key={despesa.id} className="hover:bg-gray-200">
                        <TableCell>{despesa.vencimento}</TableCell>
                        <TableCell>{despesa.origemPagamento}</TableCell>
                        <TableCell>{despesa.responsavelId}</TableCell>
                        <TableCell>{despesa.pago}</TableCell>
                        <TableCell>{despesa.centroCusto}</TableCell>
                        <TableCell>{despesa.valorParcial}</TableCell>
                        <TableCell>{despesa.valorTotal}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar />
                            <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                              <Image
                                src={removeIcon}
                                alt="Remover"
                                width={25}
                                className="hover:scale-110"
                              />
                            </Button>
                            <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                              <Image
                                src={documentoIcon}
                                alt="documento"
                                width={25}
                                className="hover:scale-110"
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="receitas">
                <Receitas />
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Vencimento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Origem
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Responsável
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Pago
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Centro de Custo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor Parcial
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {receitas.map((receita) => (
                      <TableRow key={receita.id} className="hover:bg-gray-200">
                        <TableCell>{receita.vencimento}</TableCell>
                        <TableCell>{receita.origemPagamento}</TableCell>
                        <TableCell>{receita.responsavelId}</TableCell>
                        <TableCell>{receita.pago}</TableCell>
                        <TableCell>{receita.centroCusto}</TableCell>
                        <TableCell>{receita.valorParcial}</TableCell>
                        <TableCell>{receita.valorTotal}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar />
                            <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                              <Image
                                src={removeIcon}
                                alt="Remover"
                                width={25}
                                className="hover:scale-110"
                              />
                            </Button>
                            <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                              <Image
                                src={documentoIcon}
                                alt="documento"
                                width={25}
                                className="hover:scale-110"
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}