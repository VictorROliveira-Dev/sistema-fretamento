"use client";
import removeIcon from "@/app/assets/remove.svg";
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
import DialogAdicionar from "./components/dialog-adicionar";
import FormInput from "@/components/form-input";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Motorista } from "@/lib/types";

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  useEffect(() => {
    const fetchMotoristas = async () => {
      try {
        const response = await api.get("/motorista");
        setMotoristas(response.data.data);
        console.log("Motoristas:", response.data.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      }
    };
    fetchMotoristas();
  }, []);

  const handleRemoverMotorista = async (id: string) => {
    try {
      await api.delete(`/motorista/${id}`);
      setMotoristas((prevMotoristas) =>
        prevMotoristas.filter((m) => m.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover motorista:", error);
    }
  };

  return (
    <section className="bg-[#070180] pt-12 h-[450px]">
      <div className="h-[380px] w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Motoristas
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px] p-10">
          <div className="mx-auto  md:w-[1000px] w-[450px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Nome Completo:"
                  name="nomecompleto"
                  placeholder="Digite o nome..."
                />
              </form>
              <DialogAdicionar />
            </div>
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Nome
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CPF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    UF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CNH
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {motoristas.map((motorista, index) => (
                  <TableRow key={motorista.id} className="hover:bg-gray-200">
                    <TableCell>{motorista.nome}</TableCell>
                    <TableCell>{motorista.cpf}</TableCell>
                    <TableCell>{motorista.endereco.cidade}</TableCell>
                    <TableCell>{motorista.endereco.uf}</TableCell>
                    <TableCell>{motorista.telefone}</TableCell>
                    <TableCell>{motorista.documento.documento}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DialogEditar />
                        <Button
                          className="bg-transparent shadow-none p-0 hover:bg-transparent"
                          onClick={() => handleRemoverMotorista(motorista.id)}
                        >
                          <Image
                            src={removeIcon}
                            alt="Remover"
                            width={25}
                            className="hover:scale-110"
                          />
                        </Button>
                        <DialogInformacoes />
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
