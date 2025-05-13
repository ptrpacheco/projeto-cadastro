interface AddButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AddButton = ({ onClick, children }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "flex flex-row items-center px-4 py-2 bg-main rounded-lg gap-2 cursor-pointer duration-300 shadow-main/40 hover:shadow-lg hover:scale-102"
      }
    >
      {children}
    </button>
  );
};

export default AddButton;
