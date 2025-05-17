import { useEffect, useState } from "react";
import type { ProductData } from "../../interface/ProductData";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../CancelButton";

interface ProductModalProps {
  open: boolean;
  onSelect: (productId: number) => void;
  onClose: () => void;
}

const ProductModal = ({ open, onClose, onSelect }: ProductModalProps) => {
  const [productList, setProductList] = useState<ProductData[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get("/produto");
        setProductList(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar lista de produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div className={`bg-white rounded-lg w-128 max-h-[80vh] overflow-y-auto transition-all ${open ? "scale-100 opacity-100" : "scale-80 opacity-0"}`}>
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
          <div className="flex flex-row items-center gap-2">
            <CancelButton onClick={onClose} />
            <h1 className="font-poppins font-semibold text-xl text-main">
              Selecionar Produto
            </h1>
          </div>
        </div>
        <ul className="p-4 flex flex-col gap-2">
          {productList.map((produto, index) => (
            <li
              key={index}
              onClick={() => onSelect(produto.codigo)}
              className="cursor-pointer duration-200 hover:bg-background p-2 rounded"
            >
               <div className="flex flex-row justify-between">
                  <span>{produto.familia.nome}</span>
                  <span>{produto.nome}</span>
               </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductModal;
