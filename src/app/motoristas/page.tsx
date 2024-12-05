import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

type FormField = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
};

const formFields: FormField[] = [
  {
    label: "Nome de Escala:",
    name: "name",
    placeholder: "Digite o nome de escala...",
  },
  {
    label: "Nome Completo:",
    name: "nomecompleto",
    placeholder: "Digite o nome completo...",
  },
  {
    label: "Data Nascimento:",
    name: "datanascimento",
    type: "date",
    placeholder: "",
  },
  {
    label: "Documento:",
    name: "documento",
    placeholder: "Digite o número do documento...",
  },
  { label: "CPF:", name: "cpf", placeholder: "Digite o número do CPF..." },
  {
    label: "Cidade:",
    name: "cidade",
    placeholder: "Digite a cidade e estado...",
  },
  { label: "UF:", name: "uf", placeholder: "Digite o Estado..." },
  { label: "Rua:", name: "rua", placeholder: "Digite a rua..." },
  { label: "Bairro:", name: "bairro", placeholder: "Digite o bairro..." },
  { label: "Número:", name: "numero", placeholder: "Digite o número..." },
  { label: "Telefone:", name: "telefone", placeholder: "Digite o telefone..." },
  {
    label: "Vencimento CNH:",
    name: "vencimentocnh",
    type: "date",
    placeholder: "",
  },
  {
    label: "Categoria(as):",
    name: "categoria",
    placeholder: "Digite a categoria...",
  },
  {
    label: "Cidade CNH:",
    name: "cidadecnh",
    placeholder: "Digite a cidade...",
  },
  { label: "UF CNH:", name: "ufcnh", placeholder: "Digite o Estado..." },
];

const FormInput: React.FC<FormField> = ({
  label,
  name,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <Input
      name={name}
      className="border-2 font-medium w-[250px]"
      placeholder={placeholder}
      type={type}
    />
  </div>
);

export default function Motoristas() {
  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[300px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Motoristas
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex flex-col gap-2 font-bold">
                <label htmlFor="name">Nome de Escala:</label>
                <Input
                  name="name"
                  className="border-2 font-medium text-white w-[250px]"
                  placeholder="Digite o nome de escala..."
                />
              </form>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-500">
                    Adicionar Motorista
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[1100px] h-[550px] flex flex-col items-center">
                  <DialogHeader className="mb-5">
                    <DialogTitle className="font-black">
                      Cadastro de Motorista
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-wrap gap-4 w-full justify-center">
                    {formFields.map((field) => (
                      <FormInput
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    ))}

                    <div className="flex flex-col gap-2">
                      <label htmlFor="documento">Documento:</label>
                      <Input
                        name="documento"
                        className="border-2 font-medium text-white w-[250px]"
                        placeholder="Digite o número do documento..."
                      />
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
            </div>

            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead className="text-black font-bold text-center">
                    Nome Escala
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CPF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Cidade
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    UF
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    Telefone
                  </TableHead>
                  <TableHead className="text-black font-bold text-center">
                    CNH
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                <TableRow className="hover:bg-gray-200">
                  <TableCell>
                    <p>João</p>
                  </TableCell>
                  <TableCell>099.876.345-21</TableCell>
                  <TableCell>Irecê - BA</TableCell>
                  <TableCell>(74)98877-0044</TableCell>
                  <TableCell>00123493411</TableCell>
                  <TableCell>456-7</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={editIcon}
                              alt="Editar"
                              width={30}
                              className="hover:scale-110"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[1100px] h-[550px] flex flex-col items-center">
                          <DialogHeader className="mb-5">
                            <DialogTitle className="font-black">
                              Cadastro de Motorista
                            </DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-wrap gap-4 w-full justify-center">
                            {formFields.map((field) => (
                              <FormInput
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                              />
                            ))}

                            <div className="flex flex-col gap-2">
                              <label htmlFor="documento">Documento:</label>
                              <Input
                                name="documento"
                                className="border-2 font-medium text-white w-[250px]"
                                placeholder="Digite o número do documento..."
                              />
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

                      <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                        <Image
                          src={removeIcon}
                          alt="Remover"
                          width={30}
                          className="hover:scale-110"
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
