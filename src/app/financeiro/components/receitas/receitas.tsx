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
      </form>
      <DialogAdicionarReceita />
    </div>
  );
}
