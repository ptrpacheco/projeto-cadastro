import type { ClientData } from "./ClientData";
import type { ProductData } from "./ProductData";

export interface maoDeObra {
   descricao: string,
   preco: number,
}

export interface itens {
   produto: ProductData,
   quantidade: number,
   precoUnitario: number,
   precoTotalItem: number,
}

export interface desconto {
   tipo: string,
   valor: number,
}

export interface ServiceData {
   codigo: number,
   cliente: ClientData,
   maoDeObra: maoDeObra,
   itens: itens[],
   precoTotalProdutos: number,
   precoTotal: number,
   desconto: desconto
   precoTotalComDesconto: number,
   dataCriacao: string,
}