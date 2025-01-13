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
  IDespesas,
  Motorista,
  Responsavel,
  Viagem,
} from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loading from "@/app/assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DespesasProps {
  setDespesas: React.Dispatch<React.SetStateAction<IDespesas[]>>;
  despesas: IDespesas[];
}

export default function DialogAdicionarDespesa({
  setDespesas,
  despesas,
}: DespesasProps) {
  const [dataCompra, setDataCompra] = useState<string | "">("");
  const [dataPagamento, setDataPagamento] = useState<string | "">("");
  const [origemPagamento, setOrigemPagamento] = useState<string | "">("");
  const [responsavelId, setResponsavelId] = useState<number | "">();
  const [responsavel, setResponsavel] = useState<Responsavel>();
  const [vencimento, setVencimento] = useState<string | undefined>("");
  //const [pago, setPago] = useState(false);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [valorParcial, setValorParcial] = useState<number>(0);
  const [formaPagamento, setFormaPagamento] = useState<string | "">("");
  const [centroCusto, setCentroCusto] = useState<string | "">("");
  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
  const [viagems, setViagems] = useState<Viagem[]>([]);
  const [tipoResponsavel, setTipoResponsavel] = useState<string | "">("");
  //const [descricao, setDescricao] = useState<string | "">("");
  const [viagemId, setViagemId] = useState<number>(0);
  const [editando, setEditando] = useState(false);
  const [viagem, setViagem] = useState<Viagem>();
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

        setMotorista(motoristaResponse.data.data);
        setClientes(clienteResponse.data.data);
        setFornecedor(fornecedorResponse.data.data);
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

    const despesasData = {
      dataPagamento: dataPagamento,
      dataCompra: dataCompra,
      origemPagamento: origemPagamento,
      responsavelId: Number(responsavelId),
      viagemId: Number(viagemId),
      vencimento: vencimento,
      //pago,
      valorTotal: valorTotal,
      valorParcial: valorParcial,
      formaPagamento: formaPagamento,
      centroCusto: centroCusto,
      responsavel: responsavel,
      viagem: viagem,
    } as IDespesas;

    try {
      await api.post("/despesa", despesasData);
      setDespesas([...despesas, despesasData]);
      toast.success("Despesa adicionada.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      setEditando(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast.error("Erro ao tentar remover peca.");
        }
      }
    } finally {
      setEditando(false);
    }
  };

  const getResponsaveis = () => {
    switch (tipoResponsavel) {
      case "motorista":
        return motorista;
      case "cliente":
        return clientes;
      case "fornecedor":
        return fornecedor;
      default:
        return [];
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-green-600 hover:bg-green-500 w-[230px] md:w-[200px] p-1 text-center rounded-md text-white cursor-pointer transition-all">
          Adicionar Despesa
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-screen md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Despesa</DialogTitle>
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
                  value={centroCusto}
                  onValueChange={(value) => setCentroCusto(value)}
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
                  value={tipoResponsavel}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setTipoResponsavel(selectedType);
                    setResponsavelId("");
                    setOrigemPagamento(selectedType);
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
                  value={responsavelId}
                  onChange={(e) => {
                    const responsavelSelecionado = getResponsaveis().find(
                      (r) => r.id === Number(e.target.value)
                    );
                    setResponsavelId(
                      responsavelSelecionado ? responsavelSelecionado.id : 0
                    );
                    setResponsavel(responsavelSelecionado || undefined); // Atualiza o estado com o objeto completo
                  }}
                  className="w-[250px] border rounded-md p-2"
                  disabled={!tipoResponsavel}
                >
                  <option value="" disabled>
                    Selecione o responsável...
                  </option>
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
                  value={viagemId.toString()}
                  onValueChange={(e) => {
                    const viagemSelecionada = viagems.find(
                      (r) => r.id === Number(e)
                    );
                    setViagemId(viagemSelecionada ? viagemSelecionada.id : 0);
                    setViagem(viagemSelecionada || undefined); // Atualiza o estado com o objeto completo
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
                  value={dataPagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="descricao">Descricao:</label>
                <Input
                  type="text"
                  name="descricao"
                  className="border-2 font-medium w-[250px]"
                  value={dataPagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataCompra">Data Compra:</label>
                <Input
                  type="date"
                  name="DataCompra"
                  className="border-2 font-medium w-[250px]"
                  value={dataCompra}
                  onChange={(e) => setDataCompra(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vencimento">Data Vencimento:</label>
                <Input
                  type="date"
                  name="vencimento"
                  className="border-2 font-medium w-[250px]"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
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
                  value={valorTotal === 0 ? "" : valorTotal}
                  onChange={(e) => setValorTotal(Number(e.target.value))}
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
                  value={valorParcial === 0 ? "" : valorParcial}
                  onChange={(e) => setValorParcial(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="formaPagamento">Forma Pagamento:</label>
                <Select
                  required
                  name="formaPagamento"
                  value={formaPagamento}
                  onValueChange={(value) => setFormaPagamento(value)}
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
