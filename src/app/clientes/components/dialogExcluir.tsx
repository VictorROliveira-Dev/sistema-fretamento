import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import removeIcon from "@/app/assets/remove.svg";
import Image from "next/image";

interface ExcluirProps {
  clienteName: string;
  clienteId: number;
}
export default function DialogExcluir({
  clienteName,
  clienteId,
}: ExcluirProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </DialogTrigger>
        <DialogContent className="w-[90%] md:w-[50%] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-center">
              <p>
                Você tem certeza que quer excluir o cliente{" "}
                <strong className="text-red-500">{clienteName}</strong>?
              </p>
            </DialogTitle>
            <DialogDescription className="text-center">
              Se você remover este cliente não terá como voltar atrás
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-transparent border border-red-600 text-red-600"
            >
              Quero Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
