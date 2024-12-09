import BusSelector from "@/components/bus-selector";
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
import { formFieldsPassagens } from "@/lib/objects";
import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";

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
      <DialogContent className="w-[1200px] h-[600px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Edição de Passagem</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 w-full justify-center">
          <div>
            <label htmlFor="passageiro">Passageiro:</label>
            <Select name="passageiro">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione o passageiro..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Passageiros</SelectLabel>
                  <SelectItem value="v1">João</SelectItem>
                  <SelectItem value="v2">Miguel</SelectItem>
                  <SelectItem value="v3">Angélica</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="viagem">Viagem:</label>
            <Select name="viagem">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione a viagem..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Viagens</SelectLabel>
                  <SelectItem value="v1">Salvador </SelectItem>
                  <SelectItem value="v2">Santa Cruz</SelectItem>
                  <SelectItem value="v3">Ilhéus</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="pagamento">Tipo Pagamento:</label>
            <Select name="pagamento">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione o tipo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pagamentos</SelectLabel>
                  <SelectItem value="v1">PIX</SelectItem>
                  <SelectItem value="v2">Cartão Crédito</SelectItem>
                  <SelectItem value="v3">Cartão Débito</SelectItem>
                  <SelectItem value="v3">Dinheiro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="situacao">Situação:</label>
            <Select name="situacao">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione a situação..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Situações</SelectLabel>
                  <SelectItem value="v1">Pago</SelectItem>
                  <SelectItem value="v2">Pendente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {formFieldsPassagens.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <BusSelector />
        <DialogFooter className="flex items-center gap-2 mt-10">
          <Button variant="outline">Fechar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
