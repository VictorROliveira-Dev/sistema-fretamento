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
import { Input } from "@/components/ui/input";

export default function DialogAdicionar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Manutenção/Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] h-[450px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Manutenção/Serviço
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 w-full justify-center">
          <div className="flex flex-col">
            <label htmlFor="manutencao">Manutenção/Serviço:</label>
            <Input
              name="manutencao"
              className="border-2 font-medium text-white w-[250px]"
              placeholder="Digite o nome..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="veiculo">Veículo:</label>
            <Input
              name="veiculo"
              className="border-2 font-medium w-[250px]"
              placeholder="Digite a placa..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="datavencimento">Data Vencimento:</label>
            <Input
              type="date"
              name="datavencimento"
              className="border-2 font-medium w-[250px]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="responsavel">Responsável:</label>
            <Input
              name="responsavel"
              className="border-2 font-medium text-white w-[250px]"
              placeholder="Digite o nome..."
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="kmprevista">KM Prevista:</label>
            <Input
              type="number"
              name="kmprevista"
              className="border-2 font-medium text-white w-[250px]"
              placeholder="Digite o número..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="kmatual">KM Atual:</label>
            <Input
              type="number"
              name="kmatual"
              className="border-2 font-medium text-white w-[250px]"
              placeholder="Digite o número..."
            />
          </div>
          <div className="flex flex-col w-[250px]">
            <label htmlFor="situacao">Situação:</label>
            <Select name="situacao">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione a situação..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Situações</SelectLabel>
                  <SelectItem value="s1">Realizada</SelectItem>
                  <SelectItem value="s2">Prevista</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
