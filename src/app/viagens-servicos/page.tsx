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
                <DialogContent className="w-[800px] max-h-[520px] flex flex-col items-center overflow-scroll">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Viagem/Serviço
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-around gap-10">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-center">Dados de Saída</p>
                      <div className="flex flex-col gap-4 w-full justify-center">
                        <div className="flex flex-col">
                          <label htmlFor="ufsaida">UF Saída:</label>
                          <Input
                            name="ufsaida"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o UF de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="cidadesaida">Cidade Saída:</label>
                          <Input
                            name="cidadesaida"
                            className="border-2 font-medium w-[250px]"
                            placeholder="Digite a cidade de saída..."
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <label htmlFor="cidadedestino">
                              Cidade Destino:
                            </label>
                            <Input
                              name="cidadedestino"
                              className="border-2 font-medium text-white w-[250px]"
                              placeholder="Digite a cidade de destino..."
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="localsaida">Local Saída:</label>
                          <Input
                            name="localsaida"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o local de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaida">Data de Saída:</label>
                          <Input
                            name="datasaida"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaida">Horario Saída:</label>
                          <Input
                            name="horariosaida"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaidagaragem">
                            Data de Saída Garagem:
                          </label>
                          <Input
                            name="datasaidagaragem"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaidagaragem">
                            Horario Saída Garagem:
                          </label>
                          <Input
                            name="horariosaidagaragem"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="dataretorno">Data de Retorno:</label>
                          <Input
                            name="dataretorno"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horarioretorno">
                            Horario Retorno:
                          </label>
                          <Input
                            name="horarioretorno"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datachegada">Data de Chegada:</label>
                          <Input
                            name="datachegada"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariochegada">
                            Horario Chegada:
                          </label>
                          <Input
                            name="horariochegada"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="clientesaida">Cliente:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Cliente" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Clientes</SelectLabel>
                                <SelectItem value="1">João</SelectItem>
                                <SelectItem value="2">Pedro</SelectItem>
                                <SelectItem value="2">Angélica</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="servico">Tipo Serviço:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Serviços</SelectLabel>
                                <SelectItem value="1">Serviço 1</SelectItem>
                                <SelectItem value="2">Serviço 2</SelectItem>
                                <SelectItem value="2">Serviço 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tipoviagem">Tipo Viagem:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipo Viagem</SelectLabel>
                                <SelectItem value="1">Tipo 1</SelectItem>
                                <SelectItem value="2">Tipo 2</SelectItem>
                                <SelectItem value="2">Tipo 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="statusviagem">Status Viagem:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status Viagem</SelectLabel>
                                <SelectItem value="1">STATUS 1</SelectItem>
                                <SelectItem value="2">STATUS 2</SelectItem>
                                <SelectItem value="2">STATUS 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="veiculo">Veiculo:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Veículo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Veículos</SelectLabel>
                                <SelectItem value="1">veiculo 1</SelectItem>
                                <SelectItem value="2">veiculo 2</SelectItem>
                                <SelectItem value="2">veiculo 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="motorista">Motorista:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Motorista" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Motoristas</SelectLabel>
                                <SelectItem value="1">Motorista 1</SelectItem>
                                <SelectItem value="2">Motorista 2</SelectItem>
                                <SelectItem value="2">Motorista 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="pagamento">Tipo Pagamento:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipos</SelectLabel>
                                <SelectItem value="1">PIX</SelectItem>
                                <SelectItem value="2">Dinheiro</SelectItem>
                                <SelectItem value="2">Cartão</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="parcelas">Parcelas:</label>
                          <Input
                            name="parcelas"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite a quantidade..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorcontratado">
                            Valor Contratado:
                          </label>
                          <Input
                            type="number"
                            name="valorcontratado"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorpago">Valor Pago:</label>
                          <Input
                            type="number"
                            name="valorpago"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="intinerario">Intinerário:</label>
                          <Textarea
                            name="intinerario"
                            placeholder="Digite aqui..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-center">Dados de Chegada</p>
                      <div className="flex flex-col gap-4 w-full justify-center">
                        <div className="flex flex-col">
                          <label htmlFor="ufchegada">UF Chegada:</label>
                          <Input
                            name="ufchegada"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o UF de chegada..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="cidadechegada">Cidade Chegada:</label>
                          <Input
                            name="cidadechegada"
                            className="border-2 font-medium w-[250px]"
                            placeholder="Digite a cidade da chegada..."
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <label htmlFor="cidadedestino">
                              Cidade Destino:
                            </label>
                            <Input
                              name="cidadedestino"
                              className="border-2 font-medium text-white w-[250px]"
                              placeholder="Digite a cidade de destino..."
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="localsaida">Local Saída:</label>
                          <Input
                            name="localsaida"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o local de saída..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaida">Data de Saída:</label>
                          <Input
                            name="datasaida"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaida">Horario Saída:</label>
                          <Input
                            name="horariosaida"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datasaidagaragem">
                            Data de Saída Garagem:
                          </label>
                          <Input
                            name="datasaidagaragem"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariosaidagaragem">
                            Horario Saída Garagem:
                          </label>
                          <Input
                            name="horariosaidagaragem"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="dataretorno">Data de Retorno:</label>
                          <Input
                            name="dataretorno"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horarioretorno">
                            Horario Retorno:
                          </label>
                          <Input
                            name="horarioretorno"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="datachegada">Data de Chegada:</label>
                          <Input
                            name="datachegada"
                            className="border-2 font-medium w-[250px]"
                            type="date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="horariochegada">
                            Horario Chegada:
                          </label>
                          <Input
                            name="horariochegada"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o horário..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="clientesaida">Cliente:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Cliente" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Clientes</SelectLabel>
                                <SelectItem value="1">João</SelectItem>
                                <SelectItem value="2">Pedro</SelectItem>
                                <SelectItem value="2">Angélica</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="servico">Tipo Serviço:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Serviços</SelectLabel>
                                <SelectItem value="1">Serviço 1</SelectItem>
                                <SelectItem value="2">Serviço 2</SelectItem>
                                <SelectItem value="2">Serviço 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tipoviagem">Tipo Viagem:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipo Viagem</SelectLabel>
                                <SelectItem value="1">Tipo 1</SelectItem>
                                <SelectItem value="2">Tipo 2</SelectItem>
                                <SelectItem value="2">Tipo 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="statusviagem">Status Viagem:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status Viagem</SelectLabel>
                                <SelectItem value="1">STATUS 1</SelectItem>
                                <SelectItem value="2">STATUS 2</SelectItem>
                                <SelectItem value="2">STATUS 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="veiculo">Veiculo:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Veículo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Veículos</SelectLabel>
                                <SelectItem value="1">veiculo 1</SelectItem>
                                <SelectItem value="2">veiculo 2</SelectItem>
                                <SelectItem value="2">veiculo 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="motorista">Motorista:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Motorista" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Motoristas</SelectLabel>
                                <SelectItem value="1">Motorista 1</SelectItem>
                                <SelectItem value="2">Motorista 2</SelectItem>
                                <SelectItem value="2">Motorista 3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="pagamento">Tipo Pagamento:</label>
                          <Select>
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Selecione o Pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipos</SelectLabel>
                                <SelectItem value="1">PIX</SelectItem>
                                <SelectItem value="2">Dinheiro</SelectItem>
                                <SelectItem value="2">Cartão</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="parcelas">Parcelas:</label>
                          <Input
                            name="parcelas"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite a quantidade..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorcontratado">
                            Valor Contratado:
                          </label>
                          <Input
                            type="number"
                            name="valorcontratado"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="valorpago">Valor Pago:</label>
                          <Input
                            type="number"
                            name="valorpago"
                            className="border-2 font-medium text-white w-[250px]"
                            placeholder="Digite o valor..."
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="intinerario">Intinerário:</label>
                          <Textarea
                            name="intinerario"
                            placeholder="Digite aqui..."
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
                        <DialogContent className="w-[800px] max-h-[520px] flex flex-col items-center overflow-scroll">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Edição de Viagem/Serviço
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center justify-around gap-10">
                            <div className="flex flex-col gap-2">
                              <p className="font-bold text-center">
                                Dados de Saída
                              </p>
                              <div className="flex flex-col gap-4 w-full justify-center">
                                <div className="flex flex-col">
                                  <label htmlFor="ufsaida">UF Saída:</label>
                                  <Input
                                    name="ufsaida"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o UF de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="cidadesaida">
                                    Cidade Saída:
                                  </label>
                                  <Input
                                    name="cidadesaida"
                                    className="border-2 font-medium w-[250px]"
                                    placeholder="Digite a cidade de saída..."
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-col">
                                    <label htmlFor="cidadedestino">
                                      Cidade Destino:
                                    </label>
                                    <Input
                                      name="cidadedestino"
                                      className="border-2 font-medium text-white w-[250px]"
                                      placeholder="Digite a cidade de destino..."
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="localsaida">
                                    Local Saída:
                                  </label>
                                  <Input
                                    name="localsaida"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o local de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaida">
                                    Data de Saída:
                                  </label>
                                  <Input
                                    name="datasaida"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaida">
                                    Horario Saída:
                                  </label>
                                  <Input
                                    name="horariosaida"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaidagaragem">
                                    Data de Saída Garagem:
                                  </label>
                                  <Input
                                    name="datasaidagaragem"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaidagaragem">
                                    Horario Saída Garagem:
                                  </label>
                                  <Input
                                    name="horariosaidagaragem"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="dataretorno">
                                    Data de Retorno:
                                  </label>
                                  <Input
                                    name="dataretorno"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horarioretorno">
                                    Horario Retorno:
                                  </label>
                                  <Input
                                    name="horarioretorno"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datachegada">
                                    Data de Chegada:
                                  </label>
                                  <Input
                                    name="datachegada"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariochegada">
                                    Horario Chegada:
                                  </label>
                                  <Input
                                    name="horariochegada"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="clientesaida">Cliente:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Clientes</SelectLabel>
                                        <SelectItem value="1">João</SelectItem>
                                        <SelectItem value="2">Pedro</SelectItem>
                                        <SelectItem value="2">
                                          Angélica
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="servico">Tipo Serviço:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Serviço" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Serviços</SelectLabel>
                                        <SelectItem value="1">
                                          Serviço 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Serviço 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Serviço 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tipoviagem">
                                    Tipo Viagem:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Tipo Viagem</SelectLabel>
                                        <SelectItem value="1">
                                          Tipo 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Tipo 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Tipo 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="statusviagem">
                                    Status Viagem:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status Viagem</SelectLabel>
                                        <SelectItem value="1">
                                          STATUS 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          STATUS 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          STATUS 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="veiculo">Veiculo:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Veículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Veículos</SelectLabel>
                                        <SelectItem value="1">
                                          veiculo 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          veiculo 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          veiculo 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="motorista">Motorista:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Motorista" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Motoristas</SelectLabel>
                                        <SelectItem value="1">
                                          Motorista 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Motorista 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Motorista 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="pagamento">
                                    Tipo Pagamento:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Pagamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Tipos</SelectLabel>
                                        <SelectItem value="1">PIX</SelectItem>
                                        <SelectItem value="2">
                                          Dinheiro
                                        </SelectItem>
                                        <SelectItem value="2">
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
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite a quantidade..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorcontratado">
                                    Valor Contratado:
                                  </label>
                                  <Input
                                    type="number"
                                    name="valorcontratado"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorpago">Valor Pago:</label>
                                  <Input
                                    type="number"
                                    name="valorpago"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="intinerario">
                                    Intinerário:
                                  </label>
                                  <Textarea
                                    name="intinerario"
                                    placeholder="Digite aqui..."
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="font-bold text-center">
                                Dados de Chegada
                              </p>
                              <div className="flex flex-col gap-4 w-full justify-center">
                                <div className="flex flex-col">
                                  <label htmlFor="ufchegada">UF Chegada:</label>
                                  <Input
                                    name="ufchegada"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o UF de chegada..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="cidadechegada">
                                    Cidade Chegada:
                                  </label>
                                  <Input
                                    name="cidadechegada"
                                    className="border-2 font-medium w-[250px]"
                                    placeholder="Digite a cidade da chegada..."
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-col">
                                    <label htmlFor="cidadedestino">
                                      Cidade Destino:
                                    </label>
                                    <Input
                                      name="cidadedestino"
                                      className="border-2 font-medium text-white w-[250px]"
                                      placeholder="Digite a cidade de destino..."
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="localsaida">
                                    Local Saída:
                                  </label>
                                  <Input
                                    name="localsaida"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o local de saída..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaida">
                                    Data de Saída:
                                  </label>
                                  <Input
                                    name="datasaida"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaida">
                                    Horario Saída:
                                  </label>
                                  <Input
                                    name="horariosaida"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datasaidagaragem">
                                    Data de Saída Garagem:
                                  </label>
                                  <Input
                                    name="datasaidagaragem"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariosaidagaragem">
                                    Horario Saída Garagem:
                                  </label>
                                  <Input
                                    name="horariosaidagaragem"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="dataretorno">
                                    Data de Retorno:
                                  </label>
                                  <Input
                                    name="dataretorno"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horarioretorno">
                                    Horario Retorno:
                                  </label>
                                  <Input
                                    name="horarioretorno"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="datachegada">
                                    Data de Chegada:
                                  </label>
                                  <Input
                                    name="datachegada"
                                    className="border-2 font-medium w-[250px]"
                                    type="date"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="horariochegada">
                                    Horario Chegada:
                                  </label>
                                  <Input
                                    name="horariochegada"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o horário..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="clientesaida">Cliente:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Clientes</SelectLabel>
                                        <SelectItem value="1">João</SelectItem>
                                        <SelectItem value="2">Pedro</SelectItem>
                                        <SelectItem value="2">
                                          Angélica
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="servico">Tipo Serviço:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Serviço" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Serviços</SelectLabel>
                                        <SelectItem value="1">
                                          Serviço 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Serviço 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Serviço 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="tipoviagem">
                                    Tipo Viagem:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Tipo Viagem</SelectLabel>
                                        <SelectItem value="1">
                                          Tipo 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Tipo 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Tipo 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="statusviagem">
                                    Status Viagem:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status Viagem</SelectLabel>
                                        <SelectItem value="1">
                                          STATUS 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          STATUS 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          STATUS 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="veiculo">Veiculo:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Veículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Veículos</SelectLabel>
                                        <SelectItem value="1">
                                          veiculo 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          veiculo 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          veiculo 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="motorista">Motorista:</label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Motorista" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Motoristas</SelectLabel>
                                        <SelectItem value="1">
                                          Motorista 1
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Motorista 2
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Motorista 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="pagamento">
                                    Tipo Pagamento:
                                  </label>
                                  <Select>
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Selecione o Pagamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Tipos</SelectLabel>
                                        <SelectItem value="1">PIX</SelectItem>
                                        <SelectItem value="2">
                                          Dinheiro
                                        </SelectItem>
                                        <SelectItem value="2">
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
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite a quantidade..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorcontratado">
                                    Valor Contratado:
                                  </label>
                                  <Input
                                    type="number"
                                    name="valorcontratado"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="valorpago">Valor Pago:</label>
                                  <Input
                                    type="number"
                                    name="valorpago"
                                    className="border-2 font-medium text-white w-[250px]"
                                    placeholder="Digite o valor..."
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label htmlFor="intinerario">
                                    Intinerário:
                                  </label>
                                  <Textarea
                                    name="intinerario"
                                    placeholder="Digite aqui..."
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
