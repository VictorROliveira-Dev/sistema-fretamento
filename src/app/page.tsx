"use client";
import CustomTable from "@/components/custom-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import { IDocumentos } from "@/lib/types";
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

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await api.get("/documento");
        setDocumentos(response.data.data);
      } catch (error) {
        console.log("erro ao tentar recuperar documentos", error);
      }
    };

    fetchDocumentos();
  }, []);

  return (
    <>
      <main className="h-[424px] max-h-[500px] bg-[#070180] pt-10">
        <div className="h-[350px] w-[1200px] mx-auto rounded-md bg-white flex items-center justify-around">
          <CustomTable
            title="Viagens/Serviços nos próximos 30 dias"
            headers={["Dia", "Data", "Orçamento", "Veículo", "Motorista"]}
            rows={invoices}
            renderRow={(invoice) => (
              <>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </>
            )}
          />
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
          </div>
        </div>
      </main>
    </>
  );
}
