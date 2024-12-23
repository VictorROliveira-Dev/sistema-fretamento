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
import { Cidade, Passageiro, Uf } from "@/lib/types";

interface ClienteProps {
  passageiros: Passageiro[];
  setPassageiros: React.Dispatch<React.SetStateAction<Passageiro[]>>;
}

export default function DialogAdicionar({
  passageiros,
  setPassageiros,
}: ClienteProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [passageiro, setPassageiro] = useState<Passageiro>({
    id: 0,
    nome: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    documento: {
      documento: "",
      tipo: "",
    },
    endereco: {
      uf: "",
      cidade: "",
      rua: "",
      bairro: "",
      numero: "",
    },
    cartao: "",
    matricula: "",
  });

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
    setPassageiro((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, uf },
    }));

    axios
      .get<Cidade[]>(
        ` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await api.post("/passageiro", passageiro);
    if (!response.data.isSuccess) {
      console.error(response.data.message);
      return;
    }

    setPassageiros([...passageiros, response.data.data]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-10 bg-green-600">Adicionar Cliente</Button>
      </DialogTrigger>
      <DialogContent className="w-auto h-[90%] overflow-y-scroll mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Formulário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-10 items-start">
            <fieldset className="border p-4 rounded">
              <legend className="font-semibold">Cliente</legend>
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  onChange={(e) =>
                    setPassageiro({ ...passageiro, nome: e.target.value })
                  }
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  type="date"
                  id="dataNascimento"
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
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
                  onChange={(e) =>
                    setPassageiro({ ...passageiro, telefone: e.target.value })
                  }
                />
              </div>
              {/* CPF */}
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  onChange={(e) =>
                    setPassageiro({ ...passageiro, cpf: e.target.value })
                  }
                />
              </div>

              {/* Documento */}
              <div>
                <Label htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      documento: {
                        ...passageiro.documento,
                        documento: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={passageiro.documento.tipo}
                  onValueChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      documento: {
                        ...passageiro.documento,
                        tipo: e,
                      },
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

              <div>
                <Label htmlFor="cartao">Cartao</Label>
                <Input
                  id="cartao"
                  value={passageiro.cartao}
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      cartao: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="matricula">Matricula</Label>
                <Input
                  value={passageiro.matricula}
                  id="matricula"
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      matricula: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>

            {/* Endereço */}
            <fieldset className="border p-4 rounded">
              <legend className="font-semibold">Endereço</legend>
              <div className="">
                <Label htmlFor="uf">UF</Label>
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
                <Label htmlFor="cidade">Cidade</Label>
                <select
                  id="cidade"
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      endereco: {
                        ...passageiro.endereco,
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

              <div className="mt-4">
                <Label htmlFor="rua">Rua</Label>
                <Input
                  id="rua"
                  value={passageiro.endereco.rua}
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      endereco: {
                        ...passageiro.endereco,
                        rua: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={passageiro.endereco.bairro}
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      endereco: {
                        ...passageiro.endereco,
                        bairro: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={passageiro.endereco.numero}
                  onChange={(e) =>
                    setPassageiro({
                      ...passageiro,
                      endereco: {
                        ...passageiro.endereco,
                        numero: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </fieldset>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full mt-8">
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
