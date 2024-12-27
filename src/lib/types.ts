export type FormField = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
};

export type Endereco = {
  uf: string;
  cidade: string;
  rua: string;
  bairro: string;
  numero: string;
};

export type Habilitacao = {
  protocolo: string;
  vencimento: string;
  categoria: string;
  cidade: string;
  uf: string;
};

export type Documento = {
  documento: string;
  tipo: string;
};

export type FormData = {
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  habilitacao: Habilitacao;
};


export interface IDocumentos {
  id: string;
  vencimento: string;
  tipoDocumento: string;
  referencia: string;
}

export interface Manutencao {
  id: string;
  dataLancamento: string;
  dataVencimento: string;
  dataRealizada: string;
  tipo: string;
  servicoId: number;
  veiculoId: number;
  kmPrevista: number;
  kmAtual: number;
  kmRealizada: number;
  custo: number;
  veiculo?: Veiculo;
  servico?: Servico;
}

export type FormDataFornecedor = {
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
};

export type Motorista = {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
  habilitacao: Habilitacao;
};

export type Fornecedor = {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
};

export type Veiculo = {
  id: string;
  prefixo: string;
  kmAtual: number;
  placa: string;
  marca: string;
  localEmplacado: string;
  uf: string;
  carroceria: string;
  capacidadeTank: number;
  ano: number;
  tipo: string;
  modelo: string;
  quantidadePoltronas: number;
};

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
}

export interface Cliente {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
}

export interface Rota {
  saida: {
    ufSaida: string;
    cidadeSaida: string;
    localDeSaida: string;
  };
  retorno: {
    ufSaida: string;
    cidadeSaida: string;
    localDeSaida: string;
  };
}

export interface DataHorario {
  data: string;
  hora: string;
}

export interface Viagem {
  id: number;
  rota: Rota;
  dataHorarioSaida: DataHorario;
  dataHorarioRetorno: DataHorario;
  dataHorarioSaidaGaragem: DataHorario;
  dataHorarioChegada: DataHorario;
  clienteId: number;
  tipoServico: string;
  status: string;
  tipoViagem: string;
  tipoPagamento: string;
  valorContratado: number;
  itinerario: string;
  veiculoId: number;
  motoristaId: number;
  veiculo?: Veiculo;
  motorista?: Motorista;
  cliente?: Cliente;
  kmInicialVeiculo: number;
  kmFinalVeiculo: number;
  abastecimento?: Abastecimento;
  adiantamento?: Adiantamento;
  totalDespesa: number;
  valorLiquidoViagem: number;
  despesas?: IDespesas[];
  receitas?: IReceitas;
}
interface HorarioLocal {
  data: string;
  hora: string;
  local: string;
}

export interface ViagemProgramda {
  id: number;
  titulo: string;
  descricao: string;
  saida: HorarioLocal;
  retorno: HorarioLocal;
  chegada: HorarioLocal;
  valorPassagem: number;
  formaPagto: string;
  responsavel: string;
  guia: string;
  itinerario: string;
  observacoes: string;
  veiculoId: number;
  veiculo?: Veiculo;
  passagens?: Passagem[];
}
export interface Passageiro {
  id: number,
  nome: string;
  dataNascimento: string; // ou Date se preferir trabalhar com objetos Date
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  cartao: string;
  matricula: string;
}
interface Responsavel {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  cartao: string;
  matricula: string;
}

export interface Servico {
  id: string;
  nomeServico: string;
}

export interface Passagem {
  id?: number;
  viagemId: number;
  passageiroId: number;
  dataEmissao: string; // ou Date, dependendo do uso no projeto
  formaPagamento: string;
  poltrona: number;
  situacao: string;
  passageiro?: Passageiro
}

export interface IDespesas {
  id: string;
  dataPagamento: string;
  dataCompra: string;
  origemPagamento: string;
  responsavelId: number;
  responsavel: Responsavel;
  viagemId: number;
  viagem: Viagem;
  vencimento: string;
  pago: boolean;
  valorTotal: number;
  valorParcial: number;
  formaPagamento: string;
  centroCusto: string;
  responsavelNome: string;
}

export interface IReceitas {
  id: string;
  dataEmissao: string;
  dataCompra: string;
  origemPagamento: string;
  numeroDocumento: string;
  responsavelId: number;
  responsavel: Responsavel;
  viagemId: number;
  viagem: Viagem;
  vencimento: string;
  pago: boolean;
  valorTotal: number;
  valorParcial: number;
  formaPagamento: string;
  poltrona: number;
  situacao: string;
  passageiro?: Passageiro;
}

export interface Abastecimento {
  id: number;
  valorTotal: number;
  litros: number;
  codigoNfe: string;
  viagemId: number;
  viagem?: Viagem; // Referência ao objeto Viagem
}

export interface Adiantamento {
  id: number;
  tipoVerba: string;
  verba: number;
  valorDeAcerto: number;
  diferenca: number; // Calculado como verba - valorDeAcerto
  descricao: string;
  viagemId: number;
  viagem?: Viagem; // Referência ao objeto Viagem
}