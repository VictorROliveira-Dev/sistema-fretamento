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
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import { IDocumentos } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import FormInput from "@/components/form-input";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";
import DialogInformacoes from "./components/dialog-informacoes";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Documentos() {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);
  const [buscarDocumento, setBuscarDocumento] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

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
        console.log("Documentos:", response.data.data);
      } catch (error) {
        console.log("Erro ao capturar documentos", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchDocumentos();
  }, []);

  async function handlePendente(documento: IDocumentos) {
    try {
      setAtualizando(true);
      const response = await api.put(`/documento/${documento.id}`, {
        ...documento,
        pendente: !documento.pendente,
      });
      if (!response.data.isSucces) {
        toast("Erro ao tentar atualizar documento.");
      }

      const documentosAtualizados = documentos.map((doc) => {
        return doc.id === documento.id ? response.data.data : doc;
      });
      setDocumentos(documentosAtualizados);
    } catch {
      toast("Erro ao tentar atualizar documento.");
    } finally {
      setAtualizando(false);
    }
  }

  function getDateVencimento(dataVencimento: string, isPendente: boolean) {
    if (!isPendente) return "text-black font-medium";
    const today = new Date();
    const vencimento = parseISO(dataVencimento); // Converte a data para objeto Date
    const diferenca = Math.ceil(
      (vencimento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diferenca <= 7) return "text-red-500 font-bold";
    if (diferenca <= 15) return "text-yellow-500 font-bold";
    if (diferenca <= 30) return "text-blue-500 font-bold";

    return "text-black font-medium";
  }
  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[700px]">
      <div className="h-[750px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Documentos
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:w-full space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-between">
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
            <div className="h-[400px] overflow-y-scroll scrollbar-hide">
              {carregando ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={loading}
                    alt="carregando"
                    width={50}
                    className="animate-spin"
                  />
                </div>
              ) : (
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Doc/Certificado
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Referência
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Vencimento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Pendente
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
                        <TableCell className="hidden sm:table-cell">
                          {documento.referencia}
                        </TableCell>
                        <TableCell
                          className={`hidden sm:table-cell ${getDateVencimento(
                            documento.vencimento,
                            documento.pendente
                          )}`}
                        >
                          {format(
                            toZonedTime(parseISO(documento.vencimento), "UTC"),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>
                          {atualizando ? (
                            <div className="flex items-center justify-center">
                              <Image
                                src={loading}
                                alt="carregando"
                                width={50}
                                className="animate-spin"
                              />
                            </div>
                          ) : (
                            <Switch
                              onClick={() => handlePendente(documento)}
                              checked={documento.pendente}
                              id="airplane-mode"
                            />
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
                            <DialogInformacoes documentoId={documento.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex items-center flex-col md:flex-row gap-4 md:pt-10">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <p className="text-sm">30 Dias para o vencimento</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                <p className="text-sm">15 Dias para o vencimento</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <p className="text-sm">7 Dias para o vencimento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
