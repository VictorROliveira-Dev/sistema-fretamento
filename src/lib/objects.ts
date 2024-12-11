import { FormField } from "./types";
// Motoristas
export const formFieldsMotoristas: FormField[] = [
  {
    label: "Nome Completo:",
    name: "nome",
    placeholder: "Digite o nome completo...",
  },
  {
    label: "Data Nascimento:",
    name: "dataNascimento",
    type: "date",
    placeholder: "",
  },
  {
    label: "Telefone:",
    name: "telefone",
    placeholder: "Digite o número do telefone...",
  },
  {
    label: "CPF:",
    name: "cpf",
    placeholder: "Digite o CPF...",
  },
  {
    label: "Documento:",
    name: "documento.documento",
    placeholder: "Digite o número do documento...",
  },
  {
    label: "Tipo de Documento:",
    name: "documento.tipo",
    placeholder: "Digite o tipo do documento...",
  },
  {
    label: "Cidade:",
    name: "endereco.cidade",
    placeholder: "Digite a cidade...",
  },
  {
    label: "UF:",
    name: "endereco.uf",
    placeholder: "Digite o Estado...",
  },
  {
    label: "Rua:",
    name: "endereco.rua",
    placeholder: "Digite a rua...",
  },
  {
    label: "Bairro:",
    name: "endereco.bairro",
    placeholder: "Digite o bairro...",
  },
  {
    label: "Número:",
    name: "endereco.numero",
    placeholder: "Digite o número...",
  },
  {
    label: "Vencimento CNH:",
    name: "habilitacao.vencimento",
    type: "date",
    placeholder: "",
  },
  {
    label: "Protocolo CNH:",
    name: "habilitacao.protocolo",
    placeholder: "Digite o protocolo...",
  },
  {
    label: "Categoria CNH:",
    name: "habilitacao.categoria",
    placeholder: "Digite a categoria...",
  },
  {
    label: "Cidade CNH:",
    name: "habilitacao.cidade",
    placeholder: "Digite a cidade...",
  },
  {
    label: "UF CNH:",
    name: "habilitacao.uf",
    placeholder: "Digite o Estado...",
  },
];

// Fornecedores/Clientes/Passageiros
export const formFieldsPessoas: FormField[] = [
  {
    label: "Nome Completo:",
    name: "nomecompleto",
    placeholder: "Digite o nome completo...",
  },
  {
    label: "Data Nascimento:",
    name: "datanascimento",
    type: "date",
    placeholder: "",
  },
  { label: "CPF:", name: "cpf", placeholder: "Digite o número do CPF..." },
  {
    label: "Cidade:",
    name: "cidade",
    placeholder: "Digite a cidade e estado...",
  },
  { label: "UF:", name: "uf", placeholder: "Digite o Estado..." },
  { label: "Rua:", name: "rua", placeholder: "Digite a rua..." },
  { label: "Bairro:", name: "bairro", placeholder: "Digite o bairro..." },
  { label: "Número:", name: "numero", placeholder: "Digite o número..." },
  { label: "Telefone:", name: "telefone", placeholder: "Digite o telefone..." },
];

// Veiculos
export const formFieldsVeiculos: FormField[] = [
  {
    label: "Prefixo:",
    name: "prefixo",
    placeholder: "Digite o prefixo...",
  },
  {
    label: "Km Atual:",
    name: "kmatual",
    placeholder: "Digite o Km Atual...",
    type: "number",
  },
  {
    label: "Placa:",
    name: "placa",
    placeholder: "Digite a placa...",
  },
  {
    label: "Marca:",
    name: "marca",
    placeholder: "Digite a marca...",
  },
  {
    label: "Local Emplacamento:",
    name: "localemplacamento",
    placeholder: "Digite o local do emplacamento...",
  },
  {
    label: "UF Emplacamento:",
    name: "ufemplacamento",
    placeholder: "Digite o Estado do emplacamento...",
  },
  {
    label: "Carroceria:",
    name: "carroceria",
    placeholder: "Digite a carroceria...",
  },
  {
    label: "Capacidade do tanque:",
    name: "tanque",
    placeholder: "Digite a capacidade...",
    type: "number",
  },
  {
    label: "Ano Veículo:",
    name: "anoveiculo",
    placeholder: "Digite o ano...",
    type: "number",
  },
  {
    label: "Qtd. Poltronas:",
    name: "poltronas",
    placeholder: "Digite a quantidade...",
    type: "number",
  },
  {
    label: "Modelo:",
    name: "modelo",
    placeholder: "Digite o modelo...",
  },
];

// documentos
export const formFieldsDocumentos: FormField[] = [
  {
    label: "Vencimento",
    name: "vencimento",
    placeholder: "",
    type: "date",
  },
];

// Finanças
export const formFields: FormField[] = [
  {
    label: "Vencimento",
    name: "vencimento",
    placeholder: "",
    type: "date",
  },
  {
    label: "Valor",
    name: "valortotal",
    placeholder: "Digite o valor",
    type: "number",
  },
  {
    label: "Viagem",
    name: "viagem",
    placeholder: "Digite o identificador da viagem",
  },
];
export const formFieldsReceitas: FormField[] = [
  {
    label: "Viagem",
    name: "viagem",
    placeholder: "Digite o identificador da viagem",
  },
  {
    label: "Origem Receita",
    name: "origemreceita",
    placeholder: "Digite a origem...",
  },
  {
    label: "Valor Total",
    name: "valortotal",
    placeholder: "Digite o valor...",
    type: "number",
  },
  {
    label: "Vencimento",
    name: "vencimento",
    placeholder: "",
    type: "date",
  },
];

// Viagens
export const formFieldsDadosSaida: FormField[] = [
  {
    label: "UF Saída:",
    name: "ufsaida",
    placeholder: "Digite o UF de Saída...",
  },
  {
    label: "Cidade Saída:",
    name: "cidadesaida",
    placeholder: "Digite a cidade de saída...",
  },
  {
    label: "Local Saída:",
    name: "localsaida",
    placeholder: "Digite o local de saída...",
  },
  {
    label: "Data Saída:",
    name: "datasaida",
    placeholder: "",
    type: "date",
  },
  {
    label: "Horário Saída:",
    name: "horariosaida",
    placeholder: "Digite o horario de saída...",
  },
  {
    label: "Data Saída Garagem:",
    name: "datasaidagaragem",
    placeholder: "",
    type: "date",
  },
];

export const formFieldsDadosChegada: FormField[] = [
  {
    label: "UF Chegada:",
    name: "ufchegada",
    placeholder: "Digite o UF de chegada...",
  },
  {
    label: "Cidade Saída:",
    name: "cidadesaida",
    placeholder: "Digite a cidade de saída...",
  },
  {
    label: "Local Saída:",
    name: "localsaida",
    placeholder: "Digite o local de saída...",
  },
  {
    label: "Data Saída:",
    name: "datasaida",
    placeholder: "",
    type: "date",
  },
  {
    label: "Horário Saída:",
    name: "horariosaida",
    placeholder: "Digite o horario de saída...",
  },
  {
    label: "Data Saída Garagem:",
    name: "datasaidagaragem",
    placeholder: "",
    type: "date",
  },
];

export const formFieldsDadosSaidaValores: FormField[] = [
  {
    label: "Parcelas",
    name: "parcelas",
    placeholder: "Digite a quantidade de parcelas...",
  },
  {
    label: "Valor Contratado:",
    name: "valorcontratado",
    placeholder: "Digite o valor contratado...",
    type: "number",
  },
  {
    label: "Valor Pago:",
    name: "valorpago",
    placeholder: "Digite o valor pago...",
    type: "number",
  },
];

export const formFieldsDadosChegadaValores: FormField[] = [
  {
    label: "Parcelas",
    name: "parcelas",
    placeholder: "Digite a quantidade de parcelas...",
  },
  {
    label: "Valor Contratado:",
    name: "valorcontratado",
    placeholder: "Digite o valor contratado...",
    type: "number",
  },
  {
    label: "Valor Pago:",
    name: "valorpago",
    placeholder: "Digite o valor pago...",
    type: "number",
  },
];

// Passagens
export const formFieldsPassagens: FormField[] = [
  {
    label: "Data Saída:",
    name: "datasaida",
    type: "date",
    placeholder: "",
  },
  {
    label: "Valor:",
    name: "valor",
    placeholder: "Digite o valor...",
    type: "number",
  },
  {
    label: "Emissão:",
    name: "emissao",
    placeholder: "",
    type: "date",
  },
  {
    label: "Emissor:",
    name: "emissor",
    placeholder: "Digite o emissor...",
  },
  {
    label: "Valor Passagem:",
    name: "valorpassagem",
    placeholder: "Digite o valor...",
  },
  {
    label: "Local Embarque:",
    name: "embarque",
    placeholder: "Digite o local embarque...",
  },
  {
    label: "Local Retorno:",
    name: "retorno",
    placeholder: "Digite o local retorno...",
  },
  {
    label: "Local desembarque:",
    name: "desembarque",
    placeholder: "Digite o desembarque...",
  },
  {
    label: "Valor Pago:",
    name: "pago",
    placeholder: "Digite o valor pago...",
    type: "number",
  },
  {
    label: "Valor Pendente:",
    name: "pendente",
    placeholder: "Digite o valor pendente...",
    type: "number",
  },
];
