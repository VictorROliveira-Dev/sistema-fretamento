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
import { Motorista } from "@/lib/types";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";
import Image from "next/image";

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [buscarMotorista, setBuscarMotorista] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchMotoristas = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/motorista");
        setMotoristas(response.data.data);
        console.log("Motoristas:", response.data.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchMotoristas();
  }, []);

  const filtroMotoristas = motoristas.filter((motorista) => {
    if (!motorista.nome) {
      return false;
    }

    return motorista.nome.toLowerCase().includes(buscarMotorista.toLowerCase());
  });

  return (
    <section className="bg-[#070180] pt-12 h-[425px]">
      <div className="h-[400px] w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Motoristas
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto w-full space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Nome Motorista:"
                  name="nomecompleto"
                  placeholder="Digite o nome..."
                  value={buscarMotorista}
                  onChange={(e) => setBuscarMotorista(e.target.value)}
                />
              </form>
              <DialogAdicionar
                setMotoristas={setMotoristas}
                motoristas={motoristas}
              />
            </div>
            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                />
              </div>
            ) : (
              <div className="h-[200px] overflow-y-scroll scrollbar-hide">
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
                    {filtroMotoristas.map((motorista, index) => (
                      <TableRow
                        key={motorista.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell>{motorista.nome}</TableCell>
                        <TableCell>{motorista.cpf}</TableCell>
                        <TableCell>{motorista.endereco.cidade}</TableCell>
                        <TableCell>{motorista.endereco.uf}</TableCell>
                        <TableCell>{motorista.telefone}</TableCell>
                        <TableCell>{motorista.documento.documento}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              motorista={motorista}
                              setMotoristas={setMotoristas}
                              motoristas={motoristas}
                            />
                            <DialogRemover
                              motorista={motorista}
                              setMotoristas={setMotoristas}
                            />
                            <DialogInformacoes motoristaId={motorista.id} />
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
