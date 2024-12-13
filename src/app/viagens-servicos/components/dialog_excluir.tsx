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
import removeIcon from "../../assets/remove.svg";
import { Viagem } from "@/lib/types";
import { api } from "@/lib/axios";

interface ExcluirProps {
  setViagens: React.Dispatch<React.SetStateAction<Viagem[]>>;
  viagens: Viagem[];
  id: Number;
}

export function DialogExcluir({ setViagens, viagens, id }: ExcluirProps) {
  async function excluirViagem() {
    const response = await api.delete(`/viagem/${id}`);

    if (!response.data.isSucces) {
      console.log(response.data.message);
      return;
    }

    setViagens(viagens.filter((v) => v.id !== id));
    alert("excluida com sucesso");
  }
  return (
    <>
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
        <DialogContent className="w-[350px] h-[150px] flex flex-col items-center">
          <DialogHeader className="mb-5">
            <DialogTitle className="font-black">
              Deseja remover está viagem?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex items-center">
            <Button className="bg-red-500" onClick={() => excluirViagem()}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
