import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import documentIcon from "@/app/assets/documentos.svg";
import { IReceitas } from "@/lib/types";

interface GeneratePdfProps {
  receita: IReceitas;
}

const GeneratePDF = ({ receita }: GeneratePdfProps) => {
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
                  {receita.viagem ? receita.viagem?.cliente?.nome : "s/n"}
                </strong>
              </p>
              <p>
                cpf/cnpj:{" "}
                <strong>
                  {receita.viagem ? receita.viagem?.cliente?.cpf : "s/n"}
                </strong>
              </p>
              <p>
                endereco:{" "}
                <strong>
                  {receita.viagem
                    ? receita.viagem?.cliente?.endereco.cidade
                    : "s/n"}
                </strong>
              </p>
            </div>
            <div>
              <p>
                Número:{" "}
                <strong>{receita.viagem ? receita.viagemId : "0"}</strong>
              </p>
              <p>
                Valor:{" "}
                <strong>
                  {receita.valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>

          {/* Itinerário */}
          <div>
            <p>Pagamentos Recebidos</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <table
                style={{
                  width: "200px",
                  marginTop: "5px",
                }}
              >
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {receita.pagamentos.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    receita.pagamentos.map((pagamento) => (
                      <tr key={pagamento.id}>
                        <td>{pagamento.dataPagamento}</td>
                        <td>
                          {pagamento.valorPago.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <span>Sem historico</span>
                  )}

                  <tr>
                    <td
                      colSpan={2} // Mescla as colunas
                      style={{
                        textAlign: "center",
                        wordWrap: "break-word",
                      }}
                    >
                      Valor total:{" "}
                      {receita.valorPago.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>
                  Origem:{" "}
                  {receita.viagem
                    ? receita.viagem.rota.saida.cidadeSaida
                    : "sem rota"}
                </p>
                <p>
                  Retorno:{" "}
                  {receita.viagem
                    ? receita.viagem.rota.retorno.cidadeSaida
                    : "sem rota"}
                </p>
                <p>
                  Itinerario:{" "}
                  {receita.viagem ? receita.viagem.itinerario : "sem rota"}{" "}
                </p>
              </div>
            </div>
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
                  {receita.viagem ? receita.viagem.cliente?.nome : "sem rota"}
                </strong>
              </p>
              <p>
                cpf/cnpj:{" "}
                <strong>
                  {receita.viagem ? receita.viagem.cliente?.cpf : "sem rota"}
                </strong>
              </p>
              <p>
                endereco:{" "}
                <strong>
                  {receita.viagem
                    ? receita.viagem.cliente?.endereco.cidade
                    : "sem rota"}
                </strong>
              </p>
            </div>
            <div>
              <p>Segunda Via</p>
              <p>
                Número:{" "}
                <strong> {receita.viagem ? receita.viagem.id : "0"}</strong>
              </p>
              <p>
                Valor:{" "}
                <strong>
                  {" "}
                  {receita.valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>

          {/* Itinerário */}
          <div>
            <p>Pagamentos Recebidos</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <table
                style={{
                  width: "200px",
                  marginTop: "5px",
                }}
              >
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {receita.pagamentos.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    receita.pagamentos.map((pagamento) => (
                      <tr key={pagamento.id}>
                        <td>{pagamento.dataPagamento}</td>
                        <td>
                          {pagamento.valorPago.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <span>Sem historico</span>
                  )}

                  <tr>
                    <td
                      colSpan={2} // Mescla as colunas
                      style={{
                        textAlign: "center",
                        wordWrap: "break-word",
                      }}
                    >
                      Valor total:{" "}
                      {receita.valorPago.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>
                  Origem:
                  {receita.viagem
                    ? receita.viagem.rota.saida.cidadeSaida
                    : "sem rota"}
                </p>
                <p>
                  Retorno:{" "}
                  {receita.viagem
                    ? receita.viagem.rota.retorno.cidadeSaida
                    : "sem rota"}
                </p>
                <p>
                  Itinerario:{" "}
                  {receita.viagem ? receita.viagem.itinerario : "sem rota"}
                </p>
              </div>
            </div>
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
