import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "@/app/assets/documentos.svg";
import { IReceitas, Pagamento } from "@/lib/types";

interface GeneratePdfProps {
  receita: IReceitas;
  pagamento: Pagamento;
}

const GeneratePDF = ({ receita, pagamento }: GeneratePdfProps) => {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  function dataAtualPorExtenso() {
    const diasDaSemana = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];
    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const hoje = new Date();
    const diaSemana = diasDaSemana[hoje.getDay()];
    const dia = hoje.getDate();
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  }

  const handleDownload = async () => {
    setLoading(true);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const frontContent = frontRef.current;

    if (frontContent instanceof HTMLElement) {
      try {
        // Exibe o conteúdo da frente
        frontContent.style.display = "block";
        await doc.html(frontContent, {
          autoPaging: "text",
          x: 10,
          y: 10,
          width: 200,
          html2canvas: {
            scale: 0.8,
          },
        });

        // Adiciona uma nova página no PDF
        doc.addPage();

        // Finaliza o processo e salva o PDF
        doc.save("Contrato_de_Fretamento.pdf");

        // Oculta novamente os conteúdos
        frontContent.style.display = "none";
      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Content is not an HTML element.");
      setLoading(false);
    }
  };

  return (
    <div className={loading ? "absolute w-[525px] " : ""}>
      {/* Front Content */}
      <div ref={frontRef} style={{ display: "none" }}>
        {/* Conteúdo da Frente */}
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "10px",
            padding: "20px",
            border: "1px solid #000",
            maxWidth: "525px",
            height: "auto",
          }}
        >
          {/* Cabeçalho */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              height: "auto",
            }}
          >
            <img
              src="/logo.png"
              alt="Marcelo Turismo"
              style={{ width: "200px" }}
            />
            <div>
              <p>
                Nome:{" "}
                <strong>
                  {receita.viagem ? receita.viagem.cliente?.nome : "sem nome"}
                </strong>
              </p>
              <p>
                cpf/cnpj:{" "}
                <strong>
                  {receita.viagem ? receita.viagem.cliente?.cpf : "sem cpf"}
                </strong>
              </p>
              <p>
                endereco:{" "}
                <strong>
                  {receita.viagem
                    ? receita.viagem.cliente?.endereco.cidade
                    : "sem cpf"}
                </strong>
              </p>
            </div>
            <div>
              <p>
                Número:{" "}
                <strong>{receita.viagem ? receita.viagem.id : "0"}</strong>
              </p>
              <p>
                Valor:{" "}
                <strong>
                  {pagamento.valorPago.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>

          {/* Itinerário */}
          <div>
            <h3 style={{ fontSize: "12px", marginBottom: "5px" }}>
              VIAGEM / ITINERÁRIO
            </h3>
            <div
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Saída:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioSaida.data
                    : "/ / "}{" "}
                  às{" "}
                  {receita.viagem ? receita.viagem.dataHorarioSaida.hora : ":"}
                </p>
                <p>
                  <strong>Retorno:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioRetorno.data
                    : "/ / "}{" "}
                  às{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioRetorno.hora
                    : ":"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Origem:</strong>{" "}
                  {receita.viagem ? receita.viagem.rota.saida.cidadeSaida : ""}
                </p>
                <p>
                  <strong>Destino:</strong>
                  {receita.viagem
                    ? receita.viagem.rota.retorno.cidadeSaida
                    : ""}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Local de Saída:</strong>{" "}
                  {receita.viagem ? receita.viagem.rota.saida.localDeSaida : ""}
                </p>
                <p>
                  <strong>Local de Retorno:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.rota.retorno.localDeSaida
                    : ""}
                </p>
              </div>
              <div>
                <p>
                  <strong>Veículo/Tipo:</strong>{" "}
                  {receita.viagem ? receita.viagem.veiculo?.tipo : ""}
                </p>
              </div>
            </div>
            <p>
              Recebemos a quantia de{" "}
              {pagamento.valorPago.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <br /> referente ao contrato{" "}
              {receita.viagem ? receita.viagemId : "0"} com valor de R${" "}
              {receita.valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <p>Irecê-Ba</p>
                <p>{dataAtualPorExtenso()}</p>
              </div>
              <div>
                <p>__________________________________</p>
                <p>Contratada</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            border: "1px solid black",
            borderStyle: "dotted",
            height: "1px",
            width: "525px",
          }}
        ></div>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "10px",
            padding: "20px",
            border: "1px solid #000",
            maxWidth: "525px",
            height: "auto",
          }}
        >
          {/* Cabeçalho */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              height: "auto",
            }}
          >
            <img
              src="/logo.png"
              alt="Marcelo Turismo"
              style={{ width: "200px" }}
            />
            <div>
              <p>
                Nome:{" "}
                <strong>
                  {receita.viagem ? receita.viagem.cliente?.nome : "sem nome"}
                </strong>
              </p>
              <p>
                cpf/cnpj:{" "}
                <strong>
                  {receita.viagem ? receita.viagem.cliente?.cpf : "sem cpf"}
                </strong>
              </p>
              <p>
                endereco:{" "}
                <strong>
                  {receita.viagem
                    ? receita.viagem.cliente?.endereco.cidade
                    : "sem cpf"}
                </strong>
              </p>
            </div>
            <div>
              <p>
                <strong>Segunda Via</strong>
              </p>
              <p>
                Número:{" "}
                <strong>{receita.viagem ? receita.viagem.id : "0"}</strong>
              </p>
              <p>
                Valor:{" "}
                <strong>
                  {pagamento.valorPago.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>

          {/* Itinerário */}
          <div>
            <h3 style={{ fontSize: "12px", marginBottom: "5px" }}>
              VIAGEM / ITINERÁRIO
            </h3>
            <div
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Saída:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioSaida.data
                    : "/ / "}{" "}
                  às{" "}
                  {receita.viagem ? receita.viagem.dataHorarioSaida.hora : ":"}
                </p>
                <p>
                  <strong>Retorno:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioRetorno.data
                    : "/ / "}{" "}
                  às{" "}
                  {receita.viagem
                    ? receita.viagem.dataHorarioRetorno.hora
                    : ":"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Origem:</strong>{" "}
                  {receita.viagem ? receita.viagem.rota.saida.cidadeSaida : ""}
                </p>
                <p>
                  <strong>Destino:</strong>
                  {receita.viagem
                    ? receita.viagem.rota.retorno.cidadeSaida
                    : ""}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Local de Saída:</strong>{" "}
                  {receita.viagem ? receita.viagem.rota.saida.localDeSaida : ""}
                </p>
                <p>
                  <strong>Local de Retorno:</strong>{" "}
                  {receita.viagem
                    ? receita.viagem.rota.retorno.localDeSaida
                    : ""}
                </p>
              </div>
              <div>
                <p>
                  <strong>Veículo/Tipo:</strong>{" "}
                  {receita.viagem ? receita.viagem.veiculo?.tipo : ""}
                </p>
              </div>
            </div>
            <p>
              Recebemos a quantia de{" "}
              {pagamento.valorPago.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <br /> referente ao contrato {receita.viagemId} com valor de R${" "}
              {receita.valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <p>Irecê-Ba</p>
                <p>{dataAtualPorExtenso()}</p>
              </div>
              <div>
                <p>__________________________________</p>
                <p>Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110"
        onClick={handleDownload}
      >
        <Image src={documentIcon} alt="documento" className="w-6" />
      </Button>
    </div>
  );
};

export default GeneratePDF;
