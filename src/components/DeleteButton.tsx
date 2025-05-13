import { Link } from "react-router-dom";

const DeleteButton = () => {
  return (
    <Link to={"/clientes/delete/${item.id}"}>
      <button className="size-8 flex items-center justify-center border border-gray rounded-lg cursor-pointer duration-200 hover:bg-red-100">
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.2415H2.55556M2.55556 4.2415H15M2.55556 4.2415V15.4415C2.55556 15.8659 2.71944 16.2728 3.01117 16.5729C3.30289 16.8729 3.69855 17.0415 4.11111 17.0415H11.8889C12.3014 17.0415 12.6971 16.8729 12.9888 16.5729C13.2806 16.2728 13.4444 15.8659 13.4444 15.4415V4.2415M4.88889 4.2415V2.6415C4.88889 2.21716 5.05278 1.81019 5.3445 1.51013C5.63622 1.21007 6.03189 1.0415 6.44444 1.0415H9.55556C9.96811 1.0415 10.3638 1.21007 10.6555 1.51013C10.9472 1.81019 11.1111 2.21716 11.1111 2.6415V4.2415M6.44444 8.2415V13.0415M9.55556 8.2415V13.0415"
            stroke="#C3C3C3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </Link>
  );
};

export default DeleteButton;
