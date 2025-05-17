interface PDFButtonProps {
  onClick: () => void;
}

const PDFButton = ({ onClick }: PDFButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "w-max h-8 px-2 flex flex-row items-center justify-center gap-2 bg-main rounded-lg font-poppins text-white text-sm cursor-pointer duration-300 shadow-main/40 hover:shadow-lg hover:scale-102"
      }
    >
      Gerar PDF
    </button>
  );
};

export default PDFButton;
