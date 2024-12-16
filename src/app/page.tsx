"use client";
import CustomTable from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import { IDocumentos, Viagem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
];

export default function Home() {
  const [documentos, setDocumentos] = useState<IDocumentos[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [documentosReponse, viagensResponse] = await Promise.all([
          api.get("/documento"),
          api.get("/viagem"),
        ]);
        setDocumentos(documentosReponse.data.data);
        setViagens(viagensResponse.data.data);
      } catch (error) {
        console.log("erro ao tentar recuperar dados", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="h-[424px] max-h-[500px] bg-[#070180] pt-10">
        <div className="h-[350px] w-[1200px] mx-auto rounded-md bg-white flex items-center justify-around">
          <div className="w-[380px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold">Viagens/Serviços</p>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white">
                    <TableHead className="text-black font-black text-center">
                      Dia
                    </TableHead>
                    <TableHead className="text-black font-black text-center">
                      Data
                    </TableHead>
                    <TableHead className="text-black font-black text-center">
                      Orçamento
                    </TableHead>
                    <TableHead className="text-black font-black text-center">
                      Tipo Viagem
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white text-center">
                  {viagens.map((viagem) => (
                    <TableRow key={viagem.id}>
                      <TableCell>
                      {diasDaSemana[new Date(viagem.dataHorarioSaida.data).getDay()]} 
                      </TableCell>
                      <TableCell>
                        {new Date(
                          viagem.dataHorarioSaida.data
                        ).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{viagem.valorContratado}</TableCell>
                      <TableCell>{viagem.tipoViagem}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center">
              <Link
                href="/viagens-servicos"
                className="bg-black text-white text-sm w-20 text-center p-2 rounded-md hover:bg-black/85 transition-all"
              >
                Ver mais
              </Link>
            </div>
          </div>
          <CustomTable
            title="Veículos utilizados nos próximos 30 dias"
            headers={["Dia", "Data", "Placa"]}
            rows={invoices}
            renderRow={(invoice) => (
              <>
                <TableCell className="text-center">{invoice.invoice}</TableCell>
                <TableCell className="text-center">
                  {invoice.paymentStatus}
                </TableCell>
                <TableCell className="text-center">
                  {invoice.paymentMethod}
                </TableCell>
              </>
            )}
          />
          <div className="w-[380px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold">Vencimento Doc/Certificados</p>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white">
                    <TableHead className="text-black font-black text-center">
                      Vencimento
                    </TableHead>
                    <TableHead className="text-black font-black text-center">
                      Referência
                    </TableHead>
                    <TableHead className="text-black font-black text-center">
                      Doc/Certificados
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white text-center">
                  {documentos.map((documento) => (
                    <TableRow key={documento.id}>
                      <TableCell>
                        {new Date(documento.vencimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>{documento.referencia}</TableCell>
                      <TableCell>{documento.tipoDocumento}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center">
              <Link
                href="/documentos"
                className="bg-black text-white text-sm w-20 text-center p-2 rounded-md hover:bg-black/85 transition-all"
              >
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
