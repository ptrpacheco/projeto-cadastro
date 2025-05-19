import type { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={'w-full h-10 flex flex-row items-center justify-center gap-2 bg-main rounded-lg font-poppins font-semibold text-white text-sm cursor-pointer duration-300 shadow-main/40 hover:shadow-lg hover:scale-102'}
    >
      {children}
    </button>
  );
};

export default Button;
