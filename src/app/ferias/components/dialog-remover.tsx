import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { Ferias } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import removeIcon from "@/app/assets/remove.svg";
import loading from "@/app/assets/loading.svg";
interface RemoverProps {
  ferias: Ferias;
  setFerias: React.Dispatch<React.SetStateAction<Ferias[]>>;
}

export default function DialogRemover({ ferias, setFerias }: RemoverProps) {
  const router = useRouter();
  const [removendo, setRemovendo] = useState(false);

  const handleRemoverDocumento = async (id: number) => {
    setRemovendo(true);
    try {
      const response = await api.delete(`/ferias/${id}`);
      if (!response.data.isSucces) {
        toast("erro ao tentar remover ferias do historico");
      }
      setFerias((prevDocumento) => prevDocumento.filter((d) => d.id !== id));
      toast.success("Documento removido.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast.error("Erro ao tentar remover do historico.");
        }
      }
    } finally {
      setRemovendo(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[350px] md:h-[150px] flex flex-col items-center rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover essas ferias do historico ?
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium text-center">
            Essa ação não poderá ser desfeita
          </p>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverDocumento(ferias.id)}
          >
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