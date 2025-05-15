import type { SupplierData } from "./SupplierData";
import type { ProductFamilyData } from "./ProductFamilyData";

export interface ProductData {
  codigo: number;
  familia: ProductFamilyData
  nome: string;
  descricao: string;
  preco: number;
  fornecedor: SupplierData
}