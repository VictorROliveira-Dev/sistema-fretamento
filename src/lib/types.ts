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
  tipo: string
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
