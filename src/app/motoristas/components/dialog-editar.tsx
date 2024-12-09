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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formFieldsMotoristas } from "@/lib/objects";
import Image from "next/image";
import editIcon from "../../assets/edit.svg";

export default function DialogEditar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image src={editIcon} alt="Editar" width={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1100px] h-[550px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Edição de Motorista
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 w-full justify-center">
          {formFieldsMotoristas.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}

          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="documento">Documento:</label>
              <Input
                name="documento"
                className="border-2 font-medium text-white w-[250px]"
                placeholder="Digite o número do documento..."
              />
            </div>
            <RadioGroup defaultValue="rg" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rg" id="r2" />
                <label htmlFor="r2">RG</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cnh" id="r3" />
                <label htmlFor="r3">CNH</label>
              </div>
            </RadioGroup>
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
