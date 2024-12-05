import CustomTable from "@/components/custom-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

          <CustomTable
            title="Vencimento de Doc/Certificados"
            headers={["Vencimento", "Referência", "Doc/Certificado"]}
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
        </div>
      </main>
    </>
  );
}
