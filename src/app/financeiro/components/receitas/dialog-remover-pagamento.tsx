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
import Image from "next/image";
import { IReceitas } from "@/lib/types";
import { useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import removeIcon from "../../../assets/remove.svg";
import loading from "../../../assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ReceitaProps {
  pagamentoId: number;
  receita: IReceitas;
  setReceita: React.Dispatch<React.SetStateAction<IReceitas>>;
}

export default function DialogRemoverPagamento({
  pagamentoId,
  setReceita,
  receita,
}: ReceitaProps) {
  const [removendo, ] = useState(false);
  const router = useRouter();
  async function removerPagamento() {
    try {
      const response = await api.delete(`/pagamento/${pagamentoId}`);

      if (!response.data.isSucces) {
        toast("erro ao tentar remover pagamento");
      }

      const pagamentosAtualizados = receita.pagamentos.filter(
        (p) => p.id !== pagamentoId
      );
      setReceita({
        ...receita,
        pagamentos: pagamentosAtualizados,
      });
      toast("pagamento adicionado com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
      toast("erro ao tentar remover pagamento");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image src={removeIcon} alt="Remover" width={25} className="w-6" />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o pagamento?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button className="bg-red-500" onClick={() => removerPagamento()}>
            {removendo ? (
              <Image
                src={loading}
                alt="loading"
                className="text-center animate-spin"
              />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
