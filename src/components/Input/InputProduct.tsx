import { useEffect, useState } from "react";
import ModalButton from "../Button/ModalButton";
import InputNumber from "./InputNumber";
import ProductModal from "../Modal/ProductModal";
import { axiosPrivate } from "../../api/axiosConfig";
import type { ProductData } from "../../interface/ProductData";

interface Product {
  produtoId: number;
  produto?: ProductData;
  quantidade: number;
  precoUnitario: number;
  precoTotalItem: number;
}

interface InputProductProps {
  value: Product[];
  onChange: (products: Product[]) => void;
}

const InputProduct = ({ value, onChange }: InputProductProps) => {
  const products = value;
  const setProducts = onChange;

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get("/produto");
        setProductList(response.data.data || []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSelectProduct = (produtoId: number) => {
    if (selectedIndex === null) return;
    const sel = productList.find((p) => p.codigo === produtoId);
    if (!sel) return;

    const updated = products.map((prod, i) => {
      if (i === selectedIndex) {
        const quantidade = prod.quantidade || 1;
        const precoUnitario = sel.preco || 0;
        return {
          produtoId,
          produto: sel,
          quantidade,
          precoUnitario,
          precoTotalItem: quantidade * precoUnitario,
        };
      }
      return prod;
    });
    setProducts(updated);
    setOpen(false);
  };

  const handleFieldChange = (
    index: number,
    field: keyof Omit<Product, "precoTotalItem">,
    newValue: number
  ) => {
    const updated = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = {
          ...product,
          [field]: newValue,
        };
        updatedProduct.precoTotalItem =
          updatedProduct.quantidade * updatedProduct.precoUnitario;
        return updatedProduct;
      }
      return product;
    });
    setProducts(updated);
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        produtoId: 0,
        quantidade: 1,
        precoUnitario: 0,
        precoTotalItem: 0,
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <>
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelectProduct}
      />
      <div className="w-full flex flex-col gap-4">
        {products.map((product, index) => (
          <div key={`${product.produtoId}-${index}`} className="flex flex-col gap-1">
            <div className="w-full flex flex-row gap-2 items-end">
              <div className="w-full flex flex-col gap-1">
                {index === 0 && (
                  <label className="font-poppins font-light text-sm">
                    Produto
                  </label>
                )}
                <ModalButton
                  onClick={() => {
                    setSelectedIndex(index);
                    setOpen(true);
                  }}
                >
                  {product.produto?.nome ?? "Selecione um produto"}
                </ModalButton>
              </div>
              <div className="flex flex-col gap-1">
                {index === 0 && (
                  <label className="font-poppins font-light text-sm">
                    Quantidade
                  </label>
                )}
                <InputNumber
                  value={product.quantidade}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "quantidade",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                {index === 0 && (
                  <label className="font-poppins font-light text-sm">
                    Preço Unitário
                  </label>
                )}
                <InputNumber value={product.precoUnitario} readOnly />
              </div>
              <div className="flex flex-col gap-1">
                {index === 0 && (
                  <label className="font-poppins font-light text-sm">
                    Preço Total
                  </label>
                )}
                <InputNumber value={product.precoTotalItem} readOnly />
              </div>
              {index === products.length - 1 ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="size-10 shrink-0 flex items-center justify-center border border-gray rounded-lg cursor-pointer duration-200 hover:bg-background"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 1V9M1 5H9"
                      stroke="#c3c3c3"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="size-10 shrink-0 flex items-center justify-center border border-gray rounded-lg cursor-pointer duration-200 hover:bg-background"
                >
                  <svg
                    width="14"
                    height="2"
                    viewBox="0 0 14 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1H13"
                      stroke="#C3C3C3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InputProduct;
