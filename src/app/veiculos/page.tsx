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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export default function Veiculos() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Veículos
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <label htmlFor="prefixo">Prefixo:</label>
                  <Input
                    name="prefixo"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o prefixo..."
                  />
                </div>
                <div>
                  <label htmlFor="placa">Placa:</label>
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
                    Adicionar Veículo
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[900px] h-[520px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Veículo
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    <div className="flex flex-col">
                      <label htmlFor="prefixo">Prefixo:</label>
                      <Input
                        name="prefixo"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o prefixo..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="kmatual">Km Atual:</label>
                      <Input
                        name="kmatual"
                        className="border-2 font-medium w-[250px]"
                        placeholder="Digite a Km atual..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="placa">Placa:</label>
                      <Input
                        name="placa"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número da placa..."
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="marca">Marca:</label>
                      <Input
                        name="marca"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a marca do veículo..."
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="emplacamento">Local Emplacamento:</label>
                      <Input
                        name="emplacamento"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a cidade do emplacamento..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="ufemplacamento">UF Emplacamento:</label>
                      <Input
                        name="ufemplacamento"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o Estado do emplacamento..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="carroceria">Carroceria:</label>
                      <Input
                        name="carroceria"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a carroceria..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="tanque">Capacidade do Tanque:</label>
                      <Input
                        name="tanque"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a capacidade do tanque..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="anoveiculo">Ano Veículo:</label>
                      <Input
                        name="anoveiculo"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o ano do veículo..."
                      />
                    </div>
                    <div className="flex flex-col w-[250px]">
                      <label htmlFor="tipoveiculo">Tipo do Veículo:</label>
                      <Select name="tipoveiculo">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione o tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Veículos</SelectLabel>
                            <SelectItem value="ddsemileito">
                              DD SEMI-LEITO
                            </SelectItem>
                            <SelectItem value="ddleito">DD LEITO</SelectItem>
                            <SelectItem value="minivan">Minivan</SelectItem>
                            <SelectItem value="vangg">VAN GG</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="qtdpoltronas">Qtd. Poltronas:</label>
                      <Input
                        type="number"
                        name="qtdpoltronas"
                        className="border-2 font-medium w-[250px]"
                        placeholder="Digite o número de poltronas..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="modelo">Modelo:</label>
                      <Input
                        name="modelo"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o modelo do veículo..."
                      />
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
                  <TableCell>45654-0</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={editIcon}
                              alt="Editar"
                              width={30}
                              className="hover:scale-110"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[900px] h-[520px] flex flex-col items-center">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Edição de Veículo
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            <div className="flex flex-col">
                              <label htmlFor="prefixo">Prefixo:</label>
                              <Input
                                name="prefixo"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o prefixo..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="kmatual">Km Atual:</label>
                              <Input
                                name="kmatual"
                                className="border-2 font-medium w-[250px]"
                                placeholder="Digite a Km atual..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="placa">Placa:</label>
                              <Input
                                name="placa"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número da placa..."
                              />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="marca">Marca:</label>
                              <Input
                                name="marca"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a marca do veículo..."
                              />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="emplacamento">
                                Local Emplacamento:
                              </label>
                              <Input
                                name="emplacamento"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a cidade do emplacamento..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="ufemplacamento">
                                UF Emplacamento:
                              </label>
                              <Input
                                name="ufemplacamento"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o Estado do emplacamento..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="carroceria">Carroceria:</label>
                              <Input
                                name="carroceria"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a carroceria..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="tanque">
                                Capacidade do Tanque:
                              </label>
                              <Input
                                name="tanque"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a capacidade do tanque..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="anoveiculo">Ano Veículo:</label>
                              <Input
                                name="anoveiculo"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o ano do veículo..."
                              />
                            </div>
                            <div className="flex flex-col w-[250px]">
                              <label htmlFor="tipoveiculo">
                                Tipo do Veículo:
                              </label>
                              <Select name="tipoveiculo">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione o tipo..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Veículos</SelectLabel>
                                    <SelectItem value="ddsemileito">
                                      DD SEMI-LEITO
                                    </SelectItem>
                                    <SelectItem value="ddleito">
                                      DD LEITO
                                    </SelectItem>
                                    <SelectItem value="minivan">
                                      Minivan
                                    </SelectItem>
                                    <SelectItem value="vangg">
                                      VAN GG
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="qtdpoltronas">
                                Qtd. Poltronas:
                              </label>
                              <Input
                                type="number"
                                name="qtdpoltronas"
                                className="border-2 font-medium w-[250px]"
                                placeholder="Digite o número de poltronas..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="modelo">Modelo:</label>
                              <Input
                                name="modelo"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o modelo do veículo..."
                              />
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
                          width={30}
                          className="hover:scale-110"
                        />
                      </Button>
                      <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                        <Image
                          src={documentoIcon}
                          alt="documento"
                          width={30}
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
