interface FilterButtonProps {
  children: React.ReactNode;
  selected: boolean
  onClick: () => void;
}

const FilterButton = ({ children, selected, onClick  }: FilterButtonProps) => {
  return (
    <button onClick={onClick} className={`px-2 py-1 font-poppins text-sm border border-gray rounded-lg cursor-pointer duration-200 hover:bg-gray-100 hover:text-gray ${selected ? "bg-gray text-white" : " bg-none text-gray"}`}>
      {children}
    </button>
  );
};

export default FilterButton;
