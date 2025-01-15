import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import Image from "next/image";
  import { Button } from "@/components/ui/button";
  import editIcon from "@/app/assets/edit.svg";
  import { Label } from "@/components/ui/label";
  import { useEffect, useState } from "react";
  import { api } from "@/lib/axios";
  import axios from "axios";
  import { Cidade, Colaborador, Uf } from "@/lib/types";
  import loading from "../../assets/loading.svg";
  import { toast } from "sonner";
import { useRouter } from "next/navigation";
  
  interface ColaboradorProps {
    colaboradores: Colaborador[];
    setColaboradores: React.Dispatch<React.SetStateAction<Colaborador[]>>;
    colaborador: Colaborador;
  }
  
  export default function DialogEditar({
    colaboradores,
    setColaboradores,
    colaborador,
  }: ColaboradorProps) {
    const [ufs, setUfs] = useState<Uf[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [colaboradorAtualizar, setColaboradorAtualizar  ] =
      useState<Colaborador>(colaborador);
    const [editando, setEditando] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      axios
        .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((response) => {
          const sortedUfs = response.data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          setUfs(sortedUfs);
        })
        .catch((error) => {
          console.error("Error fetching UFs:", error);
        });
  
      handleUfChange(colaborador.endereco.uf);
    }, []);
  
    // Carrega as cidades com base na UF selecionada
    const handleUfChange = (uf: string) => {
      setColaboradorAtualizar({
        ...colaborador,
        endereco: { ...colaborador.endereco, uf: uf },
      });
  
      axios
        .get<Cidade[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        )
        .then((response) => {
          const sortedCidades = response.data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          setCidades(sortedCidades);
        })
        .catch((error) => {
          console.error("Error fetching cidades:", error);
        });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setEditando(true);
  
      try {
        const response = await api.put(
          `/colaborador/${colaborador.id}`,
          colaboradorAtualizar
        );
        const motoristaAtualizado = response.data.data;
        const motoristasAtualizados = colaboradores.filter(
          (colaborador) => colaborador.id !== motoristaAtualizado.id
        );
        setColaboradores([...motoristasAtualizados, motoristaAtualizado]);
        toast.success("Colaborador atualizado.");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 401) {
            localStorage.removeItem("token");
            router.replace("/login");
          }
        }
        toast.error("Erro ao tentar atualizar colaborador.");
        console.log("Erro ao tentar editar colaborador.", error);
      } finally {
        setEditando(false);
      }
    };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 transition-all cursor-pointer">
            <Image
              className="w-10 md:w-6"
              src={editIcon}
              alt="Editar"
              width={25}
            />
          </span>
        </DialogTrigger>
        <DialogContent className="md:w-auto md:h-[650px] h-[550px] overflow-y-scroll md:overflow-auto mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Editar Colaborador</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center"
          >
            <div className="flex flex-col md:flex-row h-screen md:h-[90%] overflow-y-scroll md:overflow-auto gap-10 items-start">
              <fieldset className="border p-4 rounded w-full h-full">
                <legend className="font-semibold">Colaborador</legend>
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    value={colaboradorAtualizar.nome}
                    id="nome"
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        nome: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    type="date"
                    value={colaboradorAtualizar.dataNascimento}
                    id="dataNascimento"
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        dataNascimento: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={colaboradorAtualizar.telefone}
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        telefone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={colaboradorAtualizar.cpf}
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        cpf: e.target.value,
                      })
                    }
                  />
                </div>
               
                <div>
                  <Label htmlFor="documento">Documento</Label>
                  <Input
                    id="documento"
                    value={colaboradorAtualizar.documento.documento}
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        documento: {
                          ...colaboradorAtualizar.documento,
                          documento: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                  <RadioGroup
                    value={colaboradorAtualizar.documento.tipo}
                    onValueChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        documento: { ...colaboradorAtualizar.documento, tipo: e },
                      })
                    }
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rg" id="rg" />
                      <label htmlFor="rg">RG</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cnh" id="cnh" />
                      <label htmlFor="cnh">CNH</label>
                    </div>
                  </RadioGroup>
                </div>
              </fieldset>
              <fieldset className="border p-4 rounded w-full h-full">
                <legend className="font-semibold">Endereço</legend>
                <div className="">
                  <Label htmlFor="uf">UF</Label>
                  <select
                    id="uf"
                    value={colaboradorAtualizar.endereco.uf}
                    onChange={(e) => handleUfChange(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Selecione a UF</option>
                    {ufs.map((uf) => (
                      <option key={uf.id} value={uf.sigla}>
                        {uf.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <Label htmlFor="cidade">Cidade</Label>
                  <select
                    id="cidade"
                    value={colaboradorAtualizar.endereco.cidade}
                    onChange={(e) =>
                      setColaboradorAtualizar({
                        ...colaboradorAtualizar,
                        endereco: {
                          ...colaboradorAtualizar.endereco,
                          cidade: e.target.value,
                        },
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Selecione uma cidade</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </select>
                </div>
                {[
                  { label: "Rua", name: "rua" },
                  { label: "Bairro", name: "bairro" },
                  { label: "Número", name: "numero" },
                ].map(({ label, name }) => (
                  <div key={name} className="mt-4">
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                      id={name}
                      value={
                        colaboradorAtualizar.endereco[
                          name as keyof typeof colaboradorAtualizar.endereco
                        ] || ""
                      }
                      onChange={(e) =>
                        setColaboradorAtualizar((prev) => ({
                          ...prev,
                          endereco: {
                            ...prev.endereco,
                            [name]: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ))}
              </fieldset>
            
            </div>
            <DialogFooter>
              <Button type="submit" className="w-[300px] mt-8">
                {editando ? (
                  <Image
                    src={loading}
                    alt="loading"
                    className="text-center animate-spin"
                  />
                ) : (
                  "Atualizar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  