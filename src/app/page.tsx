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
      <main className="h-[400px] max-h-[500px] bg-[#070180] pt-10">
        <div className="h-[350px] w-[1200px] mx-auto rounded-md bg-white flex items-center justify-around">
          <div className="w-[380px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold">Viagens/Serviços nos próximos 30 dias</p>
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="text-black font-black">Dia</TableHead>
                  <TableHead className="text-black font-black">Data</TableHead>
                  <TableHead className="text-black font-black">
                    Orçamento
                  </TableHead>
                  <TableHead className="text-black font-black">
                    Veículo
                  </TableHead>
                  <TableHead className="text-black font-black">
                    Motorista
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-[350px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold ">
              Veículos utilizados nos próximos 30 dias
            </p>
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
                    Placa
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="text-center">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.paymentMethod}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-[380px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <p className="font-bold ">Vencimento de Doc/Certificados</p>
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
                    Doc/Certificado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="text-center">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.paymentMethod}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
