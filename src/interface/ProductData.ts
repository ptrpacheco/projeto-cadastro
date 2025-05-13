export interface ProductData {
  codigo: number;
  familia: [codigo: number, nome: string];
  nome: string;
  descricao: string;
  preco: number;
  fornecedor: [
    cpfOuCnpj: string,
    tipoPessoa: string,
    nomeOuRazaoSocial: string,
    email: string,
    telefones: [tipo: string, ddd: number, numero: number],
    endereco: [
      cep: string,
      logradouro: string,
      numero: string,
      complemento: string,
      bairro: string,
      cidade: string,
      uf: string,
      enderecoFormatado: string
    ]
  ];
}