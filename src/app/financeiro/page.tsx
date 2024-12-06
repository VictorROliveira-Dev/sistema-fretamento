"use client";

import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type FormField = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
};

const formFields: FormField[] = [
  {
    label: "Vencimento",
    name: "vencimento",
    placeholder: "",
    type: "date",
  },
  {
    label: "Valor",
    name: "valortotal",
    placeholder: "Digite o valor",
    type: "number",
  },
  {
    label: "Viagem",
    name: "viagem",
    placeholder: "Digite o identificador da viagem",
  },
];

const formFieldsReceitas: FormField[] = [
  {
    label: "Viagem",
    name: "viagem",
    placeholder: "Digite o identificador da viagem",
  },
  {
    label: "Origem Receita",
    name: "origemreceita",
    placeholder: "Digite a origem...",
  },
  {
    label: "Valor Total",
    name: "valortotal",
    placeholder: "Digite o valor...",
    type: "number",
  },
  {
    label: "Vencimento",
    name: "vencimento",
    placeholder: "",
    type: "date",
  },
];

const FormInput: React.FC<FormField> = ({
  label,
  name,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <Input
      name={name}
      className="border-2 font-medium w-[250px]"
      placeholder={placeholder}
      type={type}
    />
  </div>
);

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
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <Tabs defaultValue="despesas" className="flex flex-col">
              <TabsList className="gap-4">
                <TabsTrigger value="despesas">Despesas</TabsTrigger>
                <TabsTrigger value="receitas">Receitas</TabsTrigger>
              </TabsList>
              <TabsContent value="despesas">
                <div className="flex items-center justify-between">
                  <form className="flex gap-2 font-bold">
                    <div>
                      <label htmlFor="inicio">Data inicio:</label>
                      <Input type="date" name="inicio" />
                    </div>
                    <div>
                      <label htmlFor="final">Data Final:</label>
                      <Input type="date" name="final" />
                    </div>
                    <div>
                      <label htmlFor="centrocusto">Centro de Custo:</label>
                      <Select name="centrocusto">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Centro de Custo</SelectLabel>
                            <SelectItem value="extintor">Terceiros</SelectItem>
                            <SelectItem value="ipva">Multas</SelectItem>
                            <SelectItem value="CNH">Viagens</SelectItem>
                            <SelectItem value="alvara">
                              Estacionamento
                            </SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-500">
                        Adicionar Despesa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[600px] h-[420px] flex flex-col items-center">
                      <DialogHeader className="mb-5">
                        <DialogTitle className="font-black">
                          Cadastro de Despesa
                        </DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-wrap gap-4 w-full justify-center">
                        <div>
                          <label htmlFor="centrocusto">Centro de Custo:</label>
                          <Select name="centrocusto">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Centro de Custo</SelectLabel>
                                <SelectItem value="extintor">
                                  Terceiros
                                </SelectItem>
                                <SelectItem value="ipva">Multas</SelectItem>
                                <SelectItem value="CNH">Viagens</SelectItem>
                                <SelectItem value="alvara">
                                  Estacionamento
                                </SelectItem>
                                <SelectItem value="Outros">Outros</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="referencia">Situação:</label>
                          <Select name="referencia">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione a situação..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Situações</SelectLabel>
                                <SelectItem value="motorista">Pago</SelectItem>
                                <SelectItem value="extintor">
                                  Não pago
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        {formFields.map((field) => (
                          <FormInput
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                          />
                        ))}
                      </div>

                      <DialogFooter className="flex items-center gap-2 mt-10">
                        <Button variant="outline">Fechar</Button>
                        <Button>Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                                <Image
                                  src={editIcon}
                                  alt="Editar"
                                  width={25}
                                  className="hover:scale-110"
                                />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[600px] h-[420px] flex flex-col items-center">
                              <DialogHeader className="mb-5">
                                <DialogTitle className="font-black">
                                  Cadastro de Despesa
                                </DialogTitle>
                              </DialogHeader>

                              <div className="flex flex-wrap gap-4 w-full justify-center">
                                <div>
                                  <label htmlFor="centrocusto">
                                    Centro de Custo:
                                  </label>
                                  <Select name="centrocusto">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Centro de Custo
                                        </SelectLabel>
                                        <SelectItem value="extintor">
                                          Terceiros
                                        </SelectItem>
                                        <SelectItem value="ipva">
                                          Multas
                                        </SelectItem>
                                        <SelectItem value="CNH">
                                          Viagens
                                        </SelectItem>
                                        <SelectItem value="alvara">
                                          Estacionamento
                                        </SelectItem>
                                        <SelectItem value="Outros">
                                          Outros
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label htmlFor="referencia">Situação:</label>
                                  <Select name="referencia">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione a situação..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Situações</SelectLabel>
                                        <SelectItem value="motorista">
                                          Pago
                                        </SelectItem>
                                        <SelectItem value="extintor">
                                          Não pago
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {formFields.map((field) => (
                                  <FormInput
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                  />
                                ))}
                              </div>

                              <DialogFooter className="flex items-center gap-2 mt-10">
                                <Button variant="outline">Fechar</Button>
                                <Button>Salvar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={removeIcon}
                              alt="Remover"
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
                <div className="flex items-center justify-between">
                  <form className="flex gap-2 font-bold">
                    <div>
                      <label htmlFor="inicio">Data inicio:</label>
                      <Input type="date" name="inicio" />
                    </div>
                    <div>
                      <label htmlFor="final">Data Final:</label>
                      <Input type="date" name="final" />
                    </div>
                    <div>
                      <label htmlFor="centrocusto">Centro de Custo:</label>
                      <Select name="centrocusto">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Centro de Custo</SelectLabel>
                            <SelectItem value="extintor">Terceiros</SelectItem>
                            <SelectItem value="ipva">Multas</SelectItem>
                            <SelectItem value="CNH">Viagens</SelectItem>
                            <SelectItem value="alvara">
                              Estacionamento
                            </SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-500">
                        Adicionar Receita
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[600px] h-[420px] flex flex-col items-center">
                      <DialogHeader className="mb-5">
                        <DialogTitle className="font-black">
                          Cadastro de Receita
                        </DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-wrap gap-4 w-full justify-center">
                        <div>
                          <label htmlFor="centrocusto">Centro de Custo:</label>
                          <Select name="centrocusto">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Centro de Custo</SelectLabel>
                                <SelectItem value="extintor">
                                  Terceiros
                                </SelectItem>
                                <SelectItem value="ipva">Multas</SelectItem>
                                <SelectItem value="CNH">Viagens</SelectItem>
                                <SelectItem value="alvara">
                                  Estacionamento
                                </SelectItem>
                                <SelectItem value="Outros">Outros</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="referencia">Situação:</label>
                          <Select name="referencia">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione a situação..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Situações</SelectLabel>
                                <SelectItem value="motorista">Pago</SelectItem>
                                <SelectItem value="extintor">
                                  Não pago
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        {formFieldsReceitas.map((field) => (
                          <FormInput
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                          />
                        ))}
                      </div>

                      <DialogFooter className="flex items-center gap-2 mt-10">
                        <Button variant="outline">Fechar</Button>
                        <Button>Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                                <Image
                                  src={editIcon}
                                  alt="Editar"
                                  width={25}
                                  className="hover:scale-110"
                                />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[600px] h-[420px] flex flex-col items-center">
                              <DialogHeader className="mb-5">
                                <DialogTitle className="font-black">
                                  Edição de Receita
                                </DialogTitle>
                              </DialogHeader>

                              <div className="flex flex-wrap gap-4 w-full justify-center">
                                <div>
                                  <label htmlFor="centrocusto">
                                    Centro de Custo:
                                  </label>
                                  <Select name="centrocusto">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Centro de Custo
                                        </SelectLabel>
                                        <SelectItem value="extintor">
                                          Terceiros
                                        </SelectItem>
                                        <SelectItem value="ipva">
                                          Multas
                                        </SelectItem>
                                        <SelectItem value="CNH">
                                          Viagens
                                        </SelectItem>
                                        <SelectItem value="alvara">
                                          Estacionamento
                                        </SelectItem>
                                        <SelectItem value="Outros">
                                          Outros
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label htmlFor="referencia">Situação:</label>
                                  <Select name="referencia">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione a situação..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Situações</SelectLabel>
                                        <SelectItem value="motorista">
                                          Pago
                                        </SelectItem>
                                        <SelectItem value="extintor">
                                          Não pago
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {formFieldsReceitas.map((field) => (
                                  <FormInput
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                  />
                                ))}
                              </div>

                              <DialogFooter className="flex items-center gap-2 mt-10">
                                <Button variant="outline">Fechar</Button>
                                <Button>Salvar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={removeIcon}
                              alt="Remover"
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
