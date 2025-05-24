interface SuccessMessageProps {
  message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-sm font-poppins">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 8.25735V8.99335C16.999 10.7185 16.4404 12.3971 15.4075 13.7788C14.3745 15.1605 12.9226 16.1713 11.2683 16.6605C9.61394 17.1496 7.84581 17.0909 6.22757 16.493C4.60934 15.8952 3.22772 14.7902 2.28877 13.343C1.34981 11.8958 0.903833 10.1838 1.01734 8.4624C1.13085 6.741 1.79777 5.10241 2.91862 3.79101C4.03948 2.4796 5.55423 1.56565 7.23695 1.18547C8.91967 0.805276 10.6802 0.979218 12.256 1.68135M17 2.59335L9 10.6013L6.6 8.20135"
          stroke="#20942E"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
