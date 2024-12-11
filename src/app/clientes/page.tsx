"use client";

import FormInput from "@/components/form-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogExcluir from "./components/dialogExcluir";
import { Cliente } from "@/lib/types";

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  async function fetchClientes() {
    const response = await api.get("/cliente");
    if (!response.data.isSucces) {
      console.log(response.data.message);
      return;
    }

    setClientes(response.data.data);
  }

  useEffect(() => {
    fetchClientes();
  }, []);
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Clientes
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Nome Cliente..."
                  name="nomecliente"
                  placeholder="Digite o nome..."
                />
              </form>
              <DialogAdicionar clientes={clientes} setClientes={setClientes} />
            </div>
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Nome Completo
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CPF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Tipo Cliente
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Documento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {clientes.map((cliente) => (
                  <TableRow className="hover:bg-gray-200" key={cliente.id}>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.cpf}</TableCell>
                    <TableCell>{cliente.endereco.cidade}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>{cliente.documento.documento}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DialogEditar
                          cliente={cliente}
                          setClientes={setClientes}
                          clientes={clientes}
                        />
                        <DialogExcluir
                          clienteId={cliente.id}
                          clienteName={cliente.nome}
                        />
                        <DialogInformacoes cliente={cliente} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
