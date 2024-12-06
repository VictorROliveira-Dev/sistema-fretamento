import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/documentos.svg";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";

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
import { Textarea } from "@/components/ui/textarea";

export default function ViagensServicos() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1400px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Viagens/Serviços
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <label htmlFor="fantasia">Localizar Viagem:</label>
                  <Input
                    name="fantasia"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o identificador..."
                  />
                </div>
                <div>
                  <label htmlFor="cnpj">Veículo:</label>
                  <Input
                    name="cnpj"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o veículo..."
                  />
                </div>
              </form>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Viagem/Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[1200px] max-h-[520px] flex flex-col items-center overflow-scroll">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Viagem/Serviço
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-bold text-center mb-4">
                        Dados de Saída
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="ufsaida">UF Saída:</label>
                          <Input
                            name="ufsaida"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o UF de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="cidadesaida">Cidade Saída:</label>
                          <Input
                            name="cidadesaida"
                            className="border-2 font-medium w-full"
                            placeholder="Digite a cidade de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="localsaida">Local Saída:</label>
                          <Input
                            name="localsaida"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o local de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaida">Data de Saída:</label>
                          <Input
                            name="datasaida"
                            className="border-2 font-medium w-full"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaida">Horário Saída:</label>
                          <Input
                            name="horariosaida"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaidagaragem">
                            Data Saída Garagem:
                          </label>
                          <Input
                            name="datasaidagaragem"
                            className="border-2 font-medium w-full"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tipoviagem">Tipo de Viagem:</label>
                          <Select name="tipoviagem">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Viagens</SelectLabel>
                                <SelectItem value="v1">Viagem 1</SelectItem>
                                <SelectItem value="v2">Viagem 2</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tiposervico">Tipo de Serviço:</label>
                          <Select name="tiposervico">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Serviços</SelectLabel>
                                <SelectItem value="s1">Serviço 1</SelectItem>
                                <SelectItem value="s2">Serviço 2</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <hr className="border-t border-2 border-black my-4" />
                      <p className="font-bold text-center mt-4">
                        Veículos, Motoristas e Clientes
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <label htmlFor="veiculo">Veículo:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o veículo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Veículos Disponíveis</SelectLabel>
                                <SelectItem value="veiculo1">
                                  Ônibus 1
                                </SelectItem>
                                <SelectItem value="veiculo2">
                                  Ônibus 2
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="motorista">Motorista:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o motorista" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Motoristas Disponíveis
                                </SelectLabel>
                                <SelectItem value="motorista1">João</SelectItem>
                                <SelectItem value="motorista2">
                                  Maria
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="clientes">Clientes:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Clientes</SelectLabel>
                                <SelectItem value="motorista1">João</SelectItem>
                                <SelectItem value="motorista2">
                                  Maria
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="observacoes">Intinerário:</label>
                          <Textarea
                            name="observacoes"
                            className="border-2 font-medium w-full h-20 resize-none"
                            placeholder="Adicione observações sobre a viagem..."
                          />
                        </div>
                      </div>

                      <hr className="border-t border-2 border-black my-4" />
                      <p className="font-bold text-center mt-4">Valores</p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <label htmlFor="tipopagamento">Tipo Pagamento:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Pagamentos</SelectLabel>
                                <SelectItem value="veiculo1">PIX</SelectItem>
                                <SelectItem value="veiculo2">
                                  Dinheiro
                                </SelectItem>
                                <SelectItem value="veiculo2">Cartão</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="parcelas">Parcelas:</label>
                          <Input
                            name="parcelas"
                            placeholder="Digite o número de parcelas..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorcontratado">
                            Valor Contratado:
                          </label>
                          <Input
                            type="number"
                            name="valorcontratado"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorpago">Valor Pago:</label>
                          <Input
                            type="number"
                            name="valorpago"
                            placeholder="Digite o valor..."
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold text-center mb-4">
                        Dados de Chegada
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="ufchegada">UF Chegada:</label>
                          <Input
                            name="ufchegada"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o UF de chegada..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="cidadesaida">Cidade Saída:</label>
                          <Input
                            name="cidadesaida"
                            className="border-2 font-medium w-full"
                            placeholder="Digite a cidade de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="localsaida">Local Saída:</label>
                          <Input
                            name="localsaida"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o local de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaida">Data de Saída:</label>
                          <Input
                            name="datasaida"
                            className="border-2 font-medium w-full"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaida">Horário Saída:</label>
                          <Input
                            name="horariosaida"
                            className="border-2 font-medium text-white w-full"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaidagaragem">
                            Data Saída Garagem:
                          </label>
                          <Input
                            name="datasaidagaragem"
                            className="border-2 font-medium w-full"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tipoviagem">Tipo de Viagem:</label>
                          <Select name="tipoviagem">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Viagens</SelectLabel>
                                <SelectItem value="v1">Viagem 1</SelectItem>
                                <SelectItem value="v2">Viagem 2</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tiposervico">Tipo de Serviço:</label>
                          <Select name="tiposervico">
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o tipo..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Serviços</SelectLabel>
                                <SelectItem value="s1">Serviço 1</SelectItem>
                                <SelectItem value="s2">Serviço 2</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <hr className="border-t border-2 border-black my-4" />
                      <p className="font-bold text-center mt-4">
                        Veículos, Motoristas e Clientes
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <label htmlFor="veiculo">Veículo:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o veículo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Veículos Disponíveis</SelectLabel>
                                <SelectItem value="veiculo1">
                                  Ônibus 1
                                </SelectItem>
                                <SelectItem value="veiculo2">
                                  Ônibus 2
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="motorista">Motorista:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o motorista" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Motoristas Disponíveis
                                </SelectLabel>
                                <SelectItem value="motorista1">João</SelectItem>
                                <SelectItem value="motorista2">
                                  Maria
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="clientes">Clientes:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Clientes</SelectLabel>
                                <SelectItem value="motorista1">João</SelectItem>
                                <SelectItem value="motorista2">
                                  Maria
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="observacoes">Intinerário:</label>
                          <Textarea
                            name="observacoes"
                            className="border-2 font-medium w-full h-20 resize-none"
                            placeholder="Adicione observações sobre a viagem..."
                          />
                        </div>
                      </div>

                      <hr className="border-t border-2 border-black my-4" />
                      <p className="font-bold text-center mt-4">Valores</p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <label htmlFor="tipopagamento">Tipo Pagamento:</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Pagamentos</SelectLabel>
                                <SelectItem value="veiculo1">PIX</SelectItem>
                                <SelectItem value="veiculo2">
                                  Dinheiro
                                </SelectItem>
                                <SelectItem value="veiculo2">Cartão</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="parcelas">Parcelas:</label>
                          <Input
                            name="parcelas"
                            placeholder="Digite o número de parcelas..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorcontratado">
                            Valor Contratado:
                          </label>
                          <Input
                            type="number"
                            name="valorcontratado"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorpago">Valor Pago:</label>
                          <Input
                            type="number"
                            name="valorpago"
                            placeholder="Digite o valor..."
                          />
                        </div>
                      </div>
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
                    UF Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Veículo
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Motorista
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    UF Destino
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade Destino
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Chegada
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Tipo Pagamento
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Valor Contratado
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Status Viagem
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
                  <TableCell>45654-0</TableCell>
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
                              width={25}
                              className="hover:scale-110"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[1200px] max-h-[520px] flex flex-col items-center overflow-scroll">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Cadastro de Viagem/Serviço
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="font-bold text-center mb-4">
                                Dados de Saída
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                  <label htmlFor="ufsaida">UF Saída:</label>
                                  <Input
                                    name="ufsaida"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o UF de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="cidadesaida">
                                    Cidade Saída:
                                  </label>
                                  <Input
                                    name="cidadesaida"
                                    className="border-2 font-medium w-full"
                                    placeholder="Digite a cidade de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="localsaida">
                                    Local Saída:
                                  </label>
                                  <Input
                                    name="localsaida"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o local de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaida">
                                    Data de Saída:
                                  </label>
                                  <Input
                                    name="datasaida"
                                    className="border-2 font-medium w-full"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaida">
                                    Horário Saída:
                                  </label>
                                  <Input
                                    name="horariosaida"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaidagaragem">
                                    Data Saída Garagem:
                                  </label>
                                  <Input
                                    name="datasaidagaragem"
                                    className="border-2 font-medium w-full"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tipoviagem">
                                    Tipo de Viagem:
                                  </label>
                                  <Select name="tipoviagem">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o tipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Viagens</SelectLabel>
                                        <SelectItem value="v1">
                                          Viagem 1
                                        </SelectItem>
                                        <SelectItem value="v2">
                                          Viagem 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tiposervico">
                                    Tipo de Serviço:
                                  </label>
                                  <Select name="tiposervico">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o tipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Serviços</SelectLabel>
                                        <SelectItem value="s1">
                                          Serviço 1
                                        </SelectItem>
                                        <SelectItem value="s2">
                                          Serviço 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <hr className="border-t border-2 border-black my-4" />
                              <p className="font-bold text-center mt-4">
                                Veículos, Motoristas e Clientes
                              </p>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col">
                                  <label htmlFor="veiculo">Veículo:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o veículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Veículos Disponíveis
                                        </SelectLabel>
                                        <SelectItem value="veiculo1">
                                          Ônibus 1
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Ônibus 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="motorista">Motorista:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o motorista" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Motoristas Disponíveis
                                        </SelectLabel>
                                        <SelectItem value="motorista1">
                                          João
                                        </SelectItem>
                                        <SelectItem value="motorista2">
                                          Maria
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="clientes">Clientes:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Clientes</SelectLabel>
                                        <SelectItem value="motorista1">
                                          João
                                        </SelectItem>
                                        <SelectItem value="motorista2">
                                          Maria
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="observacoes">
                                    Intinerário:
                                  </label>
                                  <Textarea
                                    name="observacoes"
                                    className="border-2 font-medium w-full h-20 resize-none"
                                    placeholder="Adicione observações sobre a viagem..."
                                  />
                                </div>
                              </div>

                              <hr className="border-t border-2 border-black my-4" />
                              <p className="font-bold text-center mt-4">
                                Valores
                              </p>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col">
                                  <label htmlFor="tipopagamento">
                                    Tipo Pagamento:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Pagamentos</SelectLabel>
                                        <SelectItem value="veiculo1">
                                          PIX
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Dinheiro
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Cartão
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="parcelas">Parcelas:</label>
                                  <Input
                                    name="parcelas"
                                    placeholder="Digite o número de parcelas..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorcontratado">
                                    Valor Contratado:
                                  </label>
                                  <Input
                                    type="number"
                                    name="valorcontratado"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorpago">Valor Pago:</label>
                                  <Input
                                    type="number"
                                    name="valorpago"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="font-bold text-center mb-4">
                                Dados de Chegada
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                  <label htmlFor="ufchegada">UF Chegada:</label>
                                  <Input
                                    name="ufchegada"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o UF de chegada..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="cidadesaida">
                                    Cidade Saída:
                                  </label>
                                  <Input
                                    name="cidadesaida"
                                    className="border-2 font-medium w-full"
                                    placeholder="Digite a cidade de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="localsaida">
                                    Local Saída:
                                  </label>
                                  <Input
                                    name="localsaida"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o local de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaida">
                                    Data de Saída:
                                  </label>
                                  <Input
                                    name="datasaida"
                                    className="border-2 font-medium w-full"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaida">
                                    Horário Saída:
                                  </label>
                                  <Input
                                    name="horariosaida"
                                    className="border-2 font-medium text-white w-full"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaidagaragem">
                                    Data Saída Garagem:
                                  </label>
                                  <Input
                                    name="datasaidagaragem"
                                    className="border-2 font-medium w-full"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tipoviagem">
                                    Tipo de Viagem:
                                  </label>
                                  <Select name="tipoviagem">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o tipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Viagens</SelectLabel>
                                        <SelectItem value="v1">
                                          Viagem 1
                                        </SelectItem>
                                        <SelectItem value="v2">
                                          Viagem 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tiposervico">
                                    Tipo de Serviço:
                                  </label>
                                  <Select name="tiposervico">
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o tipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Serviços</SelectLabel>
                                        <SelectItem value="s1">
                                          Serviço 1
                                        </SelectItem>
                                        <SelectItem value="s2">
                                          Serviço 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <hr className="border-t border-2 border-black my-4" />
                              <p className="font-bold text-center mt-4">
                                Veículos, Motoristas e Clientes
                              </p>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col">
                                  <label htmlFor="veiculo">Veículo:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o veículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Veículos Disponíveis
                                        </SelectLabel>
                                        <SelectItem value="veiculo1">
                                          Ônibus 1
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Ônibus 2
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="motorista">Motorista:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o motorista" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          Motoristas Disponíveis
                                        </SelectLabel>
                                        <SelectItem value="motorista1">
                                          João
                                        </SelectItem>
                                        <SelectItem value="motorista2">
                                          Maria
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="clientes">Clientes:</label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Clientes</SelectLabel>
                                        <SelectItem value="motorista1">
                                          João
                                        </SelectItem>
                                        <SelectItem value="motorista2">
                                          Maria
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="observacoes">
                                    Intinerário:
                                  </label>
                                  <Textarea
                                    name="observacoes"
                                    className="border-2 font-medium w-full h-20 resize-none"
                                    placeholder="Adicione observações sobre a viagem..."
                                  />
                                </div>
                              </div>

                              <hr className="border-t border-2 border-black my-4" />
                              <p className="font-bold text-center mt-4">
                                Valores
                              </p>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col">
                                  <label htmlFor="tipopagamento">
                                    Tipo Pagamento:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Pagamentos</SelectLabel>
                                        <SelectItem value="veiculo1">
                                          PIX
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Dinheiro
                                        </SelectItem>
                                        <SelectItem value="veiculo2">
                                          Cartão
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="parcelas">Parcelas:</label>
                                  <Input
                                    name="parcelas"
                                    placeholder="Digite o número de parcelas..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorcontratado">
                                    Valor Contratado:
                                  </label>
                                  <Input
                                    type="number"
                                    name="valorcontratado"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorpago">Valor Pago:</label>
                                  <Input
                                    type="number"
                                    name="valorpago"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                              </div>
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
                      <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                        <Image
                          src={dadosViagemIcon}
                          alt="dados"
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
