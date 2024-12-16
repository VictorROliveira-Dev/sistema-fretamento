"use client";
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
import documentoIcon from "@/app/assets/documentos.svg";
import { IDocumentos } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import FormInput from "@/components/form-input";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";

export default function Documentos() {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);
  const [buscarDocumento, setBuscarDocumento] = useState("");
  const [carregando, setCarregando] = useState(false);

  const documentosFiltrados = documentos.filter((documento) => {
    return documento.tipoDocumento
      .toLowerCase()
      .includes(buscarDocumento.toLowerCase());
  });

  useEffect(() => {
    const fetchDocumentos = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/documento");
        setDocumentos(response.data.data ? response.data.data : []);
      } catch (error) {
        console.log("Erro ao capturar documentos", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchDocumentos();
  }, []);

  return (
    <section className="bg-[#070180] pt-12 h-[425px]">
      <div className="h-[400px] w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Documentos
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto w-full space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <div>
                  <FormInput
                    label="Doc/Certificado:"
                    name="documento"
                    placeholder="Digite o Doc/Certificado..."
                    value={buscarDocumento}
                    onChange={(e) => setBuscarDocumento(e.target.value)}
                  />
                </div>
              </form>
              <DialogAdicionar
                setDocumentos={setDocumentos}
                documentos={documentos}
              />
            </div>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              {carregando ? (
                <div className="flex items-center justify-center">
                  <Image src={loading} alt="carregando" width={50} className="animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Doc/Certificado
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Referência
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Vencimento
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {documentosFiltrados.map((documento) => (
                      <TableRow
                        key={documento.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell>
                          {documento.tipoDocumento.toUpperCase()}
                        </TableCell>
                        <TableCell>{documento.referencia}</TableCell>
                        <TableCell>
                          {new Date(documento.vencimento).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              setDocumentos={setDocumentos}
                              documentos={documentos}
                              documento={documento}
                            />
                            <DialogRemover
                              documento={documento}
                              setDocumentos={setDocumentos}
                            />
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
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
