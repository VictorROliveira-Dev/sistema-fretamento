"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Peca, RetiradaPeca, AdicionarPeca } from "@/lib/types";
import { api } from "@/lib/axios";
import loading from "../assets/loading-dark.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import DialogEditarPeca from "../estoque/components/pecas/dialog-editar";
import DialogAdicionarPeca from "../estoque/components/pecas/dialog-adicionar";
import DialogRemoverPeca from "../estoque/components/pecas/dialog-remover";
import DialogAdicionarRetirada from "../estoque/components/retiradas/dialog-adicionar";
import DialogRemoverRetirada from "../estoque/components/retiradas/dialog-remover";
import DialogAdicionarReestoque from "../estoque/components/reestoque/dialog-adicionar";
import DialogRemoverReestoque from "../estoque/components/reestoque/dialog-remover";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Financeiro() {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [retiradas, setRetiradas] = useState<RetiradaPeca[]>([]);
  const [reestoques, setReestoques] = useState<AdicionarPeca[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [prefixoVeiculo, setPrefixoVeiculo] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      try {
        const [pecasResponse, retiradasResponse, reestoqueResponse] =
          await Promise.all([
            api.get("/peca"),
            api.get("/retirada"),
            api.get("/reestoque"),
          ]);
        const pecasData = pecasResponse.data.data || [];
        const retiradasData = retiradasResponse.data.data || [];
        const reestoqueData = reestoqueResponse.data.data || [];
        setPecas(pecasData);
        setRetiradas(retiradasData);
        setReestoques(reestoqueData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, [router]);

  async function getByFilters(e: React.FormEvent, tipo: string) {
    e.preventDefault();
    try {
      // Objeto com os parâmetros
      const params: Record<string, string> = {};
      if (dataInicio)
        params["minDate"] = new Date(dataInicio).toLocaleDateString();
      if (dataFinal) params["maxDate"] = dataFinal;
      if (prefixoVeiculo) params["prefixoVeiculo"] = prefixoVeiculo;
      // Constrói a query string com os parâmetros
      const queryString = new URLSearchParams(params).toString();
      // Faz a requisição com a query dinâmica
      const response = await api.get(`/${tipo}?${queryString}`);
      if (!response.data.isSucces) {
        toast("erro ao tentar consultar dados");
      }
      if (tipo === "retirada") setRetiradas(response.data.data);
      if (tipo === "reestoque") setReestoques(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        localStorage.removeItem("token");
        router.replace("/login");
      } else {
        toast("Erro ao consultar dados");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[800px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">Visualizar Estoque</p>
        </div>
        <div className="flex md:h-screen p-10">
          <div className="mx-auto md:w-full">
            <Tabs defaultValue="pecas" className="flex flex-col">
              <TabsList className="gap-4">
                <TabsTrigger value="pecas" className="font-bold">
                  Pecas
                </TabsTrigger>
                <TabsTrigger value="retirada" className="font-bold">
                  Retirada
                </TabsTrigger>
                <TabsTrigger value="reestoque" className="font-bold">
                  Reestoque
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pecas">
                <div className="flex items-center gap-2 justify-between mb-10">
                  <DialogAdicionarPeca pecas={pecas} setPecas={setPecas} />
                </div>
                {carregando ? (
                  <div className="flex items-center justify-center">
                    <Image
                      src={loading}
                      alt="loading"
                      className="animate-spin"
                      width={50}
                    />
                  </div>
                ) : (
                  <div className="h-[200px] overflow-y-scroll scrollbar-hide">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Peça</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pecas.map((peca) => (
                          <TableRow key={peca.id}>
                            <TableCell>{peca.nome}</TableCell>
                            <TableCell>{peca.preco}</TableCell>
                            <TableCell>{peca.quantidade}</TableCell>
                            <TableCell className="flex gap-2">
                              <DialogEditarPeca
                                peca={peca}
                                setPecas={setPecas}
                                pecas={pecas}
                              />
                              <DialogRemoverPeca
                                peca={peca}
                                setPecas={setPecas}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="retirada">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => getByFilters(e, "retirada")}
                  >
                    <div className="space-y-2 mb-2">
                      <Input
                        type="date"
                        value={dataInicio}
                        className="w-full"
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                      <Input
                        type="date"
                        value={dataFinal}
                        className="w-full"
                        onChange={(e) => setDataFinal(e.target.value)}
                      />
                    </div>

                    <Input
                      type="text"
                      value={prefixoVeiculo}
                      placeholder="Prefixo..."
                      onChange={(e) => setPrefixoVeiculo(e.target.value)}
                    />
                    <Button type="submit" className="bg-blue-600">
                      <Search className="text-white" />
                    </Button>
                  </form>
                  <DialogAdicionarRetirada
                    setRetiradas={setRetiradas}
                    retiradas={retiradas}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Veiculo</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Peca
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Quantidade
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Preco Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retiradas.map((retirada) => (
                      <TableRow key={retirada.id}>
                        <TableCell>
                          {new Date(retirada.dataDeRetirada).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>
                          {retirada.veiculo?.prefixo || "XXXX"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {retirada.peca?.nome || "peca"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {retirada.quantidade}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {retirada.precoTotal}
                        </TableCell>
                        <TableCell>
                          <DialogRemoverRetirada
                            retirada={retirada}
                            setRetiradas={setRetiradas}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="reestoque">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                  <form
                    className="flex flex-col gap-2 mb-4"
                    onSubmit={(e) => getByFilters(e, "reestoque")}
                  >
                    <Input
                      type="date"
                      value={dataInicio}
                      className="w-full"
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                    <Input
                      type="date"
                      value={dataFinal}
                      className="w-full"
                      onChange={(e) => setDataFinal(e.target.value)}
                    />
                    <Button type="submit" className="bg-blue-600">
                      <Search className="text-white" />
                    </Button>
                  </form>
                  <DialogAdicionarReestoque
                    setReestoques={setReestoques}
                    reestoques={reestoques}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Peca</TableHead>
                      <TableHead className="hidden sm:table-cell">Quantidade</TableHead>
                      <TableHead className="hidden sm:table-cell">Preco Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reestoques.map((reestoque) => (
                      <TableRow key={reestoque.id}>
                        <TableCell>
                          {new Date(reestoque.dataDeEntrada).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>{reestoque.peca?.nome || "peca"}</TableCell>
                        <TableCell className="hidden sm:table-cell">{reestoque.quantidade}</TableCell>
                        <TableCell className="hidden sm:table-cell">{reestoque.precoTotal}</TableCell>
                        <TableCell>
                          <DialogRemoverReestoque
                            reestoque={reestoque}
                            setReestoques={setReestoques}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
