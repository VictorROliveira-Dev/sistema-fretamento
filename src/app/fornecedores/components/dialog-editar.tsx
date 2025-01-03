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
import { Cidade, Fornecedor, Uf } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface FornecedorProps {
  fornecedores: Fornecedor[];
  setFornecedores: React.Dispatch<React.SetStateAction<Fornecedor[]>>;
  fornecedor: Fornecedor;
}

export default function DialogEditar({
  fornecedores,
  setFornecedores,
  fornecedor,
}: FornecedorProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [fornecedorAtualizar, setFornecedorAtualizar] =
    useState<Fornecedor>(fornecedor);
  const [editando, setEditando] = useState(false);

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

    handleUfChange(fornecedor.endereco.uf);
  }, []);

  // Carrega as cidades com base na UF selecionada
  const handleUfChange = (uf: string) => {
    setFornecedorAtualizar({
      ...fornecedor,
      endereco: { ...fornecedor.endereco, uf: uf },
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
        `/api/fornecedor/${fornecedor.id}`,
        fornecedorAtualizar
      );
      const fornecedorAtualizado = response.data.data;
      const fornecedoresAtualizados = fornecedores.filter(
        (fornecedor) => fornecedor.id !== fornecedorAtualizado.id
      );
      setFornecedores([...fornecedoresAtualizados, fornecedorAtualizado]);
      toast.success("Fornecedor atualizado.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar atualizar fornecedor.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("Erro ao tentar editar fornecedor.", error);
    } finally {
      setEditando(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            className="w-10 md:w-6"
            src={editIcon}
            alt="Editar"
            width={25}
          />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-auto md:h-[90%] h-[550px] overflow-y-scroll mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Formulário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col md:flex-row h-screen md:h-[90%] overflow-y-scroll gap-10 items-start">
            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Fornecedor</legend>
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  value={fornecedorAtualizar.nome}
                  id="nome"
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedor,
                      nome: e.target.value,
                    })
                  }
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  type="date"
                  value={fornecedorAtualizar.dataNascimento}
                  id="dataNascimento"
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      dataNascimento: e.target.value,
                    })
                  }
                />
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={fornecedorAtualizar.telefone}
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      telefone: e.target.value,
                    })
                  }
                />
              </div>
              {/* CPF */}
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={fornecedorAtualizar.cpf}
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      cpf: e.target.value,
                    })
                  }
                />
              </div>

              {/* Tipo */}
              <div>
                <Label htmlFor="tipocliente">Tipo do Fornecedor</Label>
                <RadioGroup
                  value={fornecedorAtualizar.tipo}
                  onValueChange={(e) =>
                    setFornecedorAtualizar({ ...fornecedorAtualizar, tipo: e })
                  }
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FISICA" id="fisica" />
                    <label htmlFor="fisica">Física</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="JURIDICA" id="juridica" />
                    <label htmlFor="juridica">Jurídica</label>
                  </div>
                </RadioGroup>
              </div>
              {/* Documento */}
              <div>
                <Label htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  value={fornecedorAtualizar.documento.documento}
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      documento: {
                        ...fornecedorAtualizar.documento,
                        documento: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={fornecedorAtualizar.documento.tipo}
                  onValueChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      documento: { ...fornecedorAtualizar.documento, tipo: e },
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

            {/* Endereço */}
            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Endereço</legend>
              <div className="">
                <Label htmlFor="uf">UF</Label>
                <select
                  id="uf"
                  value={fornecedorAtualizar.endereco.uf}
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
                  value={fornecedorAtualizar.endereco.cidade}
                  onChange={(e) =>
                    setFornecedorAtualizar({
                      ...fornecedorAtualizar,
                      endereco: {
                        ...fornecedorAtualizar.endereco,
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
                      fornecedorAtualizar.endereco[
                        name as keyof typeof fornecedorAtualizar.endereco
                      ] || ""
                    }
                    onChange={(e) =>
                      setFornecedorAtualizar((prev) => ({
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
            <Button type="submit" className="w-full mt-8">
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
