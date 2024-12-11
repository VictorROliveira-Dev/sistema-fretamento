"use client";
import { Button } from "@/components/ui/button";
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
import editIcon from "../../assets/edit.svg";
import { useEffect, useState } from "react";
import { FormData, Motorista } from "@/lib/types";
import { api } from "@/lib/axios";

interface MotoristasProps {
  motorista: Motorista;
  setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
  motoristas: Motorista[];
}

export default function DialogEditar({
  motorista,
  setMotoristas,
  motoristas,
}: MotoristasProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    dataNascimento: "",
    telefone: "",
    documento: { documento: "", tipo: "" },
    endereco: { uf: "", cidade: "", rua: "", bairro: "", numero: "" },
    cpf: "",
    habilitacao: {
      protocolo: "",
      vencimento: "",
      categoria: "",
      cidade: "",
      uf: "",
    },
  });
  useEffect(() => {
    if (motorista) {
      setFormData({
        nome: motorista.nome || "",
        dataNascimento: motorista.dataNascimento || "",
        telefone: motorista.telefone || "",
        documento: {
          documento: motorista.documento?.documento || "",
          tipo: motorista.documento?.tipo || "",
        },
        endereco: {
          uf: motorista.endereco?.uf || "",
          cidade: motorista.endereco?.cidade || "",
          rua: motorista.endereco?.rua || "",
          bairro: motorista.endereco?.bairro || "",
          numero: motorista.endereco?.numero || "",
        },
        cpf: motorista.cpf || "",
        habilitacao: {
          protocolo: motorista.habilitacao?.protocolo || "",
          vencimento: motorista.habilitacao?.vencimento || "",
          categoria: motorista.habilitacao?.categoria || "",
          cidade: motorista.habilitacao?.cidade || "",
          uf: motorista.habilitacao?.uf || "",
        },
      });
    }
  }, [motorista]);
  const handleInputChange = (name: string, value: string) => {
    // Para campos aninhados
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      // Adicione uma asserção de tipo para garantir que parentKey é uma chave válida de FormData
      setFormData((prev) => ({
        ...prev,
        [parentKey as keyof FormData]: {
          ...(prev[parentKey as keyof FormData] as object),
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
    try {
      const response = await api.put(`/motorista/${motorista.id}`, formData);
      const motoristaAtualizado = response.data.data;

      // Atualiza a lista de motoristas com o motorista editado
      const motoristasAtualizados = motoristas.map((m) =>
        m.id === motoristaAtualizado.id ? motoristaAtualizado : m
      );

      setMotoristas(motoristasAtualizados);
      console.log("Motorista atualizado:", motoristaAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar motorista:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image src={editIcon} alt="Editar" width={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-[500px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Motorista</DialogTitle>
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
                  <RadioGroupItem value="cnh" id="cnh" />
                  <label htmlFor="cnh">CNH</label>
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
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="protocolo">Protocolo:</label>
                <Input
                  name="protocolo"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o protocolo..."
                  value={formData.habilitacao.protocolo}
                  onChange={(e) =>
                    handleInputChange("habilitacao.protocolo", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="vencimento">Vencimento:</label>
                <Input
                  name="vencimento"
                  className="border-2 font-medium text-black w-[250px]"
                  type="date"
                  value={formData.habilitacao.vencimento}
                  onChange={(e) =>
                    handleInputChange("habilitacao.vencimento", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="categoria">Categoria:</label>
                <Input
                  name="categoria"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite a categoria..."
                  value={formData.habilitacao.categoria}
                  onChange={(e) =>
                    handleInputChange("habilitacao.categoria", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="cidade">Cidade CNH:</label>
                <Input
                  name="cidade"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite a cidade..."
                  value={formData.habilitacao.cidade}
                  onChange={(e) =>
                    handleInputChange("habilitacao.cidade", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="uf">UF CNH:</label>
                <Input
                  name="uf"
                  className="border-2 font-medium text-black w-[250px]"
                  placeholder="Digite o Estado..."
                  value={formData.habilitacao.uf}
                  onChange={(e) =>
                    handleInputChange("habilitacao.uf", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button variant="outline" type="button">
              Fechar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
