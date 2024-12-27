import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IReceitas } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "../../../assets/documentos.svg";

// Caminho da imagem
const logoUrl = "/Logo.png"; // Caminho relativo da imagem no diretório public

interface ReceitaPDFProps {
  receita: IReceitas;
}

const DespesaPDF: React.FC<ReceitaPDFProps> = ({ receita }) => {
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
      doc.text("Relatório de Receita", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });

      // Adicionar os dados da despesa
      const columns = ["Campo", "Valor"];
      const tableData = [
        ["Data Compra", new Date(receita.dataCompra).toLocaleDateString()],
        ["Data Emissão", new Date(receita.dataEmissao).toLocaleDateString()],
        ["Forma de Pagamento", receita.formaPagamento],
        ["N° Documento", receita.numeroDocumento],
        ["Origem Pagamento", receita.origemPagamento],
        ["Responsável", receita.responsavel.nome],
        ["Valor Parcial", `R$ ${receita.valorParcial.toFixed(2)}`],
        ["Valor Total", `R$ ${receita.valorTotal.toFixed(2)}`],
        ["Pago", receita.pago ? "Sim" : "Não"],
      ];

      // Adicionar a tabela ao PDF
      doc.autoTable(columns, tableData, {
        startY: imgHeight + 30,
      });

      // Salvar o PDF
      doc.save(`receita_${receita.id}.pdf`);
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
