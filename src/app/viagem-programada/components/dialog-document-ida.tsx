"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { format, toZonedTime } from "date-fns-tz";
import { parseISO } from "date-fns";
import { Passagem } from "@/lib/types";
import { useState } from "react";

interface DialogDocumentoProps {
  viagemId: number;
  titulo: string;
  saida: {
    data: string;
  };
  retorno: {
    data: string;
  };
}

export function DialogDocumento({
  viagemId,
  titulo,
  saida,
  retorno,
}: DialogDocumentoProps) {
  const [loading, setLoading] = useState(false);

  const formatPassengerRow = (
    passenger: Passagem,
    includeReturnSeat: boolean
  ): string[] => {
    const baseInfo = [
      passenger.nomePassageiro || "Não informado",
      passenger.cidadePassageiro || "Não informado",
      passenger.cpfPassageiro.toString() || "Não informado",
      passenger.paradaPassageiro || "Não informado",
      passenger.poltronaIda?.toString() || "Sem poltrona",
      includeReturnSeat
        ? passenger.poltronaVolta?.toString() || "Sem poltrona"
        : "",
      "", // Aqui estamos garantindo que o campo "Fardo/Meio" sempre será vazio
    ];

    if (includeReturnSeat) {
      baseInfo.push(passenger.poltronaVolta?.toString() || "");
    }

    return baseInfo;
  };

  const generatePDF = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/viagemProgramada/${viagemId}`);

      if (!response.data.isSucces) {
        toast.error("Erro ao buscar dados dos passageiros");
        return;
      }

      const passengers: Passagem[] = Array.isArray(
        response.data?.data?.passagens
      )
        ? response.data.data.passagens
        : [];

      console.log(passengers);

      // Separar passageiros por tipo de viagem
      const oneWayPassengers = passengers.filter((p) => p.tipo === "IDA");
      const roundTripPassengers = passengers.filter(
        (p) => p.tipo === "IDA-VOLTA"
      );
      const returnOnOnlyPassengers = passengers.filter(
        (p) => p.tipo === "VOLTA"
      );

      const doc = new jsPDF();

      // Configurar estilos comuns
      const oneWayColumns = [
        "Nome",
        "Cidade",
        "CPF",
        "Parada",
        "Poltrona (IDA)",
        "Fardo/Meio",
      ];

      const roundTripColumns = [
        "Nome",
        "Cidade",
        "CPF",
        "Parada",
        "Poltrona (IDA)",
        "Poltrona (VOLTA)",
        "Fardo/Meio",
      ];

      const commonStyles = {
        fontSize: 8,
        cellPadding: 3,
      };

      const headerStyles = {
        fillColor: [7, 1, 128] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
        fontSize: 9,
        halign: "center" as const,
        font: "helvetica" as const,
      };

      const formatDate = (date?: string) => {
        if (!date) return "Data não informada";
        try {
          return format(toZonedTime(parseISO(date), "UTC"), "dd/MM/yyyy");
        } catch (error) {
          console.error("Erro ao formatar a data:", error);
          return "Data inválida";
        }
      };

      // Adicionar cabeçalho do documento
      doc.setFontSize(16);
      doc.text(`Lista de Passageiros - ${titulo}`, 14, 15);

      // Adicionar datas
      doc.setFontSize(10);
      doc.text(`Data de Saída: ${formatDate(saida?.data)}`, 14, 25);
      doc.text(`Data de Retorno: ${formatDate(retorno?.data)}`, 14, 30);

      // Seção de passageiros somente IDA
      let currentY = 40;

      if (oneWayPassengers.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(7, 1, 128);
        doc.text(
          `Passageiros - Somente IDA (${oneWayPassengers.length})`,
          14,
          currentY
        );

        const oneWayRows = oneWayPassengers.map((passenger) =>
          formatPassengerRow(passenger, false)
        );

        autoTable(doc, {
          head: [oneWayColumns],
          body: oneWayRows,
          startY: currentY + 5,
          theme: "grid",
          styles: commonStyles,
          headStyles: headerStyles,
          alternateRowStyles: {
            fillColor: [240, 240, 240] as [number, number, number],
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentY = (doc as any).lastAutoTable.finalY + 15;
      }

      // Seção de passageiros IDA E VOLTA
      if (roundTripPassengers.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(7, 1, 128);
        doc.text(
          `Passageiros - IDA E VOLTA (${roundTripPassengers.length})`,
          14,
          currentY
        );

        const roundTripRows = roundTripPassengers.map((passenger) =>
          formatPassengerRow(passenger, true)
        );

        autoTable(doc, {
          head: [roundTripColumns],
          body: roundTripRows,
          startY: currentY + 5,
          theme: "grid",
          styles: commonStyles,
          headStyles: headerStyles,
          alternateRowStyles: {
            fillColor: [240, 240, 240] as [number, number, number],
          },
        });
      }

      const returnOnlyColumns = [
        "Nome",
        "Cidade",
        "CPF",
        "Parada",
        "Poltrona (VOLTA)",
        "Fardo/Meio",
      ];

      // SEÇÃO DE APENAS VOLTA
      if (returnOnOnlyPassengers.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(7, 1, 128);
        doc.text(
          `Passageiros - SOMENTE VOLTA (${returnOnOnlyPassengers.length})`,
          14,
          currentY + 45
        );

        const returnOnlyRows = returnOnOnlyPassengers.map((passengers) => [
          passengers.nomePassageiro || "Não informado",
          passengers.cidadePassageiro || "Não informado",
          passengers.cpfPassageiro.toString() || "Não informado",
          passengers.paradaPassageiro || "Não informado",
          passengers.poltronaVolta?.toString() || "Não informado",
        ]);

        autoTable(doc, {
          head: [returnOnlyColumns],
          body: returnOnlyRows,
          startY: currentY + 50,
          theme: "grid",
          styles: commonStyles,
          headStyles: headerStyles,
          alternateRowStyles: {
            fillColor: [240, 240, 240] as [number, number, number],
          },
        });
      }

      // Filtrando os passageiros com a situação "PAGO"
      //const paidPassengers = passengers.filter((p) => p.situacao === "PAGO");

      // Adicionar rodapé com totais
      const totalPassengers = passengers.length;
      doc.setFontSize(10);
      doc.setTextColor(0);
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      doc.text(
        `Total de Passageiros: ${totalPassengers}`,
        14,
        (doc as any).lastAutoTable.finalY + 10
      );
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      // Salvar o PDF
      doc.save(
        `lista_passageiros_${titulo.toLowerCase().replace(/\s+/g, "_")}.pdf`
      );
    } catch (error) {
      toast.error("Erro ao gerar documento PDF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      className="bg-blue-600 w-[150px] gap-2 hover:bg-blue-700"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        "Documento Viagem"
      )}
    </Button>
  );
}
