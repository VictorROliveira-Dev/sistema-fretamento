import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
                                <DialogContent className="w-[900px] h-[600px] flex flex-col items-center">
                                    <DialogHeader className="mb-5">
                                        <DialogTitle className="font-black">
                                            Cadastro de Motorista
                                        </DialogTitle>
                                    </DialogHeader>

                                    <div className="flex flex-wrap gap-4 w-full justify-center">
                                        <div className="flex flex-col">
                                            <label htmlFor="nome">Nome de Escala:</label>
                                            <Input
                                                name="nome"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o nome de escala..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="nomecompleto">Nome Completo:</label>
                                            <Input
                                                name="nomecompleto"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o nome completo..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="datanascimento">Data Nascimento:</label>
                                            <Input
                                                name="datanascimento"
                                                className="border-2 font-medium w-[250px]"
                                                type="date"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="documento">Documento:</label>
                                            <Input
                                                name="documento"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o número do documento..."
                                            />

                                            <RadioGroup defaultValue="rg" className="flex">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="comfortable" id="r2" />
                                                    <label htmlFor="r2">RG</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="compact" id="r3" />
                                                    <label htmlFor="r3">CNH</label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="cpf">CPF:</label>
                                            <Input
                                                name="cpf"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o número do CPF..."
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="cidade">Cidade:</label>
                                            <Input
                                                name="cidade"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite a cidade e estado..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="uf">UF:</label>
                                            <Input
                                                name="uf"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o Estado..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="rua">Rua:</label>
                                            <Input
                                                name="rua"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite a rua..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="rua">Bairro:</label>
                                            <Input
                                                name="rua"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o bairro..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="numero">Número:</label>
                                            <Input
                                                name="numero"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o número..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="telefone">Telefone:</label>
                                            <Input
                                                name="telefone"
                                                className="border-2 font-medium text-white w-[250px]"
                                                placeholder="Digite o telefone.."
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="vencimentocnh">Vencimento CNH:</label>
                                            <Input
                                                type="date"
                                                name="vencimentocnh"
                                                className="border-2 font-medium text-black w-[250px]"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="categoria">Categoria(as):</label>
                                            <Input
                                                name="categoria"
                                                className="border-2 font-medium text-black w-[250px]"
                                                placeholder="Digite a categoria..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="cidadecnh">Cidade CNH:</label>
                                            <Input
                                                name="cidadecnh"
                                                className="border-2 font-medium text-black w-[250px]"
                                                placeholder="Digite a cidade..."
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ufcnh">UF CNH:</label>
                                            <Input
                                                name="ufcnh"
                                                className="border-2 font-medium text-black w-[250px]"
                                                placeholder="Digite o Estado..."
                                            />
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
                                        Cidade - Estado
                                    </TableHead>
                                    <TableHead className="text-black font-bold text-center">
                                        Telefone
                                    </TableHead>
                                    <TableHead className="text-black font-bold text-center">
                                        CNH
                                    </TableHead>
                                    <TableHead className="text-black font-bold text-center">
                                        Conta
                                    </TableHead>
                                    <TableHead className="text-black font-bold text-center">
                                        Agência
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
                                    <TableCell>45654-0</TableCell>
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
                                                <DialogContent className="w-[900px] h-[600px] flex flex-col items-center">
                                                    <DialogHeader className="mb-5">
                                                        <DialogTitle className="font-black">
                                                            Edição de Motorista
                                                        </DialogTitle>
                                                    </DialogHeader>

                                                    <div className="flex flex-wrap gap-4 w-full justify-center">
                                                        <div className="flex flex-col">
                                                            <label htmlFor="nome">Nome de Escala:</label>
                                                            <Input
                                                                name="nome"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o nome de escala..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="nomecompleto">Nome Completo:</label>
                                                            <Input
                                                                name="nomecompleto"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o nome completo..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="datanascimento">Data Nascimento:</label>
                                                            <Input
                                                                name="datanascimento"
                                                                className="border-2 font-medium w-[250px]"
                                                                type="date"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="documento">Documento:</label>
                                                            <Input
                                                                name="documento"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o número do documento..."
                                                            />

                                                            <RadioGroup defaultValue="rg" className="flex">
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="comfortable" id="r2" />
                                                                    <label htmlFor="r2">RG</label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="compact" id="r3" />
                                                                    <label htmlFor="r3">CNH</label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label htmlFor="cpf">CPF:</label>
                                                            <Input
                                                                name="cpf"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o número do CPF..."
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label htmlFor="cidade">Cidade:</label>
                                                            <Input
                                                                name="cidade"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite a cidade e estado..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="uf">UF:</label>
                                                            <Input
                                                                name="uf"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o Estado..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="rua">Rua:</label>
                                                            <Input
                                                                name="rua"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite a rua..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="rua">Bairro:</label>
                                                            <Input
                                                                name="rua"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o bairro..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="numero">Número:</label>
                                                            <Input
                                                                name="numero"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o número..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="telefone">Telefone:</label>
                                                            <Input
                                                                name="telefone"
                                                                className="border-2 font-medium text-white w-[250px]"
                                                                placeholder="Digite o telefone.."
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label htmlFor="vencimentocnh">Vencimento CNH:</label>
                                                            <Input
                                                                type="date"
                                                                name="vencimentocnh"
                                                                className="border-2 font-medium text-black w-[250px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="categoria">Categoria(as):</label>
                                                            <Input
                                                                name="categoria"
                                                                className="border-2 font-medium text-black w-[250px]"
                                                                placeholder="Digite a categoria..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="cidadecnh">Cidade CNH:</label>
                                                            <Input
                                                                name="cidadecnh"
                                                                className="border-2 font-medium text-black w-[250px]"
                                                                placeholder="Digite a cidade..."
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="ufcnh">UF CNH:</label>
                                                            <Input
                                                                name="ufcnh"
                                                                className="border-2 font-medium text-black w-[250px]"
                                                                placeholder="Digite o Estado..."
                                                            />
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
