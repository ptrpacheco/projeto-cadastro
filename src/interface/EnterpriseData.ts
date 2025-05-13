export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  enderecoFormatado: string;
}

export interface Telefone {
  tipo: string;
  ddd: number;
  numero: number;
}

export interface EnterpriseData {
  id: number;
  razaoSocial: string;
  endereco: Endereco;
  cnpj: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  telefones: Telefone[];
  email: string;
  site: string;
  logotipoPath: string;
}
