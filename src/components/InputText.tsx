import React from "react";

interface InputTextProps {
  label?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  label,
  placeholder,
  onChange,
}: InputTextProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-poppins font-light text-sm">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
      />
    </div>
  );
};

export default InputText;
