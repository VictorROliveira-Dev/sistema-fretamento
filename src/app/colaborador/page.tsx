"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogAdicionar from "./components/dialog-adicionar";
import FormInput from "@/components/form-input";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Colaborador } from "@/lib/types";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";
import Image from "next/image";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

export default function Motoristas() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [buscarColaborador, setBuscarColaborador] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchColaboradores = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/colaborador");
        setColaboradores(response.data.data);
        console.log("Colaboradores:", response.data.data);
      } catch (error) {
        console.error("Erro ao buscar colaborador:", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchColaboradores();
  }, []);

  const filtroColaboradores = colaboradores.filter((colaborador) => {
    if (!colaborador.nome) {
      return false;
    }
    return colaborador.nome
      .toLowerCase()
      .includes(buscarColaborador.toLowerCase());
  });

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[700px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Colaboradores
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Nome Colaborador:"
                  name="nomecompleto"
                  placeholder="Digite o nome..."
                  value={buscarColaborador}
                  onChange={(e) => setBuscarColaborador(e.target.value)}
                />
              </form>
              <DialogAdicionar
                setColaboradores={setColaboradores}
                colaboradores={colaboradores}
              />
            </div>
            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[400px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Nome
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data Nascimento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Data Admissão
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        CPF
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Cidade
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        UF
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Telefone
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {filtroColaboradores.map((colaborador) => (
                      <TableRow
                        key={colaborador.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell>{colaborador.nome}</TableCell>
                        <TableCell>
                          {format(
                            toZonedTime(
                              parseISO(colaborador.dataNascimento),
                              "UTC"
                            ),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>
                          {colaborador?.dataAdmissao &&
                            format(
                              toZonedTime(
                                parseISO(colaborador.dataAdmissao),
                                "UTC"
                              ),
                              "dd/MM/yyyy"
                            )}
                        </TableCell>
                        <TableCell>{colaborador.cpf}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {colaborador.endereco.cidade}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {colaborador.endereco.uf.toUpperCase()}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {colaborador.telefone}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              colaborador={colaborador}
                              setColaboradores={setColaboradores}
                              colaboradores={colaboradores}
                            />
                            <DialogRemover
                              colaborador={colaborador}
                              setColaboradores={setColaboradores}
                            />
                            <DialogInformacoes colaboradorId={colaborador.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
