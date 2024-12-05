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

export default function Fornecedores() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1200px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Fornecedores
          </p>
        </div>
        <div className="flex items-center h-[800px]">
          <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <label htmlFor="fantasia">Fantasia:</label>
                  <Input
                    name="fantasia"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o apelido..."
                  />
                </div>
                <div>
                  <label htmlFor="cnpj">CNPJ:</label>
                  <Input
                    name="cnpj"
                    className="border-2 font-medium text-white w-[250px]"
                    placeholder="Digite o CNPJ..."
                  />
                </div>
              </form>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Fornecedor
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[900px] h-[520px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Fornecedor
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    <div className="flex flex-col">
                      <label htmlFor="nomecompleto">Nome Completo:</label>
                      <Input
                        name="nomecompleto"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o nome completo..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="datanascimento">Data Nascimento:</label>
                      <Input
                        name="datanascimento"
                        className="border-2 font-medium w-[250px]"
                        type="date"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <label htmlFor="documento">Documento:</label>
                        <Input
                          name="documento"
                          className="border-2 font-medium text-white w-[250px]"
                          placeholder="Digite o número do documento..."
                        />
                      </div>
                      <RadioGroup defaultValue="rg" className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="comfortable" id="r2" />
                          <label htmlFor="r2">RG</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compact" id="r3" />
                          <label htmlFor="r3">CNH</label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="cpf">CPF:</label>
                      <Input
                        name="cpf"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número do CPF..."
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="cidade">Cidade:</label>
                      <Input
                        name="cidade"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a cidade e estado..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="uf">UF:</label>
                      <Input
                        name="uf"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o Estado..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="rua">Rua:</label>
                      <Input
                        name="rua"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite a rua..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="rua">Bairro:</label>
                      <Input
                        name="rua"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o bairro..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="numero">Número:</label>
                      <Input
                        name="numero"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número..."
                      />
                    </div>
                    <div className="flex flex-col w-[250px] items-center">
                      <label htmlFor="banco">Tipo de Pessoa:</label>
                      <RadioGroup defaultValue="fisica" className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fisica" id="fisica" />
                          <label htmlFor="fisica">Física</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="juridica" id="r2" />
                          <label htmlFor="juridica">Jurídica</label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="telefone">Telefone:</label>
                      <Input
                        name="telefone"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o telefone.."
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
                    Nome Completo
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Data Nascimento
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Documento
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Endereço
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    UF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Tipo Pessoa
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
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
                              Edição de Fornecedor
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            <div className="flex flex-col">
                              <label htmlFor="nomecompleto">
                                Nome Completo:
                              </label>
                              <Input
                                name="nomecompleto"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o nome completo..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="datanascimento">
                                Data Nascimento:
                              </label>
                              <Input
                                name="datanascimento"
                                className="border-2 font-medium w-[250px]"
                                type="date"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <label htmlFor="documento">Documento:</label>
                                <Input
                                  name="documento"
                                  className="border-2 font-medium text-white w-[250px]"
                                  placeholder="Digite o número do documento..."
                                />
                              </div>
                              <RadioGroup defaultValue="rg" className="flex">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="comfortable" id="r2" />
                                  <label htmlFor="r2">RG</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="compact" id="r3" />
                                  <label htmlFor="r3">CNH</label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="cpf">CPF:</label>
                              <Input
                                name="cpf"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número do CPF..."
                              />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="cidade">Cidade:</label>
                              <Input
                                name="cidade"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a cidade e estado..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="uf">UF:</label>
                              <Input
                                name="uf"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o Estado..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="rua">Rua:</label>
                              <Input
                                name="rua"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite a rua..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="rua">Bairro:</label>
                              <Input
                                name="rua"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o bairro..."
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="numero">Número:</label>
                              <Input
                                name="numero"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número..."
                              />
                            </div>
                            <div className="flex flex-col w-[250px] items-center">
                              <label htmlFor="banco">Tipo de Pessoa:</label>
                              <RadioGroup
                                defaultValue="fisica"
                                className="flex"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="fisica" id="fisica" />
                                  <label htmlFor="fisica">Física</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="juridica" id="r2" />
                                  <label htmlFor="juridica">Jurídica</label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="telefone">Telefone:</label>
                              <Input
                                name="telefone"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o telefone.."
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
