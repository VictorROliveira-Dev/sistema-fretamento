import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "@/app/assets/documentos.svg";
import { IReceitas, Pagamento } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface GeneratePdfProps {
  receita: IReceitas;
  pagamento: Pagamento;
}

const GeneratePDF = ({ receita, pagamento }: GeneratePdfProps) => {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    try {
      // Add logo
      const logoUrl = "/logo.png";
      doc.addImage(logoUrl, "PNG", 20, yPosition, 100, 20);

      // Client Info
      doc.setFont("Arial", "normal");
      doc.setFontSize(10);
      doc.text(
        `Nome: ${receita.viagem?.cliente?.nome || "sem nome"}`,
        200,
        yPosition + 10
      );
      doc.text(
        `CPF/CNPJ: ${receita.viagem?.cliente?.cpf || "sem cpf"}`,
        200,
        yPosition + 20
      );
      doc.text(
        `Endereço: ${receita.viagem?.cliente?.endereco.cidade || ""}`,
        200,
        yPosition + 30
      );

      // Contract Info
      doc.text(
        `Número: ${receita.viagem?.id || "0"}`,
        pageWidth - 80,
        yPosition + 10
      );
      doc.text(
        `Valor: ${formatCurrency(pagamento.valorPago)}`,
        pageWidth - 80,
        yPosition + 20
      );

      yPosition += 50;

      // Itinerary Section
      doc.setFontSize(12);
      doc.text("VIAGEM / ITINERÁRIO", 20, yPosition);
      yPosition += 10;

      // Border
      doc.rect(20, yPosition, pageWidth - 40, 100);

      // Itinerary Content
      const formatDate = (date: string, time: string) =>
        `${format(
          toZonedTime(parseISO(date), "UTC"),
          "dd/MM/yyyy"
        )} às ${time}`;

      // First Row
      doc.text("Saída:", 25, yPosition + 15);
      doc.text(
        receita.viagem?.dataHorarioSaida.data
          ? formatDate(
              receita.viagem.dataHorarioSaida.data,
              receita.viagem.dataHorarioSaida.hora
            )
          : "/ /  às :",
        60,
        yPosition + 15
      );

      doc.text("Retorno:", 300, yPosition + 15);
      doc.text(
        receita.viagem?.dataHorarioRetorno.data
          ? formatDate(
              receita.viagem.dataHorarioRetorno.data,
              receita.viagem.dataHorarioRetorno.hora
            )
          : "/ /  às :",
        340,
        yPosition + 15
      );

      // Second Row
      doc.text("Origem:", 25, yPosition + 30);
      doc.text(
        receita.viagem?.rota.saida.cidadeSaida || "",
        60,
        yPosition + 30
      );
      doc.text("Destino:", 300, yPosition + 30);
      doc.text(
        receita.viagem?.rota.retorno.cidadeSaida || "",
        330,
        yPosition + 30
      );

      // Third Row
      doc.text("Local Saída:", 25, yPosition + 45);
      doc.text(
        receita.viagem?.rota.saida.localDeSaida || "",
        85,
        yPosition + 45
      );
      doc.text("Local Retorno:", 300, yPosition + 45);
      doc.text(
        receita.viagem?.rota.retorno.localDeSaida || "",
        360,
        yPosition + 45
      );

      // Vehicle Info
      doc.text("Veículo/Tipo:", 25, yPosition + 60);
      doc.text(receita.viagem?.veiculo?.tipo || "", 80, yPosition + 60);

      yPosition += 110;

      // Payment Info
      doc.setFontSize(10);
      const paymentText = [
        `Recebemos a quantia de ${formatCurrency(pagamento.valorPago)}`,
        `referente ao contrato ${
          receita.viagemId
        } com valor de ${formatCurrency(receita.valorTotal)}`,
      ];
      paymentText.forEach((line, index) => {
        doc.text(line, 20, yPosition + index * 10);
      });

      yPosition += 40;

      // Signature Section
      doc.text("Irecê-Ba", 20, yPosition);
      doc.text(dataAtualPorExtenso(), 20, yPosition + 10);
      doc.line(pageWidth - 100, yPosition, pageWidth - 20, yPosition);
      doc.text("Contratada", pageWidth - 100, yPosition + 10);

      // Add separator line
      yPosition += 40;
      doc.setLineWidth(0.5);
      doc.setDrawColor(0);
      doc.line(20, yPosition, pageWidth - 20, yPosition);

      // Duplicate Section (Segunda Via)
      yPosition += 20;
      doc.setFontSize(8);
      doc.text("SEGUNDA VIA", pageWidth - 50, yPosition);

      doc.addImage(logoUrl, "PNG", 20, yPosition, 100, 20);

      // Client Info
      doc.setFont("Arial", "normal");
      doc.setFontSize(10);
      doc.text(
        `Nome: ${receita.viagem?.cliente?.nome || "sem nome"}`,
        200,
        yPosition + 10
      );
      doc.text(
        `CPF/CNPJ: ${receita.viagem?.cliente?.cpf || "sem cpf"}`,
        200,
        yPosition + 20
      );
      doc.text(
        `Endereço: ${receita.viagem?.cliente?.endereco.cidade || ""}`,
        200,
        yPosition + 30
      );

      // Contract Info
      doc.text(
        `Número: ${receita.viagem?.id || "0"}`,
        pageWidth - 80,
        yPosition + 10
      );
      doc.text(
        `Valor: ${formatCurrency(pagamento.valorPago)}`,
        pageWidth - 80,
        yPosition + 20
      );

      yPosition += 50;

      // Itinerary Section
      doc.setFontSize(12);
      doc.text("VIAGEM / ITINERÁRIO", 20, yPosition);
      yPosition += 10;

      // Border
      doc.rect(20, yPosition, pageWidth - 40, 100);

      // Itinerary Content

      // First Row
      doc.text("Saída:", 25, yPosition + 15);
      doc.text(
        receita.viagem?.dataHorarioSaida.data
          ? formatDate(
              receita.viagem.dataHorarioSaida.data,
              receita.viagem.dataHorarioSaida.hora
            )
          : "/ /  às :",
        60,
        yPosition + 15
      );

      doc.text("Retorno:", 300, yPosition + 15);
      doc.text(
        receita.viagem?.dataHorarioRetorno.data
          ? formatDate(
              receita.viagem.dataHorarioRetorno.data,
              receita.viagem.dataHorarioRetorno.hora
            )
          : "/ /  às :",
        340,
        yPosition + 15
      );

      // Second Row
      doc.text("Origem:", 25, yPosition + 30);
      doc.text(
        receita.viagem?.rota.saida.cidadeSaida || "",
        60,
        yPosition + 30
      );
      doc.text("Destino:", 300, yPosition + 30);
      doc.text(
        receita.viagem?.rota.retorno.cidadeSaida || "",
        330,
        yPosition + 30
      );

      // Third Row
      doc.text("Local Saída:", 25, yPosition + 45);
      doc.text(
        receita.viagem?.rota.saida.localDeSaida || "",
        85,
        yPosition + 45
      );
      doc.text("Local Retorno:", 300, yPosition + 45);
      doc.text(
        receita.viagem?.rota.retorno.localDeSaida || "",
        360,
        yPosition + 45
      );

      // Vehicle Info
      doc.text("Veículo/Tipo:", 25, yPosition + 60);
      doc.text(receita.viagem?.veiculo?.tipo || "", 80, yPosition + 60);

      yPosition += 110;

      // Payment Info
      doc.setFontSize(10);
      paymentText.forEach((line, index) => {
        doc.text(line, 20, yPosition + index * 10);
      });

      yPosition += 40;

      // Signature Section
      doc.text("Irecê-Ba", 20, yPosition);
      doc.text(dataAtualPorExtenso(), 20, yPosition + 10);
      doc.line(pageWidth - 100, yPosition, pageWidth - 20, yPosition);
      doc.text("Cliente", pageWidth - 100, yPosition + 10);

      // Add separator line
      yPosition += 40;
      doc.setLineWidth(0.5);
      doc.setDrawColor(0);
      doc.line(20, yPosition, pageWidth - 20, yPosition);

      // Duplicate Section (Segunda Via)
      yPosition += 20;
      doc.setFontSize(8);

      doc.save("Contrato_de_Fretamento.pdf");
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    } finally {
      setLoading(false);
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
