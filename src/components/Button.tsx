interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={'w-full h-10 bg-main rounded-lg font-poppins font-semibold text-white text-sm cursor-pointer duration-300 shadow-main/40 hover:shadow-lg hover:scale-102'}
    >
      {children}
    </button>
  );
};

export default Button;
