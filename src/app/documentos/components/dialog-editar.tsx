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
import editIcon from "@/app/assets/edit.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formFieldsDocumentos } from "@/lib/objects";
import FormInput from "@/components/form-input";

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
      <DialogContent className="w-[600px] h-[380px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Documento
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 w-full justify-center">
          <div>
            <label htmlFor="documento">Doc/Certificado:</label>
            <Select name="documento">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione o doc/certificado..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Documentos</SelectLabel>
                  <SelectItem value="extintor">Extintor</SelectItem>
                  <SelectItem value="ipva">IPVA</SelectItem>
                  <SelectItem value="CNH">CNH</SelectItem>
                  <SelectItem value="alvara">Alvará</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="referencia">Referência:</label>
            <Select name="referencia">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione a Referência..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Referências</SelectLabel>
                  <SelectItem value="motorista">João</SelectItem>
                  <SelectItem value="extintor">ABC-1234 (1234)</SelectItem>
                  <SelectItem value="ipva">Empresa X tur</SelectItem>
                  <SelectItem value="CNH">AAA-5555 (5555)</SelectItem>
                  <SelectItem value="alvara">João Guedes</SelectItem>
                  <SelectItem value="Outros">Empresa Y TUR</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="tipo">Tipo:</label>
            <Select name="tipo">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione o tipo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipos</SelectLabel>
                  <SelectItem value="interestadual">Interestadual</SelectItem>
                  <SelectItem value="intermunicipal">Intermunicipal</SelectItem>
                  <SelectItem value="outros">
                    Outros/CNH/IPVA/Extintor
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {formFieldsDocumentos.map((field) => (
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
