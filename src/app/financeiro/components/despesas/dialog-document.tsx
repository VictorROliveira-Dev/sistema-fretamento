import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Despesa } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "../../../assets/documentos.svg";
import { parseISO, format as formatDateFns } from "date-fns";
import { ptBR } from "date-fns/locale";

// Caminho da imagem
const logoUrl = "/Logo.png"; // Caminho relativo da imagem no diretório public

interface DespesaPDFProps {
  despesa: Despesa;
}

const DespesaPDF: React.FC<DespesaPDFProps> = ({ despesa }) => {
  const formatarData = (dataString: string | null | undefined): string => {
    if (!dataString) return "Não informado";

    try {
      const data = parseISO(dataString);
      if (!data) return "Data inválida";

      return formatDateFns(data, "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  const formatarDataAtual = (): string => {
    return formatDateFns(new Date(), "dd/MM/yyyy", { locale: ptBR });
  };

  const gerarPDF = async (): Promise<void> => {
    const doc = new jsPDF();

    try {
      // Usar o caminho da imagem diretamente
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 80;
      const imgHeight = 20;
      const x = (pageWidth - imgWidth) / 2;

      // Adicionar a imagem ao PDF
      doc.addImage(logoUrl, "PNG", x, 10, imgWidth, imgHeight);

      // Adicionar o título
      doc.setFontSize(14);
      doc.text("Relatório de Despesa", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });

      // Adicionar os dados da despesa
      const columns = ["Campo", "Valor"];
      const tableData = [
        ["Data Compra", formatarData(despesa.dataCompra)],
        ["Data Emissão", formatarDataAtual()],
        ["Forma de Pagamento", despesa.formaPagamento],
        ["Origem Pagamento", despesa.centroCusto],
        ["Valor Parcial", `R$ ${despesa.valorParcial.toFixed(2)}`],
        ["Valor Total", `R$ ${despesa.valorTotal.toFixed(2)}`],
        ["Pago", despesa.pago ? "Sim" : "Não"],
      ];

      // Adicionar a tabela ao PDF
      doc.autoTable(columns, tableData, {
        startY: imgHeight + 30,
      });

      // Salvar o PDF
      doc.save(`despesa_${despesa.id}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <Button
      className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110"
      onClick={gerarPDF}
    >
      <Image src={documentIcon} alt="documento" className="w-6" />
    </Button>
  );
};

export default DespesaPDF;
