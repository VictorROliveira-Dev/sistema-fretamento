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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Cliente,
  Fornecedor,
  IReceitas,
  Motorista,
  Viagem,
} from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loading from "@/app/assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import editIcon from "@/app/assets/edit.svg";
interface DespesasProps {
  setReceitas: React.Dispatch<React.SetStateAction<IReceitas[]>>;
  receitas: IReceitas[];
  receita: IReceitas;
}

export default function DialogEditarReceita({
  setReceitas,
  receitas,
  receita,
}: DespesasProps) {
  const [receitaEditada, setReceitaEditada] = useState<IReceitas>(receita);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  //const [formaPagamento, setFormaPagamento] = useState<string | "">("");
  const [viagems, setViagems] = useState<Viagem[]>([]);
  const [tipoResponsavel, setTipoResponsavel] = useState<string | "">("");
  const [editando, setEditando] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          motoristaResponse,
          clienteResponse,
          fornecedorResponse,
          viagemResponse,
        ] = await Promise.all([
          api.get("/motorista"),
          api.get("/cliente"),
          api.get("/api/fornecedor"),
          api.get("/viagem"),
        ]);

        setMotoristas(motoristaResponse.data.data);
        setClientes(clienteResponse.data.data);
        setFornecedores(fornecedorResponse.data.data);
        setViagems(viagemResponse.data.data);
      } catch (error) {
        console.log("Erro ao tentar recuperar os dados", error);
      }
    };

    fetchData();
  }, []);
  const getClienteNome = (clientId: number) => {
    if (!clientes) return "Carregando clientes...";
    const cliente = clientes.find((cliente) => cliente.id === clientId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEditando(true);

    try {
      const response = await api.put(`/despesa/${receita.id}`, receitaEditada);
      if (!response.data.isSucces) {
        toast(response.data.message);
      }
      const receitasAtualizadas = receitas.filter((d) => d.id !== receita.id);
      setReceitas([...receitasAtualizadas, receitaEditada]);
      toast.success("despesa atualizada com sucesso");
      setEditando(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast.error("Erro ao tentar atualizar despesa.");
        }
      }
    } finally {
      setEditando(false);
    }
  };

  const getResponsaveis = () => {
    switch (tipoResponsavel) {
      case "motorista":
        return motoristas;
      case "cliente":
        return clientes;
      case "fornecedor":
        return fornecedores;
      default:
        return [];
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="hover:scale-110"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-screen md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Editar Receita</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">Informacoes</legend>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <label htmlFor="centrocusto">Centro de Custo:</label>
                <Select
                  required
                  name="centrocusto"
                  value={receitaEditada.centroCusto}
                  onValueChange={(value) =>
                    setReceitaEditada({ ...receitaEditada, centroCusto: value })
                  }
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Centro de Custo</SelectLabel>
                      <SelectItem value="terceiros">Terceiros</SelectItem>
                      <SelectItem value="multas">Multas</SelectItem>
                      <SelectItem value="viagens">Viagens</SelectItem>
                      <SelectItem value="estacionamento">
                        Estacionamento
                      </SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="origemPagamento">Tipo Responsável:</label>
                <select
                  required
                  name="origemPagamento"
                  value={receitaEditada.origemPagamento}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setTipoResponsavel(selectedType);
                    setReceitaEditada({
                      ...receitaEditada,
                      responsavelId: 0,
                      origemPagamento: selectedType,
                    });
                  }}
                  className="w-[250px] border rounded-md p-2"
                >
                  <option value="" disabled>
                    Selecione o tipo...
                  </option>
                  <option value="motorista">Motorista</option>
                  <option value="cliente">Cliente</option>
                  <option value="fornecedor">Fornecedor</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="responsavel">Responsável:</label>
                <select
                  required
                  name="responsavel"
                  value={receitaEditada.responsavelId}
                  onChange={(e) => {
                    const responsavelSelecionado = getResponsaveis().find(
                      (r) => r.id === Number(e.target.value)
                    );
                    setReceitaEditada({
                      ...receitaEditada,
                      responsavelId: responsavelSelecionado
                        ? responsavelSelecionado.id
                        : 0,
                      responsavel: responsavelSelecionado || undefined,
                    });
                  }}
                  className="w-[250px] border rounded-md p-2"
                  disabled={!tipoResponsavel}
                >
                  <option value="">{receitaEditada.responsavel?.nome}</option>
                  {getResponsaveis().map((responsavel) => (
                    <option key={responsavel.id} value={responsavel.id}>
                      {responsavel.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="viagem">Viagem:</label>
                <Select
                  required
                  name="viagem"
                  value={receitaEditada.viagemId.toString()}
                  onValueChange={(e) => {
                    const viagemSelecionada = viagems.find(
                      (r) => r.id === Number(e)
                    );
                    setReceitaEditada({
                      ...receitaEditada,
                      viagemId: viagemSelecionada ? viagemSelecionada.id : 0,
                      viagem: viagemSelecionada || undefined,
                    });
                  }}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {viagems.map((viagem) => (
                        <SelectItem
                          key={viagem.id}
                          value={viagem.id.toString()}
                        >
                          {new Date(
                            viagem.dataHorarioSaida.data
                          ).toLocaleDateString("pt-BR")}{" "}
                          | {getClienteNome(viagem.clienteId)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataPagamento">Data Pagamento:</label>
                <Input
                  type="date"
                  name="dataPagamento"
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.dataPagamento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      dataPagamento: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vencimento">Data Vencimento:</label>
                <Input
                  type="date"
                  name="vencimento"
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.vencimento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      vencimento: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="valorTotal">Valor Total:</label>
                <Input
                  type="number"
                  name="valorTotal"
                  placeholder="Digite o valor..."
                  className="border-2 font-medium w-[250px]"
                  value={
                    receitaEditada.valorTotal === 0
                      ? ""
                      : receitaEditada.valorTotal
                  }
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      valorTotal: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="valorParcial">Valor Pago:</label>
                <Input
                  type="number"
                  name="valorParcial"
                  placeholder="Digite o valor..."
                  className="border-2 font-medium w-[250px]"
                  value={
                    receitaEditada.valorParcial === 0
                      ? ""
                      : receitaEditada.valorParcial
                  }
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      valorParcial: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="formaPagamento">Forma Pagamento:</label>
                <Select
                  required
                  name="formaPagamento"
                  value={receitaEditada.formaPagamento}
                  onValueChange={(value) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      formaPagamento: value,
                    })
                  }
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione a forma..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pagamentos</SelectLabel>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="credito">Cartão Crédito</SelectItem>
                      <SelectItem value="debito">Cartão Débito</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="documento">Numero documento:</label>
                <Input
                  type="text"
                  name="documento"
                  placeholder="Digite o valor..."
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.numeroDocumento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      numeroDocumento: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex items-center gap-2 mt-10">
              <Button type="submit" className="w-[250px]">
                {editando ? (
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
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
