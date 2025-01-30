import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { DespesaMensal, Responsavel, Salario } from "@/lib/types";
import loadingIcon from "@/app/assets/loading.svg";
import Image from "next/image";
interface AddFinancialProps {
  setDespesas: React.Dispatch<React.SetStateAction<DespesaMensal[]>>;
  despesas: DespesaMensal[];
  salarios: Salario[];
  setSalarios: React.Dispatch<React.SetStateAction<Salario[]>>;
}

export function FinancialDialogs({
  setDespesas,
  despesas,
  salarios,
  setSalarios,
}: AddFinancialProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const { register: registerExpense, handleSubmit: handleExpenseSubmit } =
    useForm();
  const {
    register: registerSalary,
    handleSubmit: handleSalarySubmit,
    setValue,
  } = useForm();

  async function fetchResponsaveis() {
    try {
      setLoading(true);
      const [motoristasResponse, colaboradoresResponse] = await Promise.all([
        api.get("/motorista"),
        api.get("/colaborador"),
      ]);

      const motoristas = (motoristasResponse.data.data as Responsavel[]) || [];
      const colaboradores =
        (colaboradoresResponse.data.data as Responsavel[]) || [];

      setResponsaveis([...motoristas, ...colaboradores]);
    } catch (error) {
      toast("Erro ao tentar buscar dados");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResponsaveis();
  }, []);

  const onExpenseSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await api.post("/despesamensal/despesamensal", data);
      if (!response.data.isSucces) {
        toast("Erro ao tentar registrar despesa");
        return;
      }

      setDespesas([...despesas, response.data.data]);
    } catch (error) {
      toast("Erro ao tentar registrar despesa");
    } finally {
      setLoading(false);
    }
  };

  const onSalarySubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await api.post("/despesamensal", data);
      if (!response.data.isSucces) {
        toast("Erro ao tentar registrar despesa");
        return;
      }

      setSalarios([...salarios, response.data.data]);
    } catch (error) {
      toast("Erro ao tentar registrar despesa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      {/* Add Monthly Expense Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-700 text-white">
            Nova Despesa Mensal
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Nova Despesa Mensal</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleExpenseSubmit(onExpenseSubmit)}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="DataPagamento">Data de Pagamento</Label>
              <Input
                min={1}
                max={31}
                type="number"
                id="DataPagamento"
                required
                {...registerExpense("DiaPagamento")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ValorTotal">Valor Total</Label>
              <Input
                type="number"
                step="0.01"
                id="ValorTotal"
                required
                {...registerExpense("ValorTotal")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="CentroDeCusto">Centro de Custo</Label>
              <Input
                id="CentroDeCusto"
                required
                {...registerExpense("CentroDeCusto")}
              />
            </div>

            <Button type="submit">
              {loading ? (
                <Image
                  src={loadingIcon}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Salary Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-700 text-white">
            Novo Salário
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Novo Salário</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSalarySubmit(onSalarySubmit)}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="DataVale">Dia do Vale</Label>
              <Input
                type="number"
                id="DataVale"
                min={1}
                max={31}
                required
                {...registerSalary("DiaVale")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="DataSalario">Dia do Salário</Label>
              <Input
                type="number"
                min={1}
                max={31}
                id="DataSalario"
                required
                {...registerSalary("DiaSalario")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ValorTotal">Valor Total</Label>
              <Input
                type="number"
                step="0.01"
                id="ValorTotal"
                required
                {...registerSalary("ValorTotal")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ResponsavelId">Responsável</Label>
              <Select
                onValueChange={(value) => setValue("ResponsavelId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveis.map((responsavel) => (
                    <SelectItem value={responsavel.id.toString()}>
                      {responsavel.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">
              {loading ? (
                <Image
                  src={loadingIcon}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
