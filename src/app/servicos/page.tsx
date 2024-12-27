"use client";
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
import { Servico } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchServicos = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/servico");
        setServicos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar servicos", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchServicos();
  }, []);

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 m:h-[650px]">
      <div className="md:h-[500px] h-[550px] md:w-[400px] mx-auto bg-white flex flex-col items-center">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Serviços
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto space-y-4 md:w-full">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Serviço:"
                  name="servico"
                  placeholder="Digite o serviço..."
                />
                <DialogAdicionar
                  setServicos={setServicos}
                  servicos={servicos}
                />
              </form>
            </div>
            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="carregando"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[200px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Serviço
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {servicos.map((servico) => (
                      <TableRow key={servico.id} className="hover:bg-gray-200">
                        <TableCell>{servico.nomeServico}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              servico={servico}
                              servicos={servicos}
                              setServicos={setServicos}
                            />
                            <DialogRemover
                              servico={servico}
                              setServicos={setServicos}
                            />
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
