interface InputTelephoneProps {
  label?: string;
  placeholder?: string;
  tipo: string;
  ddd: number;
  numero: number;
  onNumeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDDDChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTipoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputTelephone = ({
  label,
  placeholder,
  tipo,
  ddd,
  numero,
  onTipoChange,
  onDDDChange,
  onNumeroChange,
}: InputTelephoneProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-poppins font-light text-sm">{label}</label>
      <div className="w-full flex flex-row gap-6">
        <select
          value={tipo}
          onChange={onTipoChange}
          className="w-28 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
        >
          <option value="">Selecione</option>
          <option value="CELULAR">Celular</option>
          <option value="FIXO">Fixo</option>
        </select>
        <input
          onChange={onDDDChange}
          type="number"
          value={ddd}
          placeholder={placeholder}
          className="w-28 h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
        />
        <input
          onChange={onNumeroChange}
          type="number"
          value={numero}
          placeholder={placeholder}
          className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
        />
      </div>
    </div>
  );
};

export default InputTelephone;
