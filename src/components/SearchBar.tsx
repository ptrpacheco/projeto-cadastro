interface SearchBarProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onClear?: () => void;
}

const SearchBar = ({ value, onChange, onSearch, onClear }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-row w-2/6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Pesquisar..."
        className="w-full px-4 py-2 border-y border-l border-gray rounded-l-lg focus:outline-0"
      />
      {value && (
        <button
          onClick={onClear}
          className="pr-2 border-y border-gray text-gray cursor-pointer duration-200 hover:text-black"
        >
          ✕
        </button>
      )}
      <button
        onClick={onSearch}
        className="border border-gray px-2 rounded-r-lg cursor-pointer duration-200 hover:bg-background"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
            stroke="#C3C3C3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar