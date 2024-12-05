import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

type Invoice = {
  invoice: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount?: string;
};

interface CustomTableProps {
  title: string;
  headers: string[];
  rows: Invoice[];
  renderRow: (row: Invoice) => React.ReactNode;
}

export default function CustomTable({
  title,
  headers,
  rows,
  renderRow,
}: CustomTableProps) {
  return (
    <div className="w-[380px] h-[300px] rounded-md shadow-lg shadow-black/40 flex flex-col items-center gap-4">
      <p className="font-bold">{title}</p>
      <Table>
        <TableHeader>
          <TableRow className="bg-white">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="text-black font-black text-center"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {rows.map((row, index) => (
            <TableRow key={index}>{renderRow(row)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
