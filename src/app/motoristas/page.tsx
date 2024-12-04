import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Motoristas() {
  return (
    <section className="bg-[#070180] pt-10 h-[400px]">
      <div className="h-[350px] w-[1200px] mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Motoristas
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">

            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <label htmlFor="name">Nome de Escala:</label>
                <Input
                  name="name"
                  className="border-2 font-medium text-white w-[250px]"
                  placeholder="Digite o nome de escala..."
                />
              </form>

              <Button className="bg-green-600 hover:bg-green-500">Adicionar Motorista</Button>
            </div>

            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Nome Escala
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CPF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade - Estado
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CNH
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Conta
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Agência
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
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
