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
import { Cidade, Motorista, Uf } from "@/lib/types";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface MotoristaProps {
  motoristas: Motorista[];
  setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
  motorista: Motorista;
}

export default function DialogEditar({
  motoristas,
  setMotoristas,
  motorista,
}: MotoristaProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [motoristaAtualizar, setMotoristasAtualizar] =
    useState<Motorista>(motorista);
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

    handleUfChange(motorista.endereco.uf);
  }, []);

  // Carrega as cidades com base na UF selecionada
  const handleUfChange = (uf: string) => {
    setMotoristasAtualizar({
      ...motorista,
      endereco: { ...motorista.endereco, uf: uf },
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
        `/motorista/${motorista.id}`,
        motoristaAtualizar
      );
      const motoristaAtualizado = response.data.data;
      const motoristasAtualizados = motoristas.filter(
        (motorista) => motorista.id !== motoristaAtualizado.id
      );
      setMotoristas([...motoristasAtualizados, motoristaAtualizado]);
      toast.success("Motorista atualizado.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error) {
      toast.error("Erro ao tentar atualizar motorista.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("Erro ao tentar editar motorista.", error);
    } finally {
      setEditando(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image
            className="w-10 md:w-6"
            src={editIcon}
            alt="Editar"
            width={25}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-auto md:h-[90%] h-screen overflow-y-scroll mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Formulário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col md:flex-row h-screen md:h-[90%] overflow-y-scroll gap-10 items-start">
            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Cliente</legend>
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  value={motoristaAtualizar.nome}
                  id="nome"
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motorista,
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
                  value={motoristaAtualizar.dataNascimento}
                  id="dataNascimento"
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
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
                  value={motoristaAtualizar.telefone}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
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
                  value={motoristaAtualizar.cpf}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      cpf: e.target.value,
                    })
                  }
                />
              </div>

              {/* Tipo */}
              <div>
                <Label htmlFor="tipocliente">Tipo do cliente</Label>
                <RadioGroup
                  value={motoristaAtualizar.tipo}
                  onValueChange={(e) =>
                    setMotoristasAtualizar({ ...motoristaAtualizar, tipo: e })
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
                  value={motoristaAtualizar.documento.documento}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      documento: {
                        ...motoristaAtualizar.documento,
                        documento: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={motoristaAtualizar.documento.tipo}
                  onValueChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      documento: { ...motoristaAtualizar.documento, tipo: e },
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
                  value={motoristaAtualizar.endereco.uf}
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
                  value={motoristaAtualizar.endereco.cidade}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      endereco: {
                        ...motoristaAtualizar.endereco,
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
                      motoristaAtualizar.endereco[
                        name as keyof typeof motoristaAtualizar.endereco
                      ] || ""
                    }
                    onChange={(e) =>
                      setMotoristasAtualizar((prev) => ({
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

            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Habilitação</legend>

              {/* Protocolo */}
              <div>
                <label htmlFor="protocolo">Protocolo</label>
                <Input
                  id="protocolo"
                  value={motoristaAtualizar.habilitacao.protocolo}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      habilitacao: {
                        ...motoristaAtualizar.habilitacao,
                        protocolo: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Vencimento */}
              <div className="mt-4">
                <label htmlFor="vencimento">Vencimento</label>
                <Input
                  type="date"
                  id="vencimento"
                  value={motoristaAtualizar.habilitacao.vencimento}
                  onChange={(e) =>
                    setMotoristasAtualizar((prev) => ({
                      ...prev,
                      vencimento: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Categoria */}
              <div className="mt-4">
                <label htmlFor="categoria">Categoria</label>
                <Input
                  id="categoria"
                  name="categoria"
                  placeholder="Digite a(s) categoria(s)..."
                  value={motoristaAtualizar.habilitacao.categoria}
                  onChange={(e) =>
                    setMotoristasAtualizar((prev) => ({
                      ...prev,
                      habilitacao: {
                        ...prev.habilitacao,
                        categoria: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              {/* UF */}
              <div className="mt-4">
                <label htmlFor="ufHabilitacao">UF</label>
                <select
                  id="ufHabilitacao"
                  value={motoristaAtualizar.habilitacao.uf}
                  onChange={(e) =>
                    setMotoristasAtualizar((prev) => ({
                      ...prev,
                      uf: e.target.value,
                    }))
                  }
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

              {/* Cidade */}
              <div className="mt-4">
                <label htmlFor="cidade">Cidade</label>
                <select
                  id="cidade"
                  value={motoristaAtualizar.habilitacao.cidade}
                  onChange={(e) =>
                    setMotoristasAtualizar({
                      ...motoristaAtualizar,
                      habilitacao: {
                        ...motoristaAtualizar.habilitacao,
                        cidade: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a Cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
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
