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

export interface SupplierData {
  cpfOuCnpj: string;
  tipoPessoa: string;
  nomeOuRazaoSocial: string;
  email: string;
  endereco: Endereco;
  telefones: Telefone[];
}
