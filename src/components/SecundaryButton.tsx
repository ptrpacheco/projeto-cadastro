interface SecundaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SecundaryButton = ({ onClick, children }: SecundaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={'w-full h-10 flex flex-row items-center justify-center gap-2 border-2 border-main rounded-lg font-poppins font-semibold text-main text-sm cursor-pointer duration-300 shadow-main/40 hover:shadow-lg hover:scale-102'}
    >
      {children}
    </button>
  );
};

export default SecundaryButton;
