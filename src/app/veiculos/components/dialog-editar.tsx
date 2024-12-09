import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formFieldsVeiculos } from "@/lib/objects";
import editIcon from "@/app/assets/edit.svg";
import Image from "next/image";

export default function DialogEditar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[850px] h-[600px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Veículo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 w-full justify-center">
          {formFieldsVeiculos.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
          <div>
            <hr className="border-t border-gray-300 my-2" />
            <p className="font-bold text-center mb-4">
              Selecione os Acessorios
            </p>
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                Ar Condicionado
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                Extintor
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
              >
                Parabrisas
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <DialogFooter className="flex items-center gap-2 mt-10">
          <Button variant="outline">Fechar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
