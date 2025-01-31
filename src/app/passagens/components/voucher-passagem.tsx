import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Passagem } from "@/lib/types";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";

const logo = "/Logo.png";

interface VoucherPassagemProps {
  passagem: Passagem;
}

export default function VoucherPassagem({ passagem }: VoucherPassagemProps) {
  const gerarVoucher = () => {
    const doc = new jsPDF();

    // Título
    doc.setFont("courier", "normal");
    doc.setFontSize(18);
    doc.text("Voucher da Passagem", 20, 20);

    const dataFormatada = passagem.dataEmissao
      ? format(parseISO(passagem.dataEmissao), "dd/MM/yyyy")
      : "Data inválida";

    // Dados da passagem
    const dados = [
      ["Nome", passagem.nomePassageiro],
      [
        "Poltrona IDA",
        passagem.poltronaIda ? passagem.poltronaIda : "Apenas volta",
      ],
      [
        "Poltrona VOLTA",
        passagem.poltronaVolta ? passagem.poltronaVolta : "Apenas ida",
      ],
      ["Data de Emissão", dataFormatada],
    ];

    // Criando a tabela
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).autoTable({
      head: [["Campo", "Valor"]],
      body: dados,
      startY: 30,
    }).finalY ?? 40;

    const imgWidth = 60;
    const imgHeight = 20;
    const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const imgY = finalY + 40;

    doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Baixar o PDF
    doc.save(`Voucher_${passagem.nomePassageiro}.pdf`);
  };

  return (
    <Button onClick={gerarVoucher}>
      <Tag />
      Voucher
    </Button>
  );
}
