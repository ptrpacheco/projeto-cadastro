import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const navigate = useNavigate();
  const efetuarLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <li className="w-full flex flex-row items-center justify-between px-8 py-4 border-t border-gray">
      <div className={"w-5/6 flex flex-col gap-0"}>
        <p onClick={efetuarLogout} className="font-semibold cursor-pointer">
          Sair da Conta
        </p>
        <span className="font-light text-xs">Trocar de Conta</span>
      </div>
    </li>
  );
};

export default AccountInfo;
