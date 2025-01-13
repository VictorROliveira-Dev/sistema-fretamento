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
import { Cliente, Fornecedor, IDespesas, Motorista, Viagem } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loading from "@/app/assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import editIcon from "@/app/assets/edit.svg";
interface DespesasProps {
  setDespesas: React.Dispatch<React.SetStateAction<IDespesas[]>>;
  despesas: IDespesas[];
  despesa: IDespesas;
}

export default function DialogEditarDespesa({
  setDespesas,
  despesas,
  despesa,
}: DespesasProps) {
  const [despesaEditada, setDespesaEditada] = useState<IDespesas>(despesa);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
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
      const response = await api.put(`/despesa/${despesa.id}`, despesaEditada);
      if (!response.data.isSucces) {
        toast(response.data.message);
      }
      const despesasAtualizada = despesas.filter((d) => d.id !== despesa.id);
      setDespesas([...despesasAtualizada, despesaEditada]);
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
          <DialogTitle className="font-black">Editar Despesa</DialogTitle>
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
                  value={despesaEditada.centroCusto}
                  onValueChange={(value) =>
                    setDespesaEditada({ ...despesaEditada, centroCusto: value })
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
                  value={despesa.origemPagamento}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setTipoResponsavel(selectedType);
                    setDespesaEditada({
                      ...despesaEditada,
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
                  value={despesaEditada.responsavelId}
                  onChange={(e) => {
                    const responsavelSelecionado = getResponsaveis().find(
                      (r) => r.id === Number(e.target.value)
                    );
                    setDespesaEditada({
                      ...despesa,
                      responsavelId: responsavelSelecionado
                        ? responsavelSelecionado.id
                        : 0,
                      responsavel: responsavelSelecionado || undefined,
                    });
                  }}
                  className="w-[250px] border rounded-md p-2"
                  disabled={!tipoResponsavel}
                >
                  <option value="">{despesaEditada.responsavel?.nome}</option>
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
                  value={despesaEditada.viagemId.toString()}
                  onValueChange={(e) => {
                    const viagemSelecionada = viagems.find(
                      (r) => r.id === Number(e)
                    );
                    setDespesaEditada({
                      ...despesaEditada,
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
                  value={despesaEditada.dataPagamento}
                  onChange={(e) =>
                    setDespesaEditada({
                      ...despesa,
                      dataPagamento: e.target.value,
                    })
                  }
                  required
                />
              </div> <div className="flex flex-col">
                <label htmlFor="descricao">Descricao:</label>
                <Input
                  type="text"
                  name="descricao"
                  className="border-2 font-medium w-[250px]"
                  value={despesaEditada.descricao}
                  onChange={(e) =>
                    setDespesaEditada({
                      ...despesa,
                      descricao: e.target.value,
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
                  value={despesaEditada.vencimento}
                  onChange={(e) =>
                    setDespesaEditada({
                      ...despesaEditada,
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
                    despesaEditada.valorTotal === 0
                      ? ""
                      : despesaEditada.valorTotal
                  }
                  onChange={(e) =>
                    setDespesaEditada({
                      ...despesaEditada,
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
                    despesaEditada.valorParcial === 0
                      ? ""
                      : despesaEditada.valorParcial
                  }
                  onChange={(e) =>
                    setDespesaEditada({
                      ...despesaEditada,
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
                  value={despesaEditada.formaPagamento}
                  onValueChange={(value) =>
                    setDespesaEditada({
                      ...despesaEditada,
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
