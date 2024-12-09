import removeIcon from "@/app/assets/remove.svg";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";

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
              <DialogAdicionar />
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
                      <DialogEditar />
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
