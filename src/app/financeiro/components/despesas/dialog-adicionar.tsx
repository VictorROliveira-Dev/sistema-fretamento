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
import { FormEvent, useEffect, useState } from "react";
import { Cliente, Fornecedor, IDespesas, Motorista, Viagem } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import loading from "../../../assets/loading.svg";

interface DespesaProps {
  despesas: IDespesas[];
  setDespesas: React.Dispatch<React.SetStateAction<IDespesas[]>>;
}

export default function DialogAdicionarDespesa({
  despesas,
  setDespesas,
}: DespesaProps) {
  const [dataEmissao, setDataEmissao] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [origemPagamento, setOrigemPagamento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [responsavelId, setResponsavelId] = useState<number | "">();
  const [vencimento, setVencimento] = useState("");
  const [pago, setPago] = useState(false);
  const [valorTotal, setValorTotal] = useState<number>();
  const [valorParcial, setValorParcial] = useState<number>();
  const [formaPagamento, setFormaPagamento] = useState("");
  const [centroCusto, setCentroCusto] = useState("");

  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
  const [viagem, setViagem] = useState<Viagem[]>([]);
  const [tipoResponsavel, setTipoResponsavel] = useState("");
  const [viagemSelecionada, setViagemSelecionada] = useState<
    string | undefined
  >("");

  const [adicionando, setAdicionando] = useState(false);

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
        setViagem(viagemResponse.data.data);
      } catch (error) {
        console.log("Erro ao tentar recuperar os dados", error);
      }
    };

    fetchData();
  }, []);
  const getClienteNome = (clientId: any) => {
    const cliente = clientes.find((cliente) => cliente.id === clientId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAdicionando(true);

    const despesasData = {
      dataEmissao,
      dataCompra,
      origemPagamento,
      numeroDocumento,
      responsavelId: Number(responsavelId),
      viagemId: Number(viagemSelecionada),
      vencimento,
      pago,
      valorTotal,
      valorParcial,
      formaPagamento,
      centroCusto,
    };

    try {
      const response = await api.post("/despesa", despesasData);
      setDespesas([...despesas, response.data.data]);
      toast.success("Despesa adicionada.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("despesa adicionada com sucesso", response.data.data);
    } catch (error) {
      toast.error("Erro ao tentar adicionar despesa.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("erro ao tentar adicionar despesa", error);
    } finally {
      setDataEmissao("");
      setDataCompra("");
      setOrigemPagamento("");
      setNumeroDocumento("");
      setResponsavelId("");
      setVencimento("");
      setValorTotal(0);
      setValorParcial(0);
      setFormaPagamento("");
      setCentroCusto("");
      setAdicionando(false);
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
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-screen md:h-[500px] flex flex-col items-center overflow-y-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Despesa</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div>
              <label htmlFor="centrocusto">Centro de Custo:</label>
              <Select
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
              <label htmlFor="tipoResponsavel">Tipo Responsável:</label>
              <select
                name="tipoResponsavel"
                value={tipoResponsavel}
                onChange={(e) => {
                  setTipoResponsavel(e.target.value);
                  setResponsavelId("");
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
                name="responsavel"
                value={responsavelId}
                onChange={(e) => setResponsavelId(Number(e.target.value) || "")}
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
              <select
                name="viagem"
                value={viagemSelecionada}
                onChange={(e) => setViagemSelecionada(e.target.value)}
                className="w-[250px] border rounded-md p-2"
              >
                <option value="" disabled>
                  Selecione a viagem...
                </option>
                {viagem.map((viagem) => (
                  <option key={viagem.id} value={viagem.id.toString()}>
                    {new Date(viagem.dataHorarioSaida.data).toLocaleDateString(
                      "pt-BR"
                    )}{" "}
                    | {getClienteNome(viagem.clienteId)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dataEmissao">Data Emissão:</label>
              <Input
                type="date"
                name="dataEmissao"
                className="border-2 font-medium w-[250px]"
                value={dataEmissao}
                onChange={(e) => setDataEmissao(e.target.value.toString())}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dataCompra">Data Compra:</label>
              <Input
                type="date"
                name="DataCompra"
                className="border-2 font-medium w-[250px]"
                value={dataCompra}
                onChange={(e) => setDataCompra(e.target.value.toString())}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="origemPagamento">Origem Pagamento:</label>
              <Input
                name="origemPagamento"
                placeholder="Digite a origem..."
                className="border-2 font-medium w-[250px]"
                value={origemPagamento}
                onChange={(e) => setOrigemPagamento(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numeroDocumento">Número Documento:</label>
              <Input
                name="numeroDocumento"
                placeholder="Digite o número..."
                className="border-2 font-medium w-[250px]"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="vencimento">Data Vencimento:</label>
              <Input
                type="date"
                name="vencimento"
                className="border-2 font-medium w-[250px]"
                value={vencimento}
                onChange={(e) => setVencimento(e.target.value.toString())}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="valorTotal">Valor Total:</label>
              <Input
                type="number"
                name="valorTotal"
                placeholder="Digite o valor..."
                className="border-2 font-medium w-[250px]"
                value={valorTotal}
                onChange={(e) => setValorTotal(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="valorParcial">Valor Parcial:</label>
              <Input
                type="number"
                name="valorParcial"
                placeholder="Digite o valor..."
                className="border-2 font-medium w-[250px]"
                value={valorParcial}
                onChange={(e) => setValorParcial(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="formaPagamento">Forma Pagamento:</label>
              <Select
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
