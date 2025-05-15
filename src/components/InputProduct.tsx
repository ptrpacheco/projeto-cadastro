import type { ProductData } from "../interface/ProductData";

interface Product {
  produto: ProductData;
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

const InputProduct = ({ label, placeholder, value, onChange }: InputProductProps) => {
  const products = value;
  const setProducts = onChange;

  const handleCodigoChange = (index: number, newCodigo: number) => {
    // Aqui você pode buscar o ProductData completo pelo código, 
    // se tiver um lookup (ex: lista de produtos em memória)
    // Para exemplo simples, vou só atualizar o código no produto.

    const updated = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          produto: { ...product.produto, codigo: newCodigo }, // atualiza só o código
        };
      }
      return product;
    });

    setProducts(updated);
  };

  const handleFieldChange = (index: number, field: keyof Omit<Product, 'produto' | 'precoTotalItem'>, newValue: number) => {
    const updated = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = {
          ...product,
          [field]: newValue,
        };
        updatedProduct.precoTotalItem = updatedProduct.quantidade * updatedProduct.precoUnitario;
        return updatedProduct;
      }
      return product;
    });
    setProducts(updated);
  };

  const handleAdd = () => {
    setProducts([...products, { produto: { codigo: 0 }, quantidade: 1, precoUnitario: 0, precoTotalItem: 0 }]);
  };

  const handleRemove = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col gap-1">
          {label && index === 0 && <label className="font-poppins font-light text-sm">{label}</label>}
          <div className="flex flex-row gap-2 items-center">
            <input
              type="number"
              value={product.produto.codigo}
              placeholder={placeholder}
              onChange={(e) => handleCodigoChange(index, Number(e.target.value))}
              className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.quantidade}
              onChange={(e) => handleFieldChange(index, "quantidade", Number(e.target.value))}
              className="w-24 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.precoUnitario}
              onChange={(e) => handleFieldChange(index, "precoUnitario", Number(e.target.value))}
              className="w-28 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.precoTotalItem}
              readOnly
              className="w-28 h-10 p-2 border border-gray rounded-lg text-gray placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray"
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
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
