interface Telephone {
  tipo: string;
  ddd: number;
  numero: number;
}

interface InputTelephoneProps {
  label?: string;
  placeholder?: string;
  value: Telephone[];
  onChange: (telefones: Telephone[]) => void;
}

const InputTelephone = ({ label, placeholder, value, onChange }: InputTelephoneProps) => {
  const telefones = value;
  const setTelefones = onChange;


  const handleChange = (
    index: number,
    field: keyof Telephone,
    value: string | number
  ) => {
    const updated = telefones.map((tel, i) =>
      i === index ? { ...tel, [field]: value } : tel
    );
    setTelefones(updated);
  };

  const handleAdd = () => {
    setTelefones([...telefones, { tipo: "", ddd: 0, numero: 0 }]);
  };

  const handleRemove = (index: number) => {
    const updated = telefones.filter((_, i) => i !== index);
    setTelefones(updated);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {telefones.map((tel, index) => (
        <div key={index} className="flex flex-col gap-1">
          {label && index === 0 && (
            <label className="font-poppins font-light text-sm">{label}</label>
          )}
          <div className="flex flex-row gap-2 items-center">
            <select
              value={tel.tipo}
              onChange={(e) => handleChange(index, "tipo", e.target.value)}
              className="w-28 h-10 p-2 border border-gray rounded-lg focus:outline-0 focus:border-main"
            >
              <option value="">Selecione</option>
              <option value="CELULAR">Celular</option>
              <option value="FIXO">Fixo</option>
            </select>
            <input
              type="number"
              value={tel.ddd}
              placeholder={placeholder}
              onChange={(e) =>
                handleChange(index, "ddd", Number(e.target.value))
              }
              className="w-20 h-10 p-2 border border-gray rounded-lg"
            />
            <input
              type="number"
              value={tel.numero}
              placeholder={placeholder}
              onChange={(e) =>
                handleChange(index, "numero", Number(e.target.value))
              }
              className="w-full h-10 p-2 border border-gray rounded-lg"
            />

            {index === telefones.length - 1 ? (
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

export default InputTelephone;
