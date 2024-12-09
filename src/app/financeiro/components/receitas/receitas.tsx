import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DialogAdicionarReceita from "./dialog-adicionar";

export default function Receitas() {
  return (
    <div className="flex items-center justify-between">
      <form className="flex gap-2 font-bold">
        <div>
          <label htmlFor="inicio">Data inicio:</label>
          <Input type="date" name="inicio" />
        </div>
        <div>
          <label htmlFor="final">Data Final:</label>
          <Input type="date" name="final" />
        </div>
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
      </form>
      <DialogAdicionarReceita />
    </div>
  );
}
