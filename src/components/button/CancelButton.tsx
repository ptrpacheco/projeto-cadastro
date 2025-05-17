interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="size-6 flex justify-center items-center rounded border border-gray cursor-pointer duration-200 hover:bg-lime-100"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5H1M1 5L5 9M1 5L5 1"
          stroke="#C3C3C3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default CancelButton;
