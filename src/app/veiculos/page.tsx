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

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formFieldsVeiculos } from "@/lib/objects";
import FormInput from "@/components/form-input";

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
                <DialogContent className="w-[850px] h-[600px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Veículo
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    {formFieldsVeiculos.map((field) => (
                      <FormInput
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    ))}
                    <div>
                      <hr className="border-t border-gray-300 my-2" />
                      <p className="font-bold text-center mb-4">
                        Selecione os Acessorios
                      </p>
                      <ToggleGroup type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                          Ar Condicionado
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="italic"
                          aria-label="Toggle italic"
                        >
                          Extintor
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="strikethrough"
                          aria-label="Toggle strikethrough"
                        >
                          Parabrisas
                        </ToggleGroupItem>
                      </ToggleGroup>
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
                              width={25}
                              className="hover:scale-110"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[850px] h-[600px] flex flex-col items-center">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Edição de Veículo
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            {formFieldsVeiculos.map((field) => (
                              <FormInput
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                              />
                            ))}
                            <div>
                              <hr className="border-t border-gray-300 my-2" />
                              <p className="font-bold text-center mb-4">
                                Selecione os Acessorios
                              </p>
                              <ToggleGroup type="multiple">
                                <ToggleGroupItem
                                  value="bold"
                                  aria-label="Toggle bold"
                                >
                                  Ar Condicionado
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="italic"
                                  aria-label="Toggle italic"
                                >
                                  Extintor
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="strikethrough"
                                  aria-label="Toggle strikethrough"
                                >
                                  Parabrisas
                                </ToggleGroupItem>
                              </ToggleGroup>
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
