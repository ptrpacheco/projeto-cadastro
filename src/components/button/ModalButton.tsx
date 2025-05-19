interface ModalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ModalButton = ({ onClick, children }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={'w-full h-10 px-2 flex flex-row items-center gap-2 border border-gray rounded-lg font-poppins text-black text-sm cursor-pointer duration-200 hover:bg-background'}
    >
      {children}
    </button>
  );
};

export default ModalButton;
