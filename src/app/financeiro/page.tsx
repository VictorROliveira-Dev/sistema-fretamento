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

export default function Financeiro() {
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
                        Centro de Custos
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Situação
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    <TableRow className="hover:bg-gray-200">
                      <TableCell>
                        <p>João</p>
                      </TableCell>
                      <TableCell>099.876.345-21</TableCell>
                      <TableCell>Irecê - BA</TableCell>
                      <TableCell>(74)98877-0044</TableCell>
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
                        Centro de Custos
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Valor
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Situação
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    <TableRow className="hover:bg-gray-200">
                      <TableCell>
                        <p>João</p>
                      </TableCell>
                      <TableCell>099.876.345-21</TableCell>
                      <TableCell>Irecê - BA</TableCell>
                      <TableCell>(74)98877-0044</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DialogEditarReceita />
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
