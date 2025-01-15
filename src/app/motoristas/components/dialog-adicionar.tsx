"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Cidade,
  Documento,
  Endereco,
  Habilitacao,
  Motorista,
  Uf,
} from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import loading from "../../assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MotoristasProps {
  setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
  motoristas: Motorista[];
}

export default function DialogAdicionar({
  setMotoristas,
  motoristas,
}: MotoristasProps) {
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [ufHabilitacao, setUfHabilitacao] = useState<Uf[]>([]);
  const [cidadeHabilitacao, setCidadeHabilitacao] = useState<Cidade[]>([]);
  const [dataAdmissao, setDataAdmissao] = useState<string>("");
  const [documento, setDocumento] = useState<Documento>({
    documento: "",
    tipo: "",
  });

  const [endereco, setEndereco] = useState<Endereco>({
    uf: "",
    cidade: "",
    rua: "",
    bairro: "",
    numero: "",
  });

  const [habilitacao, setHabilitacao] = useState<Habilitacao>({
    protocolo: "",
    vencimento: "",
    categoria: "",
    cidade: "",
    uf: "",
  });

  const [adicionando, setAdicionando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const sortedUfs = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUfs(sortedUfs);
        setUfHabilitacao(sortedUfs);
      })
      .catch((error) => {
        console.error("Error fetching UFs:", error);
      });
  }, []);

  const handleUfChange = (uf: string) => {
    setEndereco({ ...endereco, uf: uf });
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

  const handleUfHabilitacaoChange = (uf: string) => {
    setHabilitacao({ ...habilitacao, uf: uf });
    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const sortedCidades = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCidadeHabilitacao(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdicionando(true);
    const motorista = {
      nome: nome,
      dataNascimento: dataNascimento,
      telefone: telefone,
      documento: documento,
      endereco: endereco,
      cpf: cpf,
      habilitacao: habilitacao,
      dataAdmissao: dataAdmissao,
    } as Motorista;

    try {
      const response = await api.post("/motorista", motorista);
      setMotoristas([...motoristas, response.data.data]);
      toast.success("Motorista adicionado.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar adicionar motorista.");
    } finally {
      setNome("");
      setDataNascimento("");
      setTelefone("");
      setCpf("");
      setDocumento({ documento: "", tipo: "" });
      setEndereco({
        uf: "",
        cidade: "",
        rua: "",
        bairro: "",
        numero: "",
      });
      setHabilitacao({
        protocolo: "",
        vencimento: "",
        categoria: "",
        cidade: "",
        uf: "",
      });
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[280px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Motorista
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-auto h-[550px] md:h-[650px] flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Motorista
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center"
        >
          <div className="flex flex-col md:flex-row h-screen md:h-[90%] overflow-y-scroll md:overflow-auto gap-10 items-start">
            <fieldset className="border p-4 rounded w-full h-full">
              <legend className="font-semibold">Motorista</legend>
              <div>
                <label htmlFor="nome">Nome</label>
                <Input id="nome" onChange={(e) => setNome(e.target.value)} />
              </div>
              <div>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <Input
                  type="date"
                  id="dataNascimento"
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dataAdmissao">Data de Admissao</label>
                <Input
                  type="date"
                  id="dataAdmissao"
                  onChange={(e) => setDataAdmissao(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone</label>
                <Input
                  id="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <Input id="cpf" onChange={(e) => setCpf(e.target.value)} />
              </div>

              <div>
                <label htmlFor="documento">Documento</label>
                <Input
                  id="documento"
                  onChange={(e) =>
                    setDocumento({ ...documento, documento: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="tipoDocumento">Tipo de Documento</label>
                <RadioGroup
                  value={documento.tipo}
                  onValueChange={(e) => setDocumento({ ...documento, tipo: e })}
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
                <label htmlFor="uf">UF</label>
                <select
                  id="uf"
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
                <label htmlFor="cidade">Cidade</label>
                <select
                  id="cidade"
                  onChange={(e) =>
                    setEndereco({ ...endereco, cidade: e.target.value })
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
              {[
                { label: "Rua", name: "rua" },
                { label: "Bairro", name: "bairro" },
                { label: "Número", name: "numero" },
              ].map(({ label, name }) => (
                <div key={name} className="mt-4">
                  <label htmlFor={name}>{label}</label>
                  <Input
                    id={name}
                    value={endereco[name as keyof typeof endereco] || ""}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </fieldset>
            <fieldset className="border p-4 rounded w-full h-full">
              <legend className="font-semibold">Habilitação</legend>
              <div>
                <label htmlFor="protocolo">Protocolo</label>
                <Input
                  id="protocolo"
                  value={habilitacao.protocolo}
                  onChange={(e) =>
                    setHabilitacao((prev) => ({
                      ...prev,
                      protocolo: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-4">
                <label htmlFor="vencimento">Vencimento</label>
                <Input
                  type="date"
                  id="vencimento"
                  value={habilitacao.vencimento}
                  onChange={(e) =>
                    setHabilitacao((prev) => ({
                      ...prev,
                      vencimento: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-4">
                <label htmlFor="categoria">Categoria</label>
                <Input
                  name="categoria"
                  placeholder="Digite a(s) categoria(s)..."
                  value={habilitacao.categoria}
                  onChange={(e) =>
                    setHabilitacao((prev) => ({
                      ...prev,
                      categoria: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-4">
                <label htmlFor="ufHabilitacao">UF</label>
                <select
                  id="ufHabilitacao"
                  value={habilitacao.uf}
                  onChange={(e) => {
                    handleUfHabilitacaoChange(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a UF</option>
                  {ufHabilitacao.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="cidade">Cidade</label>
                <select
                  id="cidade"
                  onChange={(e) =>
                    setHabilitacao({ ...habilitacao, cidade: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a Cidade</option>
                  {cidadeHabilitacao.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-[300px] mt-8">
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
