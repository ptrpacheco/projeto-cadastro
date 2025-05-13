import Header from "../components/Header";
import NavBar from "../components/SideBar";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { ClientsHeader } from "../constants/CrudViewHeader";
import { axiosPrivate } from "../api/axiosConfig";
import type { ClientData } from "../interface/ClientData";
import { useEffect, useState } from "react";
import CrudContainer from "../components/CrudContainer";
import AddButton from "../components/AddButton";
import CancelButton from "../components/CancelButton";
import InputText from "../components/InputText";
import Line from "../components/Line";
import FilterButton from "../components/FilterButton";

const Clients = () => {
  const [userState, setUserState] = useState<
    "view" | "add" | "edit" | "delete"
  >("view");

  const [getMethod, setGetMethod] = useState<"CpfOuCnpj" | "NomeOuRazãoSocial" | "Email">("CpfOuCnpj")

  const [clients, setClients] = useState<ClientData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getClients = async () => {
      try {
        const response = await axiosPrivate.get("/cliente", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setClients(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getClients();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [nome, setNome] = useState("");
  const [cpfOuCnpj, setCpfOuCnpj] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <div className="size-full flex flex-row">
        <NavBar />
        <CrudContainer>
          {userState === "view" && (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <h1 className="font-poppins font-semibold text-xl text-main">
                  Clientes
                </h1>
                <AddButton onClick={() => setUserState("add")}>
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="font-poppins text-white font-semibold text-sm">
                    Adicionar Novo Cliente
                  </span>
                </AddButton>
              </div>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <div className="flex flex-row w-2/5">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="w-full px-4 py-2 border-y border-l border-gray rounded-l-lg focus:outline-0"
                  />
                  <button className="border border-gray px-2 rounded-r-lg cursor-pointer duration-200 hover:bg-background">
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-sm text-gray">Buscar por:</span>
                  <FilterButton>
                    CPF/CNPJ
                  </FilterButton>
                </div>
              </div>
              <ul className="w-full p-4 flex flex-row bg-background border-b border-gray">
                {ClientsHeader.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={item.width + " font-poppins text-sm uppercase"}
                    >
                      {item.title}
                    </li>
                  );
                })}
              </ul>
              {clients.length ? (
                <ul className="max-h-5/6 flex flex-col overflow-y-scroll">
                  {clients.map((ClientData) => (
                    <li className="w-full flex flex-row items-center justify-between p-4 border-b border-gray">
                      <div className="w-full flex flex-row">
                        <span className="text-sm basis-44 truncate">
                          {ClientData.nomeOuRazaoSocial}
                        </span>
                        <span className="text-sm basis-38 truncate">
                          {ClientData.cpfOuCnpj}
                        </span>
                        <span className="text-sm basis-24 truncate">
                          {ClientData.tipoPessoa}
                        </span>
                        <span className="text-sm basis-38 truncate">
                          {ClientData.email}
                        </span>
                        <span className="text-sm basis-38 truncate">
                          {ClientData.telefones?.[0]
                            ? `(${ClientData.telefones[0].ddd}) ${ClientData.telefones[0].numero}`
                            : "N/A"}
                        </span>
                        <span className="text-sm basis-44 truncate">
                          {ClientData.endereco?.enderecoFormatado ??
                            "Endereço não disponível"}
                        </span>
                      </div>
                      <div className="flex flex-row gap-1">
                        <EditButton onClick={() => setUserState("edit")} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="size-full flex items-center justify-center">
                  <p className="w-full text-center font-poppins text-sm text-gray">
                    Nenhuma instância encontrada.
                  </p>
                </div>
              )}
            </>
          )}

          {userState === "add" && (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <div className="flex flex-row items-center gap-2">
                  <CancelButton onClick={() => setUserState("view")} />
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Clientes
                  </h1>
                  <p className="font-poppins text-sm text-gray">
                    • Adicionar Instância
                  </p>
                </div>
              </div>
              <div className="max-h-5/6 flex flex-col gap-4 p-4 overflow-y-scroll">
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Nome do Cliente"
                    placeholder="Digite o Nome do Cliente..."
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputText
                    label="CPF/CNPJ"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    onChange={(e) => setCpfOuCnpj(e.target.value)}
                  />
                </div>
                <InputText
                  label="Tipo"
                  placeholder="Digite o Tipo do Cliente..."
                  onChange={(e) => setNome(e.target.value)}
                />
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Endereço</span>
                  <Line />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="CEP"
                    placeholder="Digite o Nome do Cliente..."
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputText
                    label="Logradouro"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    onChange={(e) => setCpfOuCnpj(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Número"
                    placeholder="Digite o Nome do Cliente..."
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputText
                    label="Bairro"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    onChange={(e) => setCpfOuCnpj(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Cidade"
                    placeholder="Digite o Nome do Cliente..."
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputText
                    label="UF"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    onChange={(e) => setCpfOuCnpj(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Contato</span>
                  <Line />
                </div>
                <InputText
                  label="Email"
                  placeholder="Digite o Tipo do Cliente..."
                  onChange={(e) => setNome(e.target.value)}
                />
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Nº de Telefone"
                    placeholder="Digite o Nome do Cliente..."
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row justify-end items-center p-4 border-t border-gray">
                <AddButton>
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="font-poppins text-white font-semibold text-sm">
                    Adicionar Novo Cliente
                  </span>
                </AddButton>
              </div>
            </>
          )}

          {userState === "edit" && (
            <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
              <div className="flex flex-row items-center gap-2">
                <CancelButton onClick={() => setUserState("view")} />
                <h1 className="font-poppins font-semibold text-xl text-main">
                  Clientes
                </h1>
                <p className="font-poppins text-sm text-gray">
                  • Editar Instância
                </p>
              </div>
            </div>
          )}
        </CrudContainer>
      </div>
    </div>
  );
};

export default Clients;
