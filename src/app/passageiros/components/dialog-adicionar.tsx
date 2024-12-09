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
import { formFieldsPessoas } from "@/lib/objects";

export default function DialogAdicionar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Passageiro
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] h-[520px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Passageiro
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 w-full justify-center">
          {formFieldsPessoas.map((field) => (
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
