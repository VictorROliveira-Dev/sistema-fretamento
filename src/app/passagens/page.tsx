import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import passageirosIcon from "@/app/assets/passageiros.svg";

import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formFieldsPassagens } from "@/lib/objects";
import Image from "next/image";

import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BusSelector from "@/components/bus-selector";

export default function Passagens() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1100px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">Lista Passagens</p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:w-[1000px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Busque a Viagem:
                </label>
                <Select name="tipo">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecione a viagem..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Viagens</SelectLabel>
                      <SelectItem value="v1">Salvador </SelectItem>
                      <SelectItem value="v2">Santa Cruz</SelectItem>
                      <SelectItem value="v3">Ilhéus</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </form>
              <div className="flex items-center justify-between">
                <div className="w-[500px] h-[60px] border p-2 rounded-md">
                  <p>
                    <strong>ORIGEM:</strong> Salvador/BA -{" "}
                    <strong>DESTINO:</strong> Santa Cruz. -{" "}
                    <strong>DT. PARTIDA:</strong> 20/05/2024
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Passagem
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Passagem
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    <div>
                      <label htmlFor="passageiro">Passageiro:</label>
                      <Select name="passageiro">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione o passageiro..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Passageiros</SelectLabel>
                            <SelectItem value="v1">João</SelectItem>
                            <SelectItem value="v2">Miguel</SelectItem>
                            <SelectItem value="v3">Angélica</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="viagem">Viagem:</label>
                      <Select name="viagem">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione a viagem..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Viagens</SelectLabel>
                            <SelectItem value="v1">Salvador </SelectItem>
                            <SelectItem value="v2">Santa Cruz</SelectItem>
                            <SelectItem value="v3">Ilhéus</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="pagamento">Tipo Pagamento:</label>
                      <Select name="pagamento">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione o tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Pagamentos</SelectLabel>
                            <SelectItem value="v1">PIX</SelectItem>
                            <SelectItem value="v2">Cartão Crédito</SelectItem>
                            <SelectItem value="v3">Cartão Débito</SelectItem>
                            <SelectItem value="v3">Dinheiro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="situacao">Situação:</label>
                      <Select name="situacao">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione a situação..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Situações</SelectLabel>
                            <SelectItem value="v1">Pago</SelectItem>
                            <SelectItem value="v2">Pendente</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {formFieldsPassagens.map((field) => (
                      <FormInput
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>

                  <BusSelector />

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
                    Viagem
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Qtd. Passgeiros
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Saída
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Retorno
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Valor Total
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
                        <DialogContent className="w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Edição de Passagem
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            <div>
                              <label htmlFor="passageiro">Passageiro:</label>
                              <Select name="passageiro">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione o passageiro..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Passageiros</SelectLabel>
                                    <SelectItem value="v1">João</SelectItem>
                                    <SelectItem value="v2">Miguel</SelectItem>
                                    <SelectItem value="v3">Angélica</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label htmlFor="viagem">Viagem:</label>
                              <Select name="viagem">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione a viagem..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Viagens</SelectLabel>
                                    <SelectItem value="v1">
                                      Salvador{" "}
                                    </SelectItem>
                                    <SelectItem value="v2">
                                      Santa Cruz
                                    </SelectItem>
                                    <SelectItem value="v3">Ilhéus</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label htmlFor="pagamento">Tipo Pagamento:</label>
                              <Select name="pagamento">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione o tipo..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Pagamentos</SelectLabel>
                                    <SelectItem value="v1">PIX</SelectItem>
                                    <SelectItem value="v2">
                                      Cartão Crédito
                                    </SelectItem>
                                    <SelectItem value="v3">
                                      Cartão Débito
                                    </SelectItem>
                                    <SelectItem value="v3">Dinheiro</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label htmlFor="situacao">Situação:</label>
                              <Select name="situacao">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione a situação..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Situações</SelectLabel>
                                    <SelectItem value="v1">Pago</SelectItem>
                                    <SelectItem value="v2">Pendente</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            {formFieldsPassagens.map((field) => (
                              <FormInput
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                              />
                            ))}
                          </div>

                          <BusSelector />

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
                          src={dadosViagemIcon}
                          alt="Dados"
                          width={25}
                          className="hover:scale-110"
                        />
                      </Button>
                      <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                        <Image
                          src={passageirosIcon}
                          alt="Passageiros"
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
