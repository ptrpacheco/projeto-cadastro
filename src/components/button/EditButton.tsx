interface EditButtonProps {
  onClick: () => void,
}

const EditButton = ({onClick}: EditButtonProps) => {
  return (
      <button onClick={onClick} className="size-8 flex items-center justify-center border border-gray rounded-lg cursor-pointer duration-200 hover:bg-lime-100">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.15659 2.72833H2.59035C2.16857 2.72833 1.76405 2.89588 1.4658 3.19413C1.16755 3.49238 1 3.89689 1 4.31868V15.4512C1 15.8729 1.16755 16.2775 1.4658 16.5757C1.76405 16.8739 2.16857 17.0415 2.59035 17.0415H13.7228C14.1446 17.0415 14.5491 16.8739 14.8474 16.5757C15.1456 16.2775 15.3132 15.8729 15.3132 15.4512V9.88492M14.1204 1.53556C14.4368 1.21922 14.8658 1.0415 15.3132 1.0415C15.7605 1.0415 16.1896 1.21922 16.5059 1.53556C16.8223 1.8519 17 2.28095 17 2.72833C17 3.1757 16.8223 3.60475 16.5059 3.92109L8.95176 11.4753L5.77106 12.2704L6.56624 9.08974L14.1204 1.53556Z"
            stroke="#C3C3C3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
  );
};

export default EditButton;
