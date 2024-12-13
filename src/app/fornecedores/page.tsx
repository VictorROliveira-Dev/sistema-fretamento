"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { Fornecedor } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [buscarNome, setBuscarNome] = useState("");

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get("/api/fornecedor");
        setFornecedores(response.data.data ? response.data.data : []);
        console.log("Fornecedores:", response.data.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };
    fetchFornecedores();
  }, []);

  const filtroFornecedoresNome = fornecedores.filter((fornecedor) => {
    if (!fornecedor) return false;

    return fornecedor.nome.toLowerCase().includes(buscarNome.toLowerCase());
  });

  return (
    <section className="bg-[#070180] pt-12 h-[425px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Fornecedores
          </p>
        </div>
        <div className="flex items-center h-[800px]">
          <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <FormInput
                  label="Nome:"
                  name="nome"
                  placeholder="Digite a nome..."
                  value={buscarNome}
                  onChange={(e) => setBuscarNome(e.target.value)}
                />
              </form>
              <DialogAdicionar
                setFornecedor={setFornecedores}
                fornecedores={fornecedores}
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
                    Documento
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
                    Tipo Pessoa
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {filtroFornecedoresNome.map((fornecedor) => (
                  <TableRow key={fornecedor.id} className="hover:bg-gray-200">
                    <TableCell>{fornecedor.nome}</TableCell>
                    <TableCell>
                      {new Date(fornecedor.dataNascimento).toLocaleDateString(
                        "pt-BR"
                      )}
                    </TableCell>
                    <TableCell>{fornecedor.cpf}</TableCell>
                    <TableCell>{fornecedor.endereco.cidade}</TableCell>
                    <TableCell>{fornecedor.endereco.uf}</TableCell>
                    <TableCell>{fornecedor.telefone}</TableCell>
                    <TableCell>{fornecedor.tipo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DialogEditar
                          fornecedor={fornecedor}
                          setFornecedores={setFornecedores}
                          fornecedores={fornecedores}
                        />
                        <DialogRemover
                          fornecedor={fornecedor}
                          setFornecedores={setFornecedores}
                        />
                        <DialogInformacoes fornecedorId={fornecedor.id} />
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
