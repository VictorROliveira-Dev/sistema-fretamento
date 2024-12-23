"use client";

import removeIcon from "@/app/assets/remove.svg";
import passagemIcon from "@/app/assets/passagem.svg";
import FormInput from "@/components/form-input";
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
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { Passageiro } from "@/lib/types";
import { api } from "@/lib/axios";
import DialogExcluir from "./components/dialog_excluir";

export default function Passageiros() {
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);

  async function fetchPassageiros() {
    const response = await api.get("/passageiro");
    if (!response.data.isSucces) {
      console.log(response.data.message);
      return;
    }

    setPassageiros(response.data.data);
  }

  useEffect(() => {
    fetchPassageiros();
  }, []);

  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Passageiros
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Nome Passageiro:"
                  name="nomepassageiro"
                  placeholder="Digite o nome..."
                />
              </form>
              <DialogAdicionar
                passageiros={passageiros}
                setPassageiros={setPassageiros}
              />
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
                    CPF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Matricula
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {passageiros.map((passageiro) => (
                  <TableRow className="hover:bg-gray-200" key={passageiro.id}>
                    <TableCell>
                      <p>{passageiro.nome}</p>
                    </TableCell>
                    <TableCell>{passageiro.dataNascimento}</TableCell>
                    <TableCell>{passageiro.cpf}</TableCell>
                    <TableCell>{passageiro.endereco.cidade}</TableCell>
                    <TableCell>{passageiro.matricula}</TableCell>
                    <TableCell>{passageiro.telefone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DialogEditar
                          setPassageiros={setPassageiros}
                          passageiros={passageiros}
                          passageiroEditavel={passageiro}
                        />
                        <DialogExcluir
                          setPassageiros={setPassageiros}
                          passageiros={passageiros}
                          passageiro={passageiro}
                        />
                        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                          <Image
                            src={passagemIcon}
                            alt="Passagem"
                            width={25}
                            className="hover:scale-110"
                          />
                        </Button>
                        <DialogInformacoes passageiro={passageiro} />
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