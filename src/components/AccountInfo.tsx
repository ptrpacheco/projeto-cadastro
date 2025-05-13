import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axiosConfig";

interface Usuario {
  nome: string;
  categoria: string;
}

const AccountInfo = () => {
  const [options, setOptions] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const navigate = useNavigate();
  const id_user = localStorage.getItem("id_user");

  const showOptions = () => setOptions(!options);

  const efetuarLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axiosPrivate.get(`/usuarios/${id_user}`);
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };

    if (id_user) fetchUsuario();
  }, [id_user]);

  return (
    <li className="w-full flex flex-row items-center justify-between px-8 py-4 border-t border-gray">
      <div className={options ? "hidden" : "w-5/6 flex flex-col gap-0"}>
        <p className="font-semibold">{usuario?.nome ?? "Usuário"}</p>
        <span className="font-light text-xs">
          {usuario?.categoria ?? "Cargo"}
        </span>
      </div>
      <div className={options ? "w-5/6 flex flex-col gap-0" : "hidden"}>
        <p onClick={efetuarLogout} className="font-semibold cursor-pointer">
          Sair da Conta
        </p>
        <span className="font-light text-xs">Trocar de Conta</span>
      </div>
      <div
        className="w-1/6 flex items-center justify-end cursor-pointer"
        onClick={showOptions}
      >
        <svg
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z"
            fill="#1E1E1E"
          />
        </svg>
      </div>
    </li>
  );
};

export default AccountInfo;
