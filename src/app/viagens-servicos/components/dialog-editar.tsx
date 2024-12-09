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
import { Textarea } from "@/components/ui/textarea";
import {
  formFieldsDadosChegada,
  formFieldsDadosChegadaValores,
  formFieldsDadosSaida,
  formFieldsDadosSaidaValores,
} from "@/lib/objects";

import Image from "next/image";
import editIcon from "@/app/assets/edit.svg";

export default function DialogEditar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={editIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] max-h-[520px] flex flex-col items-center overflow-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Viagem/Serviço
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-center mb-4">Dados de Saída</p>
            <div className="grid grid-cols-2 gap-4">
              {formFieldsDadosSaida.map((field) => (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
              <div className="flex flex-col">
                <label htmlFor="tipoviagem">Tipo de Viagem:</label>
                <Select name="tipoviagem">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Viagens</SelectLabel>
                      <SelectItem value="v1">Viagem 1</SelectItem>
                      <SelectItem value="v2">Viagem 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tiposervico">Tipo de Serviço:</label>
                <Select name="tiposervico">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Serviços</SelectLabel>
                      <SelectItem value="s1">Serviço 1</SelectItem>
                      <SelectItem value="s2">Serviço 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="border-t border-2 border-black my-4" />
            <p className="font-bold text-center mt-4">
              Veículos, Motoristas e Clientes
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="veiculo">Veículo:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Veículos Disponíveis</SelectLabel>
                      <SelectItem value="veiculo1">Ônibus 1</SelectItem>
                      <SelectItem value="veiculo2">Ônibus 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="motorista">Motorista:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o motorista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Motoristas Disponíveis</SelectLabel>
                      <SelectItem value="motorista1">João</SelectItem>
                      <SelectItem value="motorista2">Maria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="clientes">Clientes:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Clientes</SelectLabel>
                      <SelectItem value="motorista1">João</SelectItem>
                      <SelectItem value="motorista2">Maria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="observacoes">Intinerário:</label>
                <Textarea
                  name="observacoes"
                  className="border-2 font-medium w-full h-20 resize-none"
                  placeholder="Adicione observações sobre a viagem..."
                />
              </div>
            </div>

            <hr className="border-t border-2 border-black my-4" />
            <p className="font-bold text-center mt-4">Valores</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="tipopagamento">Tipo Pagamento:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pagamentos</SelectLabel>
                      <SelectItem value="veiculo1">PIX</SelectItem>
                      <SelectItem value="veiculo2">Dinheiro</SelectItem>
                      <SelectItem value="veiculo2">Cartão</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {formFieldsDadosSaidaValores.map((field) => (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-center mb-4">Dados de Chegada</p>
            <div className="grid grid-cols-2 gap-4">
              {formFieldsDadosChegada.map((field) => (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
              <div className="flex flex-col">
                <label htmlFor="tipoviagem">Tipo de Viagem:</label>
                <Select name="tipoviagem">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Viagens</SelectLabel>
                      <SelectItem value="v1">Viagem 1</SelectItem>
                      <SelectItem value="v2">Viagem 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tiposervico">Tipo de Serviço:</label>
                <Select name="tiposervico">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Serviços</SelectLabel>
                      <SelectItem value="s1">Serviço 1</SelectItem>
                      <SelectItem value="s2">Serviço 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="border-t border-2 border-black my-4" />
            <p className="font-bold text-center mt-4">
              Veículos, Motoristas e Clientes
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="veiculo">Veículo:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Veículos Disponíveis</SelectLabel>
                      <SelectItem value="veiculo1">Ônibus 1</SelectItem>
                      <SelectItem value="veiculo2">Ônibus 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="motorista">Motorista:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o motorista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Motoristas Disponíveis</SelectLabel>
                      <SelectItem value="motorista1">João</SelectItem>
                      <SelectItem value="motorista2">Maria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="clientes">Clientes:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Clientes</SelectLabel>
                      <SelectItem value="motorista1">João</SelectItem>
                      <SelectItem value="motorista2">Maria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="observacoes">Intinerário:</label>
                <Textarea
                  name="observacoes"
                  className="border-2 font-medium w-full h-20 resize-none"
                  placeholder="Adicione observações sobre a viagem..."
                />
              </div>
            </div>

            <hr className="border-t border-2 border-black my-4" />
            <p className="font-bold text-center mt-4">Valores</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="tipopagamento">Tipo Pagamento:</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pagamentos</SelectLabel>
                      <SelectItem value="veiculo1">PIX</SelectItem>
                      <SelectItem value="veiculo2">Dinheiro</SelectItem>
                      <SelectItem value="veiculo2">Cartão</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {formFieldsDadosChegadaValores.map((field) => (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
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
