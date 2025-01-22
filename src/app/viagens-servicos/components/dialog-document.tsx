import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Certifique-se de que o plugin foi importado corretamente
import { Viagem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "../../assets/documentos.svg";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";

// Caminho da imagem
const logoUrl = "/Logo.png"; // Caminho relativo da imagem no diretório public

interface ViagemPDFProps {
  dadosViagens: Viagem;
}

const ViagemPDF: React.FC<ViagemPDFProps> = ({ dadosViagens }) => {
  const gerarPDF = async (): Promise<void> => {
    const doc = new jsPDF();

    try {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 80;
      const imgHeight = 20;
      const x = (pageWidth - imgWidth) / 2;

      // Adicionar a imagem ao PDF
      doc.addImage(logoUrl, "PNG", x, 10, imgWidth, imgHeight);
      // Obter a data atual
      const dataAtual = format(new Date(), "dd/MM/yyyy HH:mm");

      // Adicionar a data de emissão no topo do documento
      doc.setFontSize(10);
      doc.text(`Data de emissão: ${dataAtual}`, pageWidth - 60, imgHeight + 15);

      // Adicionar o título
      doc.setFontSize(14);
      doc.text("Relatório de Viagem", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });
      const dataHoraSaida = `${dadosViagens.dataHorarioSaida.data}T${dadosViagens.dataHorarioSaida.hora}`;
      const dataHoraRetorno = `${dadosViagens.dataHorarioRetorno.data}T${dadosViagens.dataHorarioRetorno.hora}`;

      // Adicionar os dados da despesa
      const columns = ["Campo", "Valor"];
      const tableData = [
        ["Cliente", dadosViagens.cliente?.nome],
        [
          "Veículo Prefixo | Placa | Modelo",
          dadosViagens.veiculo?.prefixo +
            " | " +
            dadosViagens.veiculo?.placa +
            " | " +
            dadosViagens.veiculo?.modelo,
        ],
        [
          "Motorista 1",
          dadosViagens.motoristaViagens[0]
            ? dadosViagens.motoristaViagens[0].motorista?.nome
            : "",
        ],
        [
          "Motorista 2",
          dadosViagens.motoristaViagens[1]
            ? dadosViagens.motoristaViagens[1].motorista?.nome
            : "",
        ],
        [
          "Data e Hora Saída",
          format(parseISO(dataHoraSaida), "dd/MM/yyyy HH:mm"),
        ],
        [
          "Data e Hora Retorno",
          format(parseISO(dataHoraRetorno), "dd/MM/yyyy HH:mm"),
        ],
        ["Cidade Saída", dadosViagens.rota.saida.cidadeSaida],
        ["UF Saída", dadosViagens.rota.saida.ufSaida],
        ["Cidade Retorno", dadosViagens.rota.retorno.cidadeSaida],
        ["UF Retorno", dadosViagens.rota.retorno.cidadeSaida],
        ["Km Inicial", dadosViagens.kmInicialVeiculo],
        ["Km Final", dadosViagens.kmFinalVeiculo],
        [
          "Valor Adiantamento",
          dadosViagens.adiantamento?.verba
            ? `R$ ${dadosViagens.adiantamento.verba.toFixed(2)}`
            : "R$ 0,00",
        ],
      ];

      const startY = imgHeight + 30;
      // Gerar a tabela no PDF
      doc.autoTable(columns, tableData, {
        startY,
      });

      const intinerario = `${dadosViagens.itinerario}`;

      // Calcular a posição final da tabela
      const rowHeight = 10; // Altura aproximada de cada linha
      const totalRows = tableData.length;
      const finalY = startY + totalRows * rowHeight - 25;

      // Adicionar um campo de texto para o itinerário da viagem
      doc.setFontSize(10);
      doc.text("Itinerário da Viagem:", 10, finalY + 5);
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(10, finalY + 7, pageWidth - 20, 20); // Caixa de texto com borda
      doc.text(intinerario, 12, finalY + 15);

      // Adicionar linhas para preenchimento manual dos gastos
      doc.text("Gastos da Viagem:", 10, finalY + 40);
      const lineHeight = 8;
      for (let i = 0; i < 5; i++) {
        doc.line(
          10,
          finalY + 45 + i * lineHeight,
          pageWidth - 10,
          finalY + 45 + i * lineHeight
        );
      }

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
