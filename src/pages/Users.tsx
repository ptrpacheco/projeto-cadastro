import Header from "../components/Header";
import NavBar from "../components/SideBar";
import { axiosPrivate } from "../api/axiosConfig";
import { useState } from "react";
import CrudContainer from "../components/CrudContainer";
import InputText from "../components/Input/InputText";
import Button from "../components/Button/Button";
import SecundaryButton from "../components/Button/SecundaryButton";
import InputPassword from "../components/Input/InputPassword";
import type { UserData } from "../interface/UserData";
import InputSelect from "../components/Input/InputSelect";
import { CategoriaUsuario } from "../constants/CategoriaUsuario";
import RequestError from "../components/Error/RequestError";
import ErrorMessage from "../components/Error/ErrorMessage";
import axios from "axios";

const Users = () => {
  const [requestError, setRequestError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<string>("");

  const [userData, setUserData] = useState<UserData>({
    nomeUsuario: "",
    email: "",
    senha: "",
    categoria: "",
  });

  const handleAddPost = async () => {
    try {
      const response = await axiosPrivate.post("/auth/register", userData);
      console.log("Usuário criado:", response.data);
      setUserData({ nomeUsuario: "", email: "", senha: "", categoria: "" });
      setFormError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(
          typeof apiMessage === "string"
            ? apiMessage
            : "Erro ao adicionar usuário."
        );
        setRequestError(error);
      } else {
        setFormError("Erro desconhecido ao adicionar usuário.");
        setRequestError(error as Error);
      }
    }
  };

  const handleDeletePost = async () => {
    if (!userData.email) {
      setFormError("E-mail não fornecido");
      return;
    }

    try {
      await axiosPrivate.delete(`/auth/delete/${userData.email}`);
      setFormError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(
          typeof apiMessage === "string"
            ? apiMessage
            : "Erro ao deletar usuário."
        );
        setRequestError(error);
      } else {
        setFormError("Erro desconhecido ao deletar usuário.");
        setRequestError(error as Error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <div className="size-full flex flex-row">
        <NavBar />
        <CrudContainer>
          <>
            <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
              <div className="flex flex-row items-center gap-2">
                <h1 className="font-poppins font-semibold text-xl text-main">
                  Usuários
                </h1>
                <p className="font-poppins text-sm text-gray">
                  • Adicionar/Apagar Instância
                </p>
              </div>
            </div>
            <div className="h-full max-h-152 grow-0 flex flex-col gap-4 p-4 overflow-y-auto">
              {requestError && (
                <RequestError
                  error={requestError}
                  customMessage="Erro ao carregar os usuários."
                />
              )}
              {formError && <ErrorMessage message={formError} />}

              <div className="w-full flex flex-row gap-6">
                <InputText
                  label="Nome do Usuário"
                  placeholder="Digite o Nome do Usuário..."
                  value={userData.nomeUsuario}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      nomeUsuario: e.target.value,
                    })
                  }
                />
                <InputSelect
                  label="Categoria"
                  value={userData.categoria}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      categoria: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  {CategoriaUsuario.map((categoria, i) => (
                    <option key={i} value={categoria.value}>
                      {categoria.label}
                    </option>
                  ))}
                </InputSelect>
              </div>

              <div className="w-full flex flex-row gap-6">
                <InputText
                  label="Email"
                  placeholder="Digite o Email do Usuário..."
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
                <InputPassword
                  label="Senha"
                  placeholder="Digite a Senha do Usuário..."
                  value={userData.senha}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      senha: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="w-full flex flex-row gap-4 justify-between items-center p-4 border-t border-gray">
              <SecundaryButton onClick={handleDeletePost}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 3.4H2.47222M2.47222 3.4H12.25M2.47222 3.4V11.8C2.47222 12.1183 2.60099 12.4235 2.8302 12.6485C3.05941 12.8736 3.37029 13 3.69444 13H9.80556C10.1297 13 10.4406 12.8736 10.6698 12.6485C10.899 12.4235 11.0278 12.1183 11.0278 11.8V3.4M4.30556 3.4V2.2C4.30556 1.88174 4.43433 1.57652 4.66354 1.35147C4.89275 1.12643 5.20362 1 5.52778 1H7.97222C8.29638 1 8.60725 1.12643 8.83646 1.35147C9.06567 1.57652 9.19444 1.88174 9.19444 2.2V3.4M5.52778 6.4V10M7.97222 6.4V10"
                    stroke="#99CC33"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-poppins text-main font-semibold text-sm">
                  Apagar Instância
                </span>
              </SecundaryButton>

              <Button onClick={handleAddPost}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M5 1V9M1 5H9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-poppins text-white font-semibold text-sm">
                  Adicionar Novo Usuário
                </span>
              </Button>
            </div>
          </>
        </CrudContainer>
      </div>
    </div>
  );
};

export default Users;
