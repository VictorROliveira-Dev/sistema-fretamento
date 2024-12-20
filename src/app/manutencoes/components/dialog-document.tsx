import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Plugin para criar tabelas no PDF
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
  dadosManutencao: Manutencao[];
}

const ManutencaoPDF: React.FC<ManutencaoPDFProps> = ({ dadosManutencao }) => {
  const [placasVeiculos, setPlacasVeiculos] = useState<{ [key: string]: string }>({});
  const [nomesServicos, setNomesServicos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Carregar as placas e nomes dos serviços quando os dados de manutenção forem recebidos
    const carregarDados = async () => {
      const placas: { [key: string]: string } = {};
      const servicos: { [key: string]: string } = {};

      for (const manutencao of dadosManutencao) {
        if (!placas[manutencao.veiculoId]) {
          placas[manutencao.veiculoId] = await fetchPlacaVeiculo(manutencao.veiculoId.toString());
        }
        if (!servicos[manutencao.servicoId]) {
          servicos[manutencao.servicoId] = await fetchNomeServico(manutencao.servicoId.toString());
        }
      }

      setPlacasVeiculos(placas);
      setNomesServicos(servicos);
    };

    carregarDados();
  }, [dadosManutencao]);

  const gerarPDF = async (): Promise<void> => {
    const doc = new jsPDF();

    try {
      // Usar o caminho da imagem diretamente
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 80;
      const imgHeight = 20;
      const x = (pageWidth - imgWidth) / 2;

      // Adicionar a imagem ao PDF usando a URL da imagem
      doc.addImage(logoUrl, "PNG", x, 10, imgWidth, imgHeight);

      // Adicionar o título do documento
      doc.setFontSize(18);
      doc.text("Relatório de Manutenção", pageWidth / 2, imgHeight + 20, {
        align: "center",
      });

      let currentY = imgHeight + 30;

      dadosManutencao.forEach((manutencao, index) => {
        doc.setFontSize(14);
        doc.text(`Manutenção #${index + 1}`, 10, currentY);
        currentY += 10;

        const placaVeiculo = placasVeiculos[manutencao.veiculoId] || "Desconhecida";
        const nomeServico = nomesServicos[manutencao.servicoId] || "Desconhecido";

        const detalhes = [
          { label: "Placa do Veículo:", valor: placaVeiculo },
          { label: "Nome do Serviço:", valor: nomeServico },
          {
            label: "Data Lançamento:",
            valor: new Date(manutencao.dataLancamento).toLocaleDateString(),
          },
          {
            label: "Data Vencimento:",
            valor: new Date(manutencao.dataVencimento).toLocaleDateString(),
          },
          {
            label: "Data Realizada:",
            valor: new Date(manutencao.dataRealizada).toLocaleDateString(),
          },
          { label: "Tipo Manutenção:", valor: manutencao.tipo },
          { label: "KM Prevista:", valor: manutencao.kmPrevista },
          { label: "KM Atual:", valor: manutencao.kmAtual },
          { label: "KM Realizada:", valor: manutencao.kmRealizada },
          { label: "Custo:", valor: `R$ ${manutencao.custo.toFixed(2)}` },
        ];

        detalhes.forEach((detalhe) => {
          doc.setFontSize(12);
          doc.text(`${detalhe.label} ${detalhe.valor}`, 20, currentY);
          currentY += 7;
        });

        currentY += 10;
      });

      doc.save("relatorio_manutencao.pdf");
    } catch (error) {
      console.error("Erro ao carregar a imagem ou gerar o PDF:", error);
    }
  };

  return (
    <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110" onClick={gerarPDF}>
      <Image
        src={documentIcon}
        alt="documento"
        className="w-10 md:w-6"
      />
    </Button>
  );
};

export default ManutencaoPDF;
