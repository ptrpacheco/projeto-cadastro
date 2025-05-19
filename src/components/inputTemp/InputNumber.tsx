interface InputNumberProps {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const InputNumber = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly,
}: InputNumberProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-poppins font-light text-sm">{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
      />
    </div>
  );
};

export default InputNumber;
