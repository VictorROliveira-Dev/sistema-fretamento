import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Certifique-se de que o plugin foi importado corretamente
import { Viagem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "../../assets/documentos.svg";

// Caminho da imagem
const logoUrl = "/Logo.png"; // Caminho relativo da imagem no diretório public

interface ViagemPDFProps {
  dadosViagens: Viagem;
}

const ViagemPDF: React.FC<ViagemPDFProps> = ({ dadosViagens }) => {
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
      doc.text("Relatório de Viagem", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });

      // Adicionar os dados da despesa
      const columns = ["Campo", "Valor"];
      const tableData = [
        ["Data Chegada", new Date(dadosViagens.dataHorarioChegada.data).toLocaleDateString()],
        ["Hora Chegada", dadosViagens.dataHorarioChegada.hora],
        ["Data Retorno", new Date(dadosViagens.dataHorarioRetorno.data).toLocaleDateString()],
        ["Hora Retorno", dadosViagens.dataHorarioRetorno.hora],
        ["Cidade Saída", dadosViagens.rota.saida.cidadeSaida],
        ["UF Saída", dadosViagens.rota.saida.ufSaida],
        ["Cidade Retorno", dadosViagens.rota.retorno.cidadeSaida],
        ["UF Retorno", dadosViagens.rota.retorno.cidadeSaida],
        ["Tipo Pagamento", dadosViagens.tipoPagamento],
        ["Tipo Serviço", dadosViagens.tipoServico],
        ["Tipo Viagem", dadosViagens.tipoViagem],
        ["Status", dadosViagens.status],
        ["Valor Contratado", `R$ ${dadosViagens.valorContratado.toFixed(2)}`],
      ];

      // Adicionar a tabela ao PDF
      doc.autoTable(columns, tableData, {
        startY: imgHeight + 30,
      });

      // Salvar o PDF
      doc.save(`dadosViagens_${dadosViagens.id}.pdf`);
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

export default ViagemPDF;
