import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Viagem } from "@/lib/types";

interface GeneratePDFProps {
  viagem: Viagem;
}

const GeneratePDF = ({ viagem }: GeneratePDFProps) => {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
  
    const frontContent = frontRef.current;
    const backContent = backRef.current;
  
    if (frontContent && backContent) {
      try {
        // Temporariamente torna os elementos visíveis
        frontContent.style.display = "block";
        backContent.style.display = "block";
  
        await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno delay para renderização
  
        await doc.html(frontContent, {
          autoPaging: "text",
          x: 10,
          y: 10,
          width: 200,
          html2canvas: { scale: 0.8 },
        });
  
        doc.addPage();
  
        await doc.html(backContent, {
          autoPaging: "text",
          x: 10,
          y: 700,
          width: 200,
          html2canvas: { scale: 0.8 },
        });
  
        // Garante que o download funcione em todos os dispositivos
        const pdfBlob = doc.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "Contrato_de_Fretamento.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Oculta os elementos novamente
        frontContent.style.display = "none";
        backContent.style.display = "none";
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
                Número: <strong>{viagem.id}</strong>
              </p>
              <p>
                Valor:{" "}
                <strong>
                  {viagem.valorContratado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
            </div>
          </div>

          {/* Contratante */}
          <div>
            <fieldset
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "10px",
                padding: "15px",
                border: "1px solid #000",
                maxWidth: "525px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "12px", marginBottom: "5px" }}>
                Contratante
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    border: "1px solid #000",
                    padding: "3px",
                    flex: 1,
                  }}
                >
                  <p>
                    <strong>Nome:</strong>{" "}
                    {viagem.cliente ? viagem.cliente.nome : ""}
                  </p>
                </div>
                <div
                  style={{
                    border: "1px solid #000",
                    padding: "3px",
                    flex: 1,
                  }}
                >
                  <p>
                    <strong>Fantasia:</strong>{" "}
                    {viagem.cliente ? viagem.cliente.nomeFantasia : ""}
                  </p>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                  marginBottom: "8px",
                }}
              >
                <p>
                  <strong>CPF/CNPJ:</strong>{" "}
                  {viagem.cliente ? viagem.cliente.cpf : ""}
                </p>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                  marginBottom: "8px",
                }}
              >
                <p>
                  <strong>Endereço:</strong>{" "}
                  {viagem.cliente
                    ? viagem.cliente.endereco.cidade +
                      ", " +
                      viagem.cliente.endereco.rua
                    : ""}
                </p>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                  marginBottom: "8px",
                }}
              >
                <p>
                  <strong>Telefone:</strong>{" "}
                  {viagem.cliente ? viagem.cliente.telefone : ""}
                </p>
              </div>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                }}
              >
                <p>
                  <strong>Email:</strong>{" "}
                  {viagem.cliente ? viagem.cliente.email : ""}
                </p>
              </div>
            </fieldset>
          </div>

          {/* Contratada */}
          <div>
            <fieldset
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "10px",
                padding: "15px",
                border: "1px solid #000",
                maxWidth: "525px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "12px", marginTop: "-5px" }}>
                Contratada
              </h3>
              <div>
                <p>
                  <strong>Nome:</strong> MARCELO VIAGENS E TURISMO LTDA.
                </p>
                <p>
                  <strong>CNPJ:</strong> 12.138.648/0001-08
                </p>
                <p>
                  <strong>Sede:</strong> AV.PRIMEIRO DE JANEIRO, 780 G1, CENTRO,
                  IRECÊ-BA
                </p>
                <p>
                  <strong>CADASTUR:</strong> 12138648000108
                </p>
                <p>
                  <strong>ANTT:</strong> 000421
                </p>
                <p>
                  <strong>AGERBA:</strong> 3104CS
                </p>
              </div>
            </fieldset>
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
                marginBottom: "20px",
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
                  <strong>Saída:</strong> {viagem.dataHorarioSaida.data}
                  às {viagem.dataHorarioSaida.hora}
                </p>
                <p>
                  <strong>Retorno:</strong> {viagem.dataHorarioRetorno.data} às{" "}
                  {viagem.dataHorarioRetorno.hora}
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
                  <strong>Origem:</strong> {viagem.rota.saida.cidadeSaida}
                </p>
                <p>
                  <strong>Destino:</strong> {viagem.rota.retorno.cidadeSaida}
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
                  {viagem.rota.saida.localDeSaida}
                </p>
                <p>
                  <strong>Local de Retorno:</strong>{" "}
                  {viagem.rota.retorno.localDeSaida}
                </p>
              </div>
              <div>
                <p>
                  <strong>Veículo/Tipo:</strong>{" "}
                  {viagem.veiculo ? viagem.veiculo.tipo : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Content */}
      <div ref={backRef} style={{ display: "none" }}>
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
          <h3>Cláusulas</h3>
          <ol style={{ marginBottom: "20px" }}>
            <li>
              O pagamento de 30% deverá ser efetuado no ato da reserva e o
              restante até 05 (cinco) dias antes do início da viagem.
            </li>
            <li>Não recebemos cheque.</li>
            <li>
              Em caso de desistência ou falta de complementação do pagamento
              pelo serviço contratado, não será devolvida a importância do
              sinal.
            </li>
            <li>
              A EMPRESA se reserva o direito de cancelamento caso haja não
              quitação da viagem ou pendências anteriores.
            </li>
            <li>
              Não será permitido o transporte de passageiros que não constem na
              relação de passageiros ou acima da capacidade do veículo.
            </li>
            <li>
              Danos ao veículo contratado causados por passageiros devem ser
              ressarcidos à empresa pelo contratante.
            </li>
            <li>
              A EMPRESA não se responsabilizará por objetos esquecidos no
              interior do veículo.
            </li>
            <li>
              Em caso de defeito mecânico no veículo/ônibus locado
              impossibilitando a prestação do serviço, é de inteira
              responsabilidade da EMPRESA contratada a substituição deste por
              outro veículo/ônibus.
            </li>
            <li>
              Estacionamento ou despesas que haja no roteiro são de inteira
              responsabilidade do contratante.
            </li>
            <li>
              O CONTRATANTE também é responsável pela hospedagem dos motoristas
              (deixando um quarto separado).
            </li>
          </ol>

          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div>
                <p>__________________________________</p>
                <p>Assinatura do Contratante</p>
              </div>
              <div>
                <p>__________________________________</p>
                <p>Assinatura da Contratada</p>
              </div>
            </div>
            <div>
              <p>__________________________________</p>
              <p>Assinatura de Testemunha 1</p>
            </div>
            <div>
              <p>__________________________________</p>
              <p>Assinatura de Testemunha 2</p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleDownload}>Baixar Contrato</Button>
    </div>
  );
};

export default GeneratePDF;
