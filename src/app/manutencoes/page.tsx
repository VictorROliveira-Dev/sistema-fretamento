import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/documentos.svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";

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
                  <FormInput
                    label="Manutenção/Serviço:"
                    name="manutencao"
                    placeholder="Digite o nome..."
                  />
                </div>
                <div>
                  <FormInput
                    label="Veiculo:"
                    name="veiculo"
                    placeholder="Digite a placa..."
                  />
                </div>
              </form>
              <DialogAdicionar />
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
                      <DialogEditar />
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
