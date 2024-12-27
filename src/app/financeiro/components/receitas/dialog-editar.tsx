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
  IReceitas,
  Motorista,
  Viagem,
} from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";
import { toast } from "sonner";

interface ReceitaProps {
  receita: IReceitas;
  setReceitas: React.Dispatch<React.SetStateAction<IReceitas[]>>;
  receitas: IReceitas[];
}

export default function DialogEditarDespesa({
  receita,
  setReceitas,
  receitas,
}: ReceitaProps) {
  const [dataEmissao, setDataEmissao] = useState<string | "">("");
  const [dataCompra, setDataCompra] = useState<string | "">("");
  const [origemPagamento, setOrigemPagamento] = useState<string | "">("");
  const [numeroDocumento, setNumeroDocumento] = useState<string | "">("");
  const [responsavelId, setResponsavelId] = useState<number | "">();
  const [vencimento, setVencimento] = useState<string | undefined>("");
  const [pago, setPago] = useState(false);
  const [valorTotal, setValorTotal] = useState<number>();
  const [valorParcial, setValorParcial] = useState<number>();
  const [formaPagamento, setFormaPagamento] = useState<string | "">("");
  const [centroCusto, setCentroCusto] = useState<string | "">("");

  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
  const [viagem, setViagem] = useState<Viagem[]>([]);
  const [tipoResponsavel, setTipoResponsavel] = useState<string | "">("");
  const [viagemSelecionada, setViagemSelecionada] = useState<
    string | undefined
  >("");

  useEffect(() => {
    setDataEmissao(
      receita.dataEmissao
        ? new Date(receita.dataEmissao).toISOString().split("T")[0]
        : ""
    );
    setDataCompra(
      receita.dataCompra
        ? new Date(receita.dataCompra).toISOString().split("T")[0]
        : ""
    );
    setVencimento(
      receita.vencimento
        ? new Date(receita.vencimento).toISOString().split("T")[0]
        : ""
    );
    setOrigemPagamento(receita.origemPagamento);
    setNumeroDocumento(receita.numeroDocumento);
    setViagemSelecionada(receita.viagemId.toString());
    setValorTotal(receita.valorTotal);
    setValorParcial(receita.valorParcial);
    setFormaPagamento(receita.formaPagamento.toString());
    setResponsavelId(receita.responsavelId);

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
    if (!clientes) return "Carregando clientes...";
    const cliente = clientes.find((cliente) => cliente.id === clientId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const receitaData = {
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
      const response = await api.put(`/despesa/${receita.id}`, receitaData);

      const receitaAtualizada = response.data.data;
      receitaAtualizada.responsavel = receita.responsavel;

      const receitasAtualizadas = receitas.map((r) => {
        return r.id === receitaAtualizada.id ? receitaAtualizada : r;
      });
      setReceitas(receitasAtualizadas);
      toast.success("Receita atualizada.", {
        className: "text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      console.log("Receita atualizada com sucesso", response.data.data);
    } catch (error) {
      console.error("Erro ao tentar atualizar despesa", error);
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
      <DialogContent className="md:w-[850px] h-screen md:h-[690px] flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Receita</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">Receita</legend>
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
              <div className="flex flex-col ">
                <label htmlFor="responsavel">Responsável:</label>
                <Input value={responsavelId} disabled className="w-[250px]" />
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
                      {new Date(
                        viagem.dataHorarioSaida.data
                      ).toLocaleDateString("pt-BR")}{" "}
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
                  onChange={(e) => setDataEmissao(e.target.value)}
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
                  onChange={(e) => setVencimento(e.target.value)}
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
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
