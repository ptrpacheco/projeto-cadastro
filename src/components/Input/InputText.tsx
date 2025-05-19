interface InputTextProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const InputText = ({ label, placeholder, value, onChange, readOnly }: InputTextProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-poppins font-light text-sm">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        className={`w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300 ${readOnly ? "text-gray" : "text-black"}`}
      />
    </div>
  );
};

export default InputText;
