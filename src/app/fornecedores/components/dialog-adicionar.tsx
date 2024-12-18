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
import { Input } from "@/components/ui/input";
import { FormDataFornecedor, Fornecedor } from "@/lib/types";
import { useState } from "react";
import { FormData } from "@/lib/types";
import { api } from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import loading from "../../assets/loading.svg";
import { toast } from "sonner";

interface FornecedorProps {
  setFornecedor: React.Dispatch<React.SetStateAction<Fornecedor[]>>;
  fornecedores: Fornecedor[];
}

export default function DialogAdicionar({
  setFornecedor,
  fornecedores,
}: FornecedorProps) {
  const [formData, setFormData] = useState<FormDataFornecedor>({
    nome: "",
    dataNascimento: "",
    telefone: "",
    documento: { documento: "", tipo: "" },
    endereco: { uf: "", cidade: "", rua: "", bairro: "", numero: "" },
    cpf: "",
    tipo: "",
  });
  const [adicionando, setAdicionando] = useState(false);
  const handleInputChange = (name: string, value: string) => {
    // Para campos aninhados
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      // Adicione uma asserção de tipo para garantir que parentKey é uma chave válida de FormData
      setFormData((prev) => ({
        ...prev,
        [parentKey as keyof FormData]: {
          ...(prev[parentKey as keyof FormDataFornecedor] as object),
          [childKey]: value,
        },
      }));
    } else {
      // Para campos de nível superior
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdicionando(true);
    try {
      const response = await api.post("/api/fornecedor", formData);
      setFornecedor([...fornecedores, response.data.data]);
      toast.success("Fornecedor adicionado.", {
        className:
          "bg-green-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("Fornecedor adicionado:", response.data.data);
    } catch (error) {
      toast.error("Erro ao tentar adicionar fornecedor.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.error("Erro ao adicionar fornecedor:", error);
    } finally {
      setFormData({
        nome: "",
        dataNascimento: "",
        telefone: "",
        documento: { documento: "", tipo: "" },
        endereco: { uf: "", cidade: "", rua: "", bairro: "", numero: "" },
        cpf: "",
        tipo: "",
      });
      setAdicionando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-600 w-full md:w-[200px]">
          Adicionar Fornecedor
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[1200px] h-screen md:h-[450px] flex flex-col items-center overflow-y-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Fornecedor
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="nome">Nome Completo:</label>
                <Input
                  name="nome"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o nome completo..."
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="dataNascimento">Data Nascimento:</label>
                <Input
                  name="dataNascimento"
                  className="border-2 font-medium text-black w-[250px]"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) =>
                    handleInputChange("dataNascimento", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="telefone">Telefone:</label>
                <Input
                  name="telefone"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o número..."
                  value={formData.telefone}
                  onChange={(e) =>
                    handleInputChange("telefone", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="documento">Documento:</label>
                <Input
                  name="documento"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o número do documento..."
                  value={formData.documento.documento}
                  onChange={(e) =>
                    handleInputChange("documento.documento", e.target.value)
                  }
                />
              </div>
              <RadioGroup
                onValueChange={(value) =>
                  handleInputChange("documento.tipo", value)
                }
                value={formData.documento.tipo}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rg" id="rg" />
                  <label htmlFor="rg">RG</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cnpj" id="cnpj" />
                  <label htmlFor="cnh">CNPJ</label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="uf">UF:</label>
                <Input
                  name="uf"
                  type="text"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o Estado..."
                  value={formData.endereco.uf}
                  onChange={(e) =>
                    handleInputChange("endereco.uf", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="cidade">Cidade:</label>
                <Input
                  name="cidade"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite a cidade..."
                  value={formData.endereco.cidade}
                  onChange={(e) =>
                    handleInputChange("endereco.cidade", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="rua">Rua:</label>
                <Input
                  name="rua"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite a rua..."
                  value={formData.endereco.rua}
                  onChange={(e) =>
                    handleInputChange("endereco.rua", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="bairro">Bairro:</label>
                <Input
                  name="bairro"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o bairro..."
                  value={formData.endereco.bairro}
                  onChange={(e) =>
                    handleInputChange("endereco.bairro", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="numero">Número:</label>
                <Input
                  name="numero"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o nome completo..."
                  value={formData.endereco.numero}
                  onChange={(e) =>
                    handleInputChange("endereco.numero", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="cpf">CPF:</label>
                <Input
                  name="cpf"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite cpf..."
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="tipo">Tipo Pessoa:</label>
              <Select
                name="tipo"
                value={formData.tipo}
                onValueChange={(value) => handleInputChange("tipo", value)}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione o tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    <SelectItem value="física">Física</SelectItem>
                    <SelectItem value="jurídica">Juridica</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button type="submit" className="w-[250px]">
              {adicionando ? (
                <Image
                  src={loading}
                  alt="loading"
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
