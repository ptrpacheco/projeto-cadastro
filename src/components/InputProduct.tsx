interface Product {
  codigo: number;
  quantidade: number;
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
  const handleChange = (
    index: number,
    field: keyof Product,
    newValue: number
  ) => {
    const updated = value.map((product, i) =>
      i === index ? { ...product, [field]: newValue } : product
    );
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...value, { codigo: 0, quantidade: 1 }]);
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {value.map((product, index) => (
        <div key={index} className="flex flex-col gap-1">
          {label && index === 0 && (
            <label className="font-poppins font-light text-sm">{label}</label>
          )}
          <div className="flex flex-row gap-2 items-center">
            <input
              type="number"
              value={product.codigo}
              placeholder={placeholder}
              onChange={(e) =>
                handleChange(index, "codigo", Number(e.target.value))
              }
              className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            <input
              type="number"
              value={product.quantidade}
              onChange={(e) =>
                handleChange(index, "quantidade", Number(e.target.value))
              }
              className="w-24 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
            />
            {index === value.length - 1 ? (
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
