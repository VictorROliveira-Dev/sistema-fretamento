"use client";

/*import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import documentoIcon from "../assets/documentos.png";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Bus, CalendarDays, TicketPercent } from "lucide-react";
import { DialogAdicionar } from "./components/dialog_adicionar";
import { useEffect, useState } from "react";
import { ViagemProgramda } from "@/lib/types";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { DialogEditar } from "./components/dialog_editar";
import { DialogInfo } from "./components/dialog_infos";

export default function ViagemProgramada() {
  const [viagens, setViagens] = useState<ViagemProgramda[]>([]);

  async function fetchViagens() {
    const response = await api.get("viagemprogramada");

    if (!response.data.isSucces) {
      toast("Erro ao tentar buscar viagens, recarregue a pagina");
      return;
    }

    setViagens(response.data.data);
  }
  useEffect(() => {
    fetchViagens();
  }, []);

  function formatarDataParaDiaMes(data: string): string {
    // Converte a string para uma data
    const partes = data.split("-"); // Divide a string no formato MM-dd-yyyy
    const mes = parseInt(partes[0], 10) - 1; // Mês em JavaScript é baseado em zero
    const dia = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    const dataObj = new Date(ano, mes, dia);

    // Formata para o formato dd/MM
    const diaFormatado = dataObj.getDate().toString().padStart(2, "0");
    const mesFormatado = (dataObj.getMonth() + 1).toString().padStart(2, "0");

    return `${diaFormatado}/${mesFormatado}`;
  }

  return (
    <>
      <section className="bg-[#070180] pt-12 h-full">
        <div className="min-h-[300px] w-[1100px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
          <div className=" bg-black w-full">
            <p className="font-bold text-white text-center">
              Visualizar Viagens/Serviços
            </p>
          </div>

          <div className="flex items-center justify-between p-4">
            <form className="flex gap-2 font-bold ">
              <div>
                <label htmlFor="pacote">Localizar Viagem:</label>
                <Input
                  name="pacote"
                  className="border-2 font-medium text-white w-[250px]"
                  placeholder="Nome Pacote..."
                />
              </div>
            </form>
            <DialogAdicionar />
          </div>

          <div className="flex gap-2 p-4">
            {viagens.map((viagem) => (
              <Card className="p-4" key={viagem.id}>
                <CardTitle className="text-center mb-2">
                  {viagem.titulo}
                </CardTitle>
                <CardContent className="flex flex-col w-full p-0 gap-2">
                  <div className="flex gap-1 items-center">
                    <Bus className="text-blue-800" />
                    <span>{viagem.itinerario.substring(0, 18)}</span>
                  </div>
                  <div className="flex gap-2 justify-start">
                    <div className="flex gap-1 items-center">
                      <CalendarDays className="text-green-600" />
                      <span>{formatarDataParaDiaMes(viagem.saida.data)}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <CalendarDays className="text-red-600" />
                      <span>{formatarDataParaDiaMes(viagem.retorno.data)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <TicketPercent className="text-yellow-600" />
                    <span>{viagem.valorPassagem} R$</span>
                  </div>
                  <div className="flex gap-2">
                    <DialogEditar
                      setViagens={setViagens}
                      viagens={viagens}
                      viagemEditavel={viagem}
                    />
                    <DialogInfo viagem={viagem} />
                  </div>
                  <CardFooter className="p-0">
                    <Button>Adicionar Passagem</Button>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}*/
