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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formFieldsReceitas } from "@/lib/objects";

export default function DialogAdicionarReceita() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Receita
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] h-[420px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Cadastro de Receita</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 w-full justify-center">
          <div>
            <label htmlFor="centrocusto">Centro de Custo:</label>
            <Select name="centrocusto">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Centro de Custo</SelectLabel>
                  <SelectItem value="extintor">Terceiros</SelectItem>
                  <SelectItem value="ipva">Multas</SelectItem>
                  <SelectItem value="CNH">Viagens</SelectItem>
                  <SelectItem value="alvara">Estacionamento</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="referencia">Situação:</label>
            <Select name="referencia">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione a situação..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Situações</SelectLabel>
                  <SelectItem value="motorista">Pago</SelectItem>
                  <SelectItem value="extintor">Não pago</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {formFieldsReceitas.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <DialogFooter className="flex items-center gap-2 mt-10">
          <Button variant="outline">Fechar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
