"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { api } from "@/lib/axios";

export default function DialogAdicionar() {
  const [documentData, setDocumentData] = useState({
    referencia: "",
    tipoDocumento: "",
    vencimento: "",
  });

  const handleChange = (name: string, value: string) => {
    setDocumentData({
      ...documentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/documento", documentData);
      console.log("Documento Adicionado com Sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500">
          Adicionar Documento
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] h-[380px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Cadastro de Documento
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            <div>
              <label htmlFor="tipoDocumento">Doc/Certificado:</label>
              <Select
                name="tipoDocumento"
                value={documentData.tipoDocumento}
                onValueChange={(value) => handleChange("tipoDocumento", value)}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecione o tipo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
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
              <Select
                name="referencia"
                value={documentData.referencia}
                onValueChange={(value) => handleChange("referencia", value)}
              >
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
              <label htmlFor="vencimento">Vencimento:</label>
              <Input
                name="vencimento"
                type="date"
                value={documentData.vencimento}
                onChange={(e) => handleChange("vencimento", e.target.value)}
                className="w-[250px]"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center gap-2 mt-10">
            <Button variant="outline">Fechar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
