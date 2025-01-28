import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Certifique-se de que o plugin foi importado corretamente
import { Manutencao } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "../../assets/documentos.svg";
import { api } from "@/lib/axios";

// Caminho da imagem
const logoUrl = "/Logo.png"; // Caminho relativo da imagem no diretório public

// Função simulada para buscar a placa do veículo
const fetchPlacaVeiculo = async (veiculoId: string): Promise<string> => {
  const response = await api.get(`/veiculo/${veiculoId}`);
  const data = await response.data.data;
  return data.placa; // Supondo que a API retorne um objeto com a placa
};

// Função simulada para buscar o nome do serviço
const fetchNomeServico = async (servicoId: string): Promise<string> => {
  const response = await api.get(`/servico/${servicoId}`);
  const data = await response.data.data;
  return data.nomeServico; // Supondo que a API retorne um objeto com o nome
};

interface ManutencaoPDFProps {
  manutencaoData: Manutencao;
}

const ManutencaoPDF: React.FC<ManutencaoPDFProps> = ({ manutencaoData }) => {
  const [placasVeiculos, setPlacasVeiculos] = useState<{
    [key: string]: string;
  }>({});
  const [nomesServicos, setNomesServicos] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    // Carregar as placas e nomes dos serviços quando os dados de manutenção forem recebidos
    const carregarDados = async () => {
      const placas: { [key: string]: string } = {};
      const servicos: { [key: string]: string } = {};
      if (!placas[manutencaoData.veiculoId]) {
        placas[manutencaoData.veiculoId] = await fetchPlacaVeiculo(
          manutencaoData.veiculoId.toString()
        );
      }
      if (!servicos[manutencaoData.servicoId]) {
        servicos[manutencaoData.servicoId] = await fetchNomeServico(
          manutencaoData.servicoId.toString()
        );
      }

      setPlacasVeiculos(placas);
      setNomesServicos(servicos);
    };

    carregarDados();
  }, [manutencaoData]);

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
      doc.text("Relatório de Manutenção", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });

      // Adicionar os dados da despesa
      const columns = ["Campo", "Valor"];
      const tableData = [
        ["Data Lançamento", new Date(manutencaoData.dataLancamento).toLocaleDateString()],
        ["Data Prevista", new Date(manutencaoData.dataPrevista).toLocaleDateString()],
        ["Data realizada", new Date(manutencaoData.dataRealizada).toLocaleDateString()],
        ["KM Atual", manutencaoData.kmAtual],
        ["Km Prevista", manutencaoData.kmPrevista],
        ["KM Realizada", manutencaoData.kmRealizada],
        ["Veículo", placasVeiculos[manutencaoData.veiculoId]],
        ["Serviço", nomesServicos[manutencaoData.servicoId]],
        ["Custo Total", `R$ ${manutencaoData.custo.toFixed(2)}`],
        ["Tipo", manutencaoData.tipo],
      ];

      // Adicionar a tabela ao PDF
      doc.autoTable(columns, tableData, {
        startY: imgHeight + 30,
      });

      // Salvar o PDF
      doc.save(`manutenção_${manutencaoData.id}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <Button
      className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110"
      onClick={gerarPDF}
    >
      <Image src={documentIcon} alt="documento" className="w-6 md:w-6" />
    </Button>
  );
};

export default ManutencaoPDF;
