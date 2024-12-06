import { FormField } from "./types";
// Fornecedores/Clientes
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
