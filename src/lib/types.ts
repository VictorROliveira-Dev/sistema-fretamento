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
  documento: {
    documento: string;
    tipo: string;
  };
  endereco: {
    uf: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
  };
  cpf: string;
  habilitacao: {
    protocolo: string;
    vencimento: string;
    categoria: string;
    cidade: string;
    uf: string;
  };
};

export type Fornecedor = {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: {
    documento: string;
    tipo: string;
  };
  endereco: {
    uf: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
  };
  cpf: string;
  tipo: string;
};

export type Veiculo = {
  id: string;
  prefixo: string;
  kmAtual: string;
  placa: string;
  marca: string;
  localEmplacado: string;
  uf: string;
  carroceria: string;
  capacidadeTank: string;
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
  data: string
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
}



interface HorarioLocal {
  data: string;
  hora: string;
  local: string;
}

export interface ViagemProgramda {
  id: number,
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
  dataNascimento: string; // ou `Date` se preferir trabalhar com objetos Date
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  cartao: string;
  matricula: string;
}

export interface Passagem {
  id?: Number;
  viagemId: number;
  passageiroId: number;
  dataEmissao: string; // ou Date, dependendo do uso no projeto
  formaPagamento: string;
  poltrona: number;
  situacao: string;
  passageiro?: Passageiro
}