import { axiosPrivate } from "../api/axiosConfig";

interface Product {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  precoTotalItem: number;
}

interface InputProductProps {
  label?: string;
  placeholder?: string;
  value: Product[];
  onChange: (products: Product[]) => void;
}

const InputProduct = ({
  label,
  placeholder,
  value,
  onChange,
}: InputProductProps) => {
  const products = value;
  const setProducts = onChange;

  const handleCodigoChange = async (index: number, newCodigo: number) => {
    try {
      const response = await axiosPrivate.get(`/produto/${newCodigo}`);
      const produto = response.data.data;

      const updated = products.map((product, i) => {
        if (i === index) {
          const precoUnitario = produto.preco ?? 0;
          const quantidade = product.quantidade;
          return {
            ...product,
            produtoId: newCodigo,
            precoUnitario,
            precoTotalItem: precoUnitario * quantidade,
          };
        }
        return product;
      });

      setProducts(updated);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);

      const updated = products.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            produtoId: newCodigo,
            precoUnitario: 0,
            precoTotalItem: 0,
          };
        }
        return product;
      });

      setProducts(updated);
    }
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
    <div className="w-full flex flex-col gap-4">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col gap-1">
          {label && index === 0 && (
            <label className="font-poppins font-light text-sm">{label}</label>
          )}
          <div className="flex flex-row gap-2 items-center">
            <input
              type="number"
              value={product.produtoId}
              placeholder={placeholder}
              onChange={(e) =>
                handleCodigoChange(index, parseInt(e.target.value) || 0)
              }
              className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.quantidade}
              onChange={(e) =>
                handleFieldChange(index, "quantidade", Number(e.target.value))
              }
              className="w-24 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.precoUnitario}
              readOnly
              className="w-28 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.precoTotalItem}
              readOnly
              className="w-28 h-10 p-2 border border-gray rounded-lg bg-gray-100 text-gray-600 placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray"
            />
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
  );
};

export default InputProduct;
