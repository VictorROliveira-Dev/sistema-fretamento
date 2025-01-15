"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/axios";
import { Cidade, Cliente, Endereco, Uf } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import loading from "../../assets/loading.svg";
import { useRouter } from "next/navigation";

interface ClienteProps {
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

export default function DialogAdicionar({
  clientes,
  setClientes,
}: ClienteProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [adicionando, setAdicionando] = useState(false);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    nomeFantasia: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    email: "",
    tipo: "",
    documento: { documento: "", tipo: "" },
    endereco: { uf: "", cidade: "", rua: "", bairro: "", numero: "" },
  });
  const router = useRouter();

  // Carrega as UFs ao montar o componente
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
  }, []);

  // Carrega as cidades com base na UF selecionada
  const handleUfChange = (uf: string) => {
    setCliente({ ...cliente, endereco: { ...cliente.endereco, uf: uf } });
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
    setAdicionando(true);

    try {
      const response = await api.post("/cliente", cliente);
      setClientes([...clientes, response.data.data]);
      toast.success("Cliente adicionado.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar adicionar cliente.");
      console.log(error);
    } finally {
      setCliente({
        id: 0,
        nome: "",
        nomeFantasia: "",
        dataNascimento: "",
        telefone: "",
        cpf: "",
        email: "",
        tipo: "",
        documento: { documento: "", tipo: "" },
        endereco: { uf: "", cidade: "", rua: "", bairro: "", numero: "" },
      });
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-600 text-center text-white p-1 rounded-md cursor-pointer transition-all w-[280px] md:w-[200px]">
          Adicionar Cliente
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-auto h-[550px] md:h-[95%] overflow-y-scroll md:overflow-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Cadastro Cliente
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col md:flex-row h-screen md:h-[90%] overflow-y-scroll md:overflow-auto gap-10 items-start">
            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Cliente</legend>
              {[{ label: "Nome", name: "nome" }, 
              { label: "Nome Fantasia", name: "nomeFantasia" }, 
              { label: "Email", name: "email" }, 
              { label: "Data de Nascimento", name: "dataNascimento", type: "date" }, 
              { label: "Telefone", name: "telefone" }, 
              { label: "CPF", name: "cpf" }
              ].map(({ label, name, type }) => {
                // Verificar se a propriedade é do tipo string ou number antes de renderizar
                const value = cliente[name as keyof Cliente];
                if (typeof value === "string" || typeof value === "number" || value === undefined) {
                  return (
                    <div key={name} className="mt-4">
                      <Label htmlFor={name}>{label}</Label>
                      <Input
                        id={name}
                        type={type || "text"}
                        value={value || ""}
                        onChange={(e) =>
                          setCliente((prev) => ({ ...prev, [name]: e.target.value }))
                        }
                      />
                    </div>
                  );
                }
                return null; // Não renderizar para propriedades que não são string ou number
              })}
              <div className="mt-4">
                <Label htmlFor="tipo">Tipo do cliente</Label>
                <RadioGroup
                  value={cliente.tipo}
                  onValueChange={(e) => setCliente({ ...cliente, tipo: e })}
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
              <div className="mt-4">
                <Label htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  value={cliente.documento.documento}
                  onChange={(e) =>
                    setCliente({
                      ...cliente,
                      documento: { ...cliente.documento, documento: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={cliente.documento.tipo}
                  onValueChange={(e) =>
                    setCliente({
                      ...cliente,
                      documento: { ...cliente.documento, tipo: e },
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
            <fieldset className="border p-4 rounded w-full">
              <legend className="font-semibold">Endereço</legend>
              <div className="">
                <Label htmlFor="uf">UF</Label>
                <select
                  id="uf"
                  value={cliente.endereco.uf}
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
                  value={cliente.endereco.cidade}
                  onChange={(e) =>
                    setCliente({
                      ...cliente,
                      endereco: { ...cliente.endereco, cidade: e.target.value },
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
              {["rua", "bairro", "numero"].map((field) => (
                <div key={field} className="mt-4">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    value={cliente.endereco[field as keyof Endereco] || ""}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        endereco: {
                          ...cliente.endereco,
                          [field]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </fieldset>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full mt-8">
              {adicionando ? (
                <Image
                  src={loading}
                  alt="carregando"
                  className="text-center animate-spin"
                />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
