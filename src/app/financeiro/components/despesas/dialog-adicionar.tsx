"use client";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { formFields } from "@/lib/objects";
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
import { Cliente, Fornecedor, Motorista } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";

export default function DialogAdicionar() {
  const [dataEmissao, setDataEmissao] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [origemPagamento, setOrigemPagamento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [responsavelId, setResponsavelId] = useState<number | "">();
  const [viagemId, setViagemId] = useState<number | "">();
  const [vencimento, setVencimento] = useState("");
  const [pago, setPago] = useState(false);
  const [valorTotal, setValorTotal] = useState<number>();
  const [valorParcial, setValorParcial] = useState<number>();
  const [formaPagamento, setFormaPagamento] = useState("");
  const [centroCusto, setCentroCusto] = useState("");

  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
  //const [viagem, setViagem] = useState<Viagem[]>([]);
  const [tipoResponsavel, setTipoResponsavel] = useState("");

  useEffect(() => {
    const fetchMotoristas = async () => {
      try {
        const response = await api.get("/motorista");
        setMotorista(response.data.data);
      } catch (error) {
        console.log("erro ao tentar recuperar motoristas", error);
      }
    };
    const fetchClientes = async () => {
      try {
        const response = await api.get("/cliente");
        setCliente(response.data.data);
      } catch (error) {
        console.log("erro ao tentar recuperar os clientes", error);
      }
    };
    const fetchFornecedor = async () => {
      try {
        const response = await api.get("/api/fornecedor");
        setFornecedor(response.data.data);
      } catch (error) {
        console.log("erro ao tentar recuperar os fornecedores", error);
      }
    };

    fetchMotoristas();
    fetchClientes();
    fetchFornecedor();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const despesasData = {
      dataEmissao,
      dataCompra,
      origemPagamento,
      numeroDocumento,
      responsavelId: Number(responsavelId),
      viagemId: Number(viagemId),
      vencimento,
      pago,
      valorTotal,
      valorParcial,
      formaPagamento,
      centroCusto,
    };

    try {
      const response = await api.post("/despesa", despesasData);
      console.log("despesa adicionada com sucesso", response.data.data);
    } catch (error) {
      console.log("erro ao tentar adicionar despesa", error);
    }
  };

  const getResponsaveis = () => {
    switch (tipoResponsavel) {
      case "motorista":
        return motorista;
      case "cliente":
        return cliente;
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
      <DialogContent className="w-[850px] h-[500px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Despesa</DialogTitle>
        </DialogHeader>
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
                  <SelectItem value="estacionamento">Estacionamento</SelectItem>
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
              onValueChange={(value) => setCentroCusto(value)}
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
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
