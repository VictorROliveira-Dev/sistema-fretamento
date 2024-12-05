import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/documentos.svg";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Manutencoes() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Manutencoes
          </p>
        </div>
        <div className="flex items-center h-[800px]">
          <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <label htmlFor="prefixo">Manutenção/Serviço:</label>
                  <Input
                    name="prefixo"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o nome..."
                  />
                </div>
                <div>
                  <label htmlFor="placa">Veículo:</label>
                  <Input
                    name="placa"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite a placa..."
                  />
                </div>
              </form>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Manutenção/Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[900px] h-[450px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Manutenção/Serviço
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    <div className="flex flex-col">
                      <label htmlFor="manutencao">Manutenção/Serviço:</label>
                      <Input
                        name="manutencao"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o nome..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="veiculo">Veículo:</label>
                      <Input
                        name="veiculo"
                        className="border-2 font-medium w-[250px]"
                        placeholder="Digite a placa..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="datavencimento">Data Vencimento:</label>
                      <Input
                        type="date"
                        name="datavencimento"
                        className="border-2 font-medium w-[250px]"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="responsavel">Responsável:</label>
                      <Input
                        name="responsavel"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o nome..."
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="kmprevista">KM Prevista:</label>
                      <Input
                        type="number"
                        name="kmprevista"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="kmatual">KM Atual:</label>
                      <Input
                        type="number"
                        name="kmatual"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número..."
                      />
                    </div>
                    <div className="flex flex-col w-[250px]">
                      <label htmlFor="situacao">Situação:</label>
                      <Select name="situacao">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione a situação..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Situações</SelectLabel>
                            <SelectItem value="s1">Realizada</SelectItem>
                            <SelectItem value="s2">Prevista</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
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
                    Manutenção/Serviço
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Veículo
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    KM Atual
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Km Prevista
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Vencimento
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Responsável
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
                  <TableCell>00123493411</TableCell>
                  <TableCell>456-7</TableCell>
                  <TableCell>45654-0</TableCell>
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
                        <DialogContent className="w-[900px] h-[450px] flex flex-col items-center">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Edição de Manutenção/Serviço
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            <div className="flex flex-col">
                              <label htmlFor="manutencao">
                                Manutenção/Serviço:
                              </label>
                              <Input
                                name="manutencao"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o nome..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="veiculo">Veículo:</label>
                              <Input
                                name="veiculo"
                                className="border-2 font-medium w-[250px]"
                                placeholder="Digite a placa..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="datavencimento">
                                Data Vencimento:
                              </label>
                              <Input
                                type="date"
                                name="datavencimento"
                                className="border-2 font-medium w-[250px]"
                              />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="responsavel">Responsável:</label>
                              <Input
                                name="responsavel"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o nome..."
                              />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="kmprevista">KM Prevista:</label>
                              <Input
                                type="number"
                                name="kmprevista"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="kmatual">KM Atual:</label>
                              <Input
                                type="number"
                                name="kmatual"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número..."
                              />
                            </div>
                            <div className="flex flex-col w-[250px]">
                              <label htmlFor="situacao">Situação:</label>
                              <Select name="situacao">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione a situação..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Situações</SelectLabel>
                                    <SelectItem value="s1">
                                      Realizada
                                    </SelectItem>
                                    <SelectItem value="s2">Prevista</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
