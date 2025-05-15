import React, { type ReactNode } from "react";

interface InputSelectProps {
  label?: string;
  value?: string;
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const InputSelect = ({ label, value, children, onChange }: InputSelectProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-poppins font-light text-sm">{label}</label>
      <select
        onChange={onChange}
        value={value}
        className="w-full h-10 p-2 border border-gray rounded-lg placeholder:font-poppins placeholder:font-light placeholder:text-xs placeholder:text-gray focus:outline-0 focus:border-main duration-300"
      >
        {children}
      </select>
    </div>
  );
};

export default InputSelect;
