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
import { Cidade, Colaborador, Documento, Endereco, Uf } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import loading from "../../assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ColaboradorProps {
  setColaboradores: React.Dispatch<React.SetStateAction<Colaborador[]>>;
  colaboradores: Colaborador[];
}

export default function DialogAdicionar({
  setColaboradores,
  colaboradores,
}: ColaboradorProps) {
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [dataAdmissao, setDataAdmissao] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const router = useRouter();

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

  const [adicionando, setAdicionando] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdicionando(true);

    const colaborador = {
      nome: nome,
      dataNascimento: dataNascimento,
      dataAdmissao: dataAdmissao,
      telefone: telefone,
      documento: documento,
      endereco: endereco,
      cpf: cpf,
      tipo: tipo,
    };

    try {
      const response = await api.post("/colaborador", colaborador);
      setColaboradores([...colaboradores, response.data.data]);
      toast.success("Colaborador adicionado.");
      console.log("Colaborador adicionado:", response.data.data);
      console.log("Colaborador:", colaborador);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast.error("Erro ao tentar adicionar colaborador.");
    } finally {
      setNome("");
      setDataNascimento("");
      setDataAdmissao("");
      setTelefone("");
      setCpf("");
      setTipo("");
      setDocumento({ documento: "", tipo: "" });
      setEndereco({
        uf: "",
        cidade: "",
        rua: "",
        bairro: "",
        numero: "",
      });
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[280px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Colaborador
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-auto h-[700px] md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Colaborador
          </DialogTitle>
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
                <label htmlFor="nome">Nome</label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <Input
                  type="date"
                  id="dataNascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dataAdmissao">Data de Admissão</label>
                <Input
                  type="date"
                  id="dataAdmissao"
                  value={dataAdmissao}
                  onChange={(e) => setDataAdmissao(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone</label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tipocliente">Tipo do cliente</label>
                <RadioGroup
                  value={tipo}
                  onValueChange={(e) => setTipo(e)}
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
              <div>
                <label htmlFor="documento">Documento</label>
                <Input
                  id="documento"
                  value={documento.documento}
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
                  value={endereco.uf}
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
                  value={endereco.cidade}
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
