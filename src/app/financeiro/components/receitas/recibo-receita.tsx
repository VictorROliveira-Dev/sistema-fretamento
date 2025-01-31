import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "@/app/assets/documentos.svg";
import { IReceitas } from "@/lib/types";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz/toZonedTime";

interface GeneratePdfProps {
  receita: IReceitas;
}

const GeneratePDF = ({ receita }: GeneratePdfProps) => {
  function dataAtualPorExtenso() {
    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const hoje = new Date();
    const diaSemana = diasDaSemana[hoje.getDay()];
    const dia = hoje.getDate();
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleDownload = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const initialY = 20;
    let yPosition = initialY;

    try {
      const drawMainContent = (isDuplicate: boolean = false) => {
        // Reset Y position for new page
        if (yPosition > doc.internal.pageSize.getHeight() - 100) {
          doc.addPage();
          yPosition = initialY;
        }

        // Add logo
        doc.addImage("/logo.png", "PNG", 20, yPosition, 100, 20);

        // Client Info
        doc
          .setFont("Arial", "normal")
          .setFontSize(10)
          .text(
            `Nome: ${receita.viagem?.cliente?.nome || "s/n"}`,
            200,
            yPosition + 10
          )
          .text(
            `CPF/CNPJ: ${receita.viagem?.cliente?.cpf || "s/n"}`,
            200,
            yPosition + 20
          )
          .text(
            `Endereço: ${receita.viagem?.cliente?.endereco.cidade || ""}`,
            200,
            yPosition + 30
          );

        // Contract Info
        doc
          .text(
            `Número: ${receita.viagemId || "0"}`,
            pageWidth - 80,
            yPosition + 10
          )
          .text(
            `Valor: ${formatCurrency(receita.valorTotal)}`,
            pageWidth - 80,
            yPosition + 20
          );

        if (isDuplicate) {
          doc.text("SEGUNDA VIA", 370, yPosition + 40);
        }

        // Update Y position after header
        yPosition = Math.max(yPosition + 50, doc.getTextDimensions("").h + 30);

        // Payment Table
        doc.setFontSize(12).text("Pagamentos Recebidos", 20, yPosition);
        yPosition += 15;

        const headers = [["Data", "Valor"]];
        const rows = receita.pagamentos.map((pagamento) => [
          format(
            toZonedTime(parseISO(pagamento.dataPagamento), "UTC"),
            "dd/MM/yyyy"
          ),
          formatCurrency(pagamento.valorPago),
        ]);

        // @ts-ignore - jspdf-autotable types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc.autoTable({
          startY: yPosition,
          head: headers,
          body: rows,
          theme: "grid",
          styles: { fontSize: 10 },
          columnStyles: { 1: { halign: "right", cellWidth: 60 } },
          tableWidth: "wrap",
          /* eslint-disable @typescript-eslint/no-explicit-any */
          didDrawPage: (data: any) => {
            yPosition = data.cursor.y;
          },
        });
        /* eslint-enable @typescript-eslint/no-explicit-any */

        // Total after table
        doc
          .setFontSize(10)
          .text(
            `Valor total: ${formatCurrency(receita.valorPago)}`,
            30,
            yPosition + 10
          );
        yPosition += 20;

        // Itinerary Info
        const itinerary = [
          `Origem: ${receita.viagem?.rota.saida.cidadeSaida || "sem rota"}`,
          `Retorno: ${receita.viagem?.rota.retorno.cidadeSaida || "sem rota"}`,
          `Itinerario: ${receita.viagem?.itinerario || "sem rota"}`,
        ];

        itinerary.forEach((text) => {
          doc.text(text, 30, yPosition);
          yPosition += 10;
        });

        // Signature Section
        yPosition += 20;
        doc
          .text("Irecê-Ba", 30, yPosition)
          .text(dataAtualPorExtenso(), 30, yPosition + 10)
          .line(pageWidth - 100, yPosition, pageWidth - 20, yPosition)
          .text(
            isDuplicate ? "Cliente" : "Contratada",
            pageWidth - 100,
            yPosition + 10
          );

        // Update Y position for next element
        yPosition += 40;
      };

      // First copy
      drawMainContent();

      // Add separator
      doc
        .setLineDashPattern([2, 2], 0)
        .line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 20;

      // Second copy
      drawMainContent(true);

      doc.save("Relatorio_Financeiro.pdf");
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <Button
      className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110"
      onClick={handleDownload}
    >
      <Image src={documentIcon} alt="documento" className="w-6" />
    </Button>
  );
};

export default GeneratePDF;
