import { jsPDF } from "jspdf";
import { Viagem } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
interface GeneratePDFProps {
  viagem: Viagem;
}
const logoUrl = "/Logo.png";
const GeneratePDF = ({ viagem }: GeneratePDFProps) => {
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

  const handleDownload = async (): Promise<void> => {
    const doc = new jsPDF();

    try {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 100;
      const imgHeight = 20;

      // Logo e informações do contrato
      doc.addImage(logoUrl, "PNG", 10, 10, imgWidth, imgHeight); // Logo no canto esquerdo
      doc.setFont("Arial", "normal");
      doc.setFontSize(10);
      doc.text("Número: " + viagem.id, pageWidth - 60, 20); // Número no canto direito
      doc.text(
        "Valor: " +
          viagem.valorContratado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
        pageWidth - 60,
        30
      );
      doc.setFont("Arial", "bold");
      doc.setFontSize(14);
      doc.text("CONTRATO", pageWidth / 2, 38, { align: "center" });


      doc.text(dataAtualPorExtenso(), 128, 38);

      // Contratante com borda e grid
      doc.setLineWidth(0.5);
      doc.rect(10, 40, pageWidth - 20, 50); // Borda para informações do contratante
      doc.text("Contratante", 15, 50);
      doc.setFontSize(9);
      doc.text("Nome: " + (viagem.cliente ? viagem.cliente.nome : ""), 15, 60);
      doc.text(
        "Fantasia: " + (viagem.cliente ? viagem.cliente.nomeFantasia : ""),
        pageWidth / 2,
        60
      );
      doc.text(
        "CPF/CNPJ: " + (viagem.cliente ? viagem.cliente.cpf : ""),
        15,
        70
      );
      doc.text(
        "Endereço: " +
          (viagem.cliente
            ? `${viagem.cliente.endereco.cidade}, ${viagem.cliente.endereco.rua}`
            : ""),
        pageWidth / 2,
        70
      );
      doc.text(
        "Telefone: " + (viagem.cliente ? viagem.cliente.telefone : ""),
        15,
        80
      );
      doc.text(
        "Email: " + (viagem.cliente ? viagem.cliente.email : ""),
        pageWidth / 2,
        80
      );

      doc.rect(10, 100, pageWidth - 20, 50); // Borda para informações da contratada
      doc.text("Contratada", 15, 110);
      doc.setFontSize(9);

      // Coluna 1
      doc.text("Nome: MARCELO VIAGENS E TURISMO LTDA.", 15, 120);
      doc.text("CNPJ: 12.138.648/0001-08", 15, 130);
      doc.text("CADASTUR: 12138648000108", 15, 140);

      // Coluna 2
      doc.text(
        "Sede: AV.PRIMEIRO DE JANEIRO, 780 G1, CENTRO, IRECÊ-BA",
        pageWidth / 2,
        120
      );
      doc.text("ANTT: 000421", pageWidth / 2, 130);
      doc.text("AGERBA: 3104CS", pageWidth / 2, 140);

      doc.rect(10, 160, pageWidth - 20, 35); // Borda para informações da conta
      doc.text("Conta para Pagamento", 15, 165);
      doc.text("Ag 3036", 15, 170);
      doc.text("C/c 2140-7  Bradesco", 15, 175);
      doc.text("Pix: 12138648000108", 15, 180);
      doc.text("Marcelo viagens e turismo Ltda", 15, 185);

      doc.text("VIAGEM / ITINERÁRIO", 10, 205);

      const dataHoraSaida = `${viagem.dataHorarioSaida.data}T${viagem.dataHorarioSaida.hora}`;
      const dataHoraRetorno = `${viagem.dataHorarioRetorno.data}T${viagem.dataHorarioRetorno.hora}`;

      // Primeira linha: Saída e Retorno
      doc.text("Saída:", 10, 210);
      doc.text(format(parseISO(dataHoraSaida), "dd/MM/yyyy HH:mm"), 30, 210);
      doc.text("Retorno:", 110, 210);
      doc.text(format(parseISO(dataHoraRetorno), "dd/MM/yyyy HH:mm"), 130, 210);

      // Segunda linha: Origem e Destino
      doc.text("Origem:", 10, 215);
      doc.text(viagem.rota.saida.cidadeSaida, 30, 215);
      doc.text("Destino:", 110, 215);
      doc.text(viagem.rota.retorno.cidadeSaida, 130, 215);

      // Terceira linha: Local de Saída e Local de Retorno
      doc.text("Loc. Saída:", 10, 220);
      doc.text(viagem.rota.saida.localDeSaida, 30, 220);
      doc.text("Loc. Retorno: ", 110, 220);
      doc.text(viagem.rota.retorno.localDeSaida, 130, 220);

      // Quarta linha: Veículo/Tipo
      doc.text("Veículo/Tipo:", 10, 225);
      if (viagem.veiculo) {
        const vehicleInfo = `${viagem.veiculo.tipo}\nAcessórios: ${viagem.veiculo.acessorios}`;
        const splitText = doc.splitTextToSize(vehicleInfo, pageWidth - 40);
        doc.text(splitText, 30, 225);
      }

      doc.text("Descrição:", 10, 235);
      const descriptionLineStartY = 245;
      const descriptionLineHeight = 10;
      const descriptionNumberOfLines = 5;

      for (let i = 0; i < descriptionNumberOfLines; i++) {
        const currentY = descriptionLineStartY + i * descriptionLineHeight;
        doc.line(15, currentY, pageWidth - 15, currentY);
      }
      // Restante do conteúdo (Cláusulas, Assinaturas)
      doc.addPage(); // Nova página para cláusulas
      doc.text("Cláusulas", 10, 20);
      const clauses = [
        "O pagamento de 30% deverá ser efetuado no ato da reserva e o restante até 05 (cinco) dias antes do início da viagem.",
        "Não recebemos cheque.",
        "Em caso de desistência ou falta de complementação do pagamento pelo serviço contratado, não será devolvida a importância do sinal.",
        "A EMPRESA se reserva o direito de cancelamento caso haja não quitação da viagem ou pendências anteriores.",
        "Não será permitido o transporte de passageiros que não constem na relação de passageiros ou acima da capacidade do veículo.",
        "Danos ao veículo contratado causados por passageiros devem ser ressarcidos à empresa pelo contratante.",
        "A EMPRESA não se responsabilizará por objetos esquecidos no interior do veículo.",
        "Em caso de defeito mecânico no veículo/ônibus locado impossibilitando a prestação do serviço, é de inteira responsabilidade da EMPRESA contratada a substituição deste por outro veículo/ônibus.",
        "Estacionamento ou despesas que haja no roteiro são de inteira responsabilidade do contratante.",
        "O CONTRATANTE também é responsável pela hospedagem dos motoristas (deixando um quarto separado).",
      ];

      clauses.forEach((clause, index) => {
        doc.text(`${index + 1}. ${clause}`, 10, 40 + index * 10);
      });

      doc.text("Assinaturas", 10, 160);
      doc.text("____________", 10, 180);
      doc.text("Assinatura do Contratante", 10, 190);

      doc.text("____________", 110, 180);
      doc.text("Assinatura do Contratante", 110, 190);

      doc.text("____________", 10, 210);
      doc.text("Assinatura testemunha 1", 10, 220);

      doc.text("____________", 110, 210);
      doc.text("Assinatura testemunha 2", 110, 220);

      doc.rect(10, 230, pageWidth - 20, 60); // Borda para observações
      doc.text("Observações", 15, 240);

      // Gerar linhas para anotações
      const lineStartY = 250; // Posição inicial da primeira linha
      const lineHeight = 10; // Espaçamento entre as linhas
      const numberOfLines = 5; // Número de linhas para observações

      for (let i = 0; i < numberOfLines; i++) {
        const currentY = lineStartY + i * lineHeight;
        doc.line(15, currentY, pageWidth - 15, currentY); // Linha horizontal
      }

      doc.save("Contrato_de_Fretamento.pdf");
    } catch {
      toast("Erro ao gerar o PDF:");
    }
  };

  return <Button onClick={handleDownload}>Baixar Contrato</Button>;
};

export default GeneratePDF;
