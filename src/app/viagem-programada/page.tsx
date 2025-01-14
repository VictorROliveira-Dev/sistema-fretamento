"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Bus, CalendarDays, TicketPercent } from "lucide-react";
import { DialogAdicionar } from "./components/dialog-adicionar";
import { useEffect, useState } from "react";
import { ViagemProgramda } from "@/lib/types";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { DialogEditar } from "./components/dialog-editar";
import { DialogInfo } from "./components/dialog-informacao";
import Link from "next/link";
import Image from "next/image";
import loading from "../assets/loading-dark.svg";

export default function ViagemProgramada() {
  const [viagens, setViagens] = useState<ViagemProgramda[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [pesquisarViagem, setPesquisarViagem] = useState("");

  const filtroViagens = viagens.filter((viagem) => {
    if (!viagem.titulo) {
      return false;
    }
    return viagem.titulo.toLowerCase().includes(pesquisarViagem.toLowerCase());
  });

  async function fetchViagens() {
    setCarregando(true);
    const response = await api.get("viagemprogramada");

    if (!response.data.isSucces) {
      toast("Erro ao tentar buscar viagens, recarregue a pagina");
      return;
    }

    setViagens(response.data.data);

    setCarregando(false);
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
      <section className="bg-[#070180] pt-12 h-[1100px] md:h-[800px]">
        <div className="md:w-[1400px] w-[95%] h-[900px] md:h-[700px] mx-auto rounded-md bg-white flex flex-col overflow-y-scroll md:overflow-y-auto">
          <div className=" bg-black w-full">
            <p className="font-bold text-white text-center">
              Visualizar Viagens/Serviços
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between p-4">
            <form className="flex gap-2 font-bold ">
              <div>
                <label htmlFor="pacote">Localizar Viagem:</label>
                <Input
                  name="pacote"
                  className="border-2 font-medium w-[250px]"
                  placeholder="Nome Pacote..."
                  value={pesquisarViagem}
                  onChange={(e) => setPesquisarViagem(e.target.value)}
                />
              </div>
            </form>
            <DialogAdicionar />
          </div>
          {carregando ? (
            <div className="flex items-center justify-center p-10">
              <Image
                src={loading}
                alt="loading"
                className="text-center animate-spin"
                width={50}
              />
            </div>
          ) : (
            <div className="flex justify-center md:justify-start gap-2 p-4">
              {filtroViagens.map((viagem) => (
                <Card className="p-4 w-[300px]" key={viagem.id}>
                  <CardTitle className="text-center font-bold text-xl mb-2">
                    {viagem.titulo}
                  </CardTitle>
                  <CardContent className="flex flex-col items-center w-full p-0 gap-2">
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
                        <span>
                          {formatarDataParaDiaMes(viagem.retorno.data)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <TicketPercent className="text-yellow-600" />
                      <span>R$ {viagem.valorPassagem}</span>
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
                      <Link
                        className="bg-slate-800 w-[170px] text-center text-sm text-white p-2 rounded-sm"
                        href="/passagens"
                      >
                        Registrar Passagem
                      </Link>
                    </CardFooter>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
