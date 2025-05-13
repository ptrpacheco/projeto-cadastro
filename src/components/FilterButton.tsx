interface FilterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = ({ onClick, children }: FilterButtonProps) => {
  return (
    <button onClick={onClick} className="px-2 py-1 font-poppins text-sm text-gray border border-gray rounded-lg cursor-pointer duration-200 hover:bg-gray-100">
      {children}
    </button>
  );
};

export default FilterButton;
