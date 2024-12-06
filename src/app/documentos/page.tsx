import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
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
import { formFieldsDocumentos } from "@/lib/objects";
import Image from "next/image";

export default function Documentos() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Documentos
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <label htmlFor="name">Doc/Certificado:</label>
                  <Select name="tipo">
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione o doc/certificado..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="extintor">Extintor</SelectItem>
                        <SelectItem value="ipva">IPVA</SelectItem>
                        <SelectItem value="CNH">CNH</SelectItem>
                        <SelectItem value="alvara">Alvará</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="tipo">Tipo:</label>
                  <Select name="tipo">
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="extintor">Interestadual</SelectItem>
                        <SelectItem value="ipva">Intermunicipal</SelectItem>
                        <SelectItem value="alvara">
                          Outros/CNH/IPVA/Extintor
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </form>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[600px] h-[380px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Documento
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    <div>
                      <label htmlFor="tipo">Doc/Certificado:</label>
                      <Select name="tipo">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione o tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipos</SelectLabel>
                            <SelectItem value="extintor">Extintor</SelectItem>
                            <SelectItem value="ipva">IPVA</SelectItem>
                            <SelectItem value="CNH">CNH</SelectItem>
                            <SelectItem value="alvara">Alvará</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="referencia">Referência:</label>
                      <Select name="referencia">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione a Referência..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Referências</SelectLabel>
                            <SelectItem value="motorista">João</SelectItem>
                            <SelectItem value="extintor">
                              ABC-1234 (1234)
                            </SelectItem>
                            <SelectItem value="ipva">Empresa X tur</SelectItem>
                            <SelectItem value="CNH">AAA-5555 (5555)</SelectItem>
                            <SelectItem value="alvara">João Guedes</SelectItem>
                            <SelectItem value="Outros">
                              Empresa Y TUR
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="tipo">Tipo:</label>
                      <Select name="tipo">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Selecione o tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipos</SelectLabel>
                            <SelectItem value="interestadual">
                              Interestadual
                            </SelectItem>
                            <SelectItem value="intermunicipal">
                              Intermunicipal
                            </SelectItem>
                            <SelectItem value="outros">
                              Outros/CNH/IPVA/Extintor
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {formFieldsDocumentos.map((field) => (
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
                    Referência
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Doc/Certificado
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Tipo
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
                        <DialogContent className="w-[600px] h-[380px] flex flex-col items-center">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Cadastro de Documento
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            <div>
                              <label htmlFor="documento">
                                Doc/Certificado:
                              </label>
                              <Select name="documento">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione o doc/certificado..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Documentos</SelectLabel>
                                    <SelectItem value="extintor">
                                      Extintor
                                    </SelectItem>
                                    <SelectItem value="ipva">IPVA</SelectItem>
                                    <SelectItem value="CNH">CNH</SelectItem>
                                    <SelectItem value="alvara">
                                      Alvará
                                    </SelectItem>
                                    <SelectItem value="Outros">
                                      Outros
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label htmlFor="referencia">Referência:</label>
                              <Select name="referencia">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione a Referência..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Referências</SelectLabel>
                                    <SelectItem value="motorista">
                                      João
                                    </SelectItem>
                                    <SelectItem value="extintor">
                                      ABC-1234 (1234)
                                    </SelectItem>
                                    <SelectItem value="ipva">
                                      Empresa X tur
                                    </SelectItem>
                                    <SelectItem value="CNH">
                                      AAA-5555 (5555)
                                    </SelectItem>
                                    <SelectItem value="alvara">
                                      João Guedes
                                    </SelectItem>
                                    <SelectItem value="Outros">
                                      Empresa Y TUR
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label htmlFor="tipo">Tipo:</label>
                              <Select name="tipo">
                                <SelectTrigger className="w-[250px]">
                                  <SelectValue placeholder="Selecione o tipo..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Tipos</SelectLabel>
                                    <SelectItem value="interestadual">
                                      Interestadual
                                    </SelectItem>
                                    <SelectItem value="intermunicipal">
                                      Intermunicipal
                                    </SelectItem>
                                    <SelectItem value="outros">
                                      Outros/CNH/IPVA/Extintor
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            {formFieldsDocumentos.map((field) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}
