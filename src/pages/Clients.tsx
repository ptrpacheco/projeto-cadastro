import Header from "../components/Header";
import NavBar from "../components/SideBar";
import EditButton from "../components/buttonTemp/EditButton";
import { ClientsHeader } from "../constants/CrudViewHeader";
import { axiosPrivate } from "../api/axiosConfig";
import type { ClientData } from "../interface/ClientData";
import { useEffect, useState } from "react";
import CrudContainer from "../components/CrudContainer";
import AddButton from "../components/Button/AddButton";
import CancelButton from "../components/buttonTemp/CancelButton";
import InputText from "../components/inputTemp/InputText";
import Line from "../components/Line";
import FilterButton from "../components/buttonTemp/FilterButton";
import InputSelect from "../components/inputTemp/InputSelect";
import { TipoPessoa } from "../constants/TipoPessoa";
import { UF } from "../constants/UF";
import InputTelephone from "../components/inputTemp/InputTelephone";
import SearchBar from "../components/SearchBar";
import Button from "../components/buttonTemp/Button";
import SecundaryButton from "../components/buttonTemp/SecundaryButton";
import RequestError from "../components/Error/RequestError";
import ErrorMessage from "../components/Error/ErrorMessage";
import axios from "axios";

const Clients = () => {
  const [userState, setUserState] = useState<"view" | "add" | "edit">("view");

  const [postToEditId, setPostToEditId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"" | "nome/" | "email/">("");

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ClientData[]>([]);
  const [requestError, setRequestError] = useState<unknown | null>(null);
  const [formError, setFormError] = useState<string>("");

  const initialClientData: ClientData = {
    cpfOuCnpj: "",
    tipoPessoa: "",
    nomeOuRazaoSocial: "",
    email: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      enderecoFormatado: "",
    },
    telefones: [
      {
        tipo: "",
        ddd: 0,
        numero: 0,
      },
    ],
  };

  const [clientData, setClientData] = useState<ClientData>({
    cpfOuCnpj: "",
    tipoPessoa: "",
    nomeOuRazaoSocial: "",
    email: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      enderecoFormatado: "",
    },
    telefones: [
      {
        tipo: "",
        ddd: 0,
        numero: 0,
      },
    ],
  });

  const resetClientData = () => {
    setClientData(initialClientData);
  };

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/cliente");
      setPosts(response.data.data);
      setRequestError(null);
    } catch (error) {
      setRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostById = async (cpfOuCnpj: string) => {
    try {
      const response = await axiosPrivate.get(`/cliente/${cpfOuCnpj}`);
      setClientData(response.data.data);
      setRequestError(null);
      setPostToEditId(cpfOuCnpj);
      setUserState("edit");
    } catch (error) {
      setRequestError(error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        `/cliente/${filterType.toLowerCase()}${searchTerm}`
      );
      const data = response.data.data;
      setRequestError(null);
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data) {
        setPosts([data]);
      } else {
        setPosts([]);
      }
    } catch (error) {
      setRequestError(error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPost = async () => {
    try {
      const response = await axiosPrivate.post("/cliente", clientData);
      console.log("Cliente criado:", response.data);
      setFormError("");
      setUserState("view");
      fetchAllPosts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao adicionar cliente.");
      }
    }
  };

  const handleUpdatePost = async () => {
    if (!postToEditId) return;

    try {
      console.log("Dados sendo enviados no PUT:", clientData);
      await axiosPrivate.put(`/cliente/${postToEditId}`, clientData);
      setFormError("");
      setUserState("view");
      fetchAllPosts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao atualizar cliente.");
      }
    }
  };

  const handleDeletePost = async () => {
    if (!postToEditId) return;

    try {
      await axiosPrivate.delete(`/cliente/${postToEditId}`);
      setFormError("");
      setUserState("view");
      fetchAllPosts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao apagar cliente.");
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/cliente", {
          signal: controller.signal,
        });
        setPosts(response.data.data);
        setRequestError(null);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setRequestError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <div className="size-full flex flex-1 flex-row overflow-hidden">
        <NavBar />
        <CrudContainer>
          {userState === "view" && (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <div className="flex items-center gap-2">
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Clientes
                  </h1>
                  {requestError instanceof Error && (
                    <RequestError
                      error={requestError}
                      customMessage="Erro ao carregar os clientes."
                    />
                  )}
                </div>
                <AddButton
                  onClick={() => {
                    resetClientData();
                    setUserState("add");
                  }}
                >
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
                    Adicionar Novo Cliente
                  </span>
                </AddButton>
              </div>
              <div className="flex flex-row items-center justify-between p-4 border-b border-gray gap-4">
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSearch={handleSearch}
                  onClear={() => {
                    setSearchTerm("");
                    setFilterType("");
                    fetchAllPosts();
                  }}
                />
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-sm text-gray">Buscar por:</span>
                  <FilterButton
                    selected={filterType === ""}
                    onClick={() => setFilterType("")}
                  >
                    CPF/CNPJ
                  </FilterButton>
                  <FilterButton
                    selected={filterType === "nome/"}
                    onClick={() => setFilterType("nome/")}
                  >
                    Nome ou Razão Social
                  </FilterButton>
                  <FilterButton
                    selected={filterType === "email/"}
                    onClick={() => setFilterType("email/")}
                  >
                    Email
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
              {isLoading ? (
                <div className="w-full py-10 flex items-center justify-center">
                  <p className="text-sm font-poppins text-gray">
                    Carregando...
                  </p>
                </div>
              ) : posts.length ? (
                <ul className="flex-1 overflow-y-auto flex flex-col">
                  {posts.map((ClientData, index) => (
                    <li
                      key={index}
                      className="w-full flex flex-row items-center justify-between p-4 border-b border-gray"
                    >
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
                        <span className="text-sm basis-44 truncate">
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
                        <EditButton
                          onClick={() => fetchPostById(ClientData.cpfOuCnpj)}
                        />
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
                  <CancelButton
                    onClick={() => {
                      setUserState("view"), setFormError("");
                    }}
                  />
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Clientes
                  </h1>
                  <p className="font-poppins text-sm text-gray">
                    • Adicionar Instância
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col p-4 gap-4">
                {requestError instanceof Error && (
                  <RequestError
                    error={requestError}
                    customMessage="Erro ao carregar os clientes."
                  />
                )}
                {formError && <ErrorMessage message={formError} />}
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Nome do Cliente"
                    placeholder="Digite o Nome do Cliente..."
                    value={clientData.nomeOuRazaoSocial}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        nomeOuRazaoSocial: e.target.value,
                      })
                    }
                  />
                  <InputText
                    label="CPF/CNPJ"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={clientData.cpfOuCnpj}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        cpfOuCnpj: e.target.value,
                      })
                    }
                  />
                </div>
                <InputSelect
                  label="Tipo"
                  value={clientData.tipoPessoa}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      tipoPessoa: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  {TipoPessoa.map((tipo, i) => (
                    <option key={i} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </InputSelect>

                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Endereço</span>
                  <Line />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="CEP"
                    placeholder="Digite o CEP do Cliente..."
                    value={clientData.endereco.cep}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          cep: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Logradouro"
                    placeholder="Digite o Logradouro do Cliente..."
                    value={clientData.endereco.logradouro}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          logradouro: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Número"
                    placeholder="Digite o Número do Endereço do Cliente..."
                    value={clientData.endereco.numero}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          numero: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Bairro"
                    placeholder="Digite o Bairro do Cliente..."
                    value={clientData.endereco.bairro}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          bairro: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Cidade"
                    placeholder="Digite a Cidade do Cliente..."
                    value={clientData.endereco.cidade}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          cidade: e.target.value,
                        },
                      })
                    }
                  />
                  <InputSelect
                    label="UF"
                    value={clientData.endereco?.uf ?? ""}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          uf: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Selecione</option>
                    {UF.map((UF, i) => (
                      <option key={i} value={UF.value}>
                        {UF.label}
                      </option>
                    ))}
                  </InputSelect>
                </div>
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Contato</span>
                  <Line />
                </div>
                <InputText
                  label="Email"
                  placeholder="Digite o Email do Cliente..."
                  value={clientData.email}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      email: e.target.value,
                    })
                  }
                />
                <InputTelephone
                  label="Telefones"
                  placeholder="Digite o telefone..."
                  value={clientData.telefones}
                  onChange={(newTelefones) =>
                    setClientData({ ...clientData, telefones: newTelefones })
                  }
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center p-4 border-t border-gray">
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
                    Adicionar Novo Cliente
                  </span>
                </Button>
              </div>
            </>
          )}

          {userState === "edit" && (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <div className="flex flex-row items-center gap-2">
                  <CancelButton
                    onClick={() => {
                      setUserState("view"), setFormError("");
                    }}
                  />
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Clientes
                  </h1>
                  <p className="font-poppins text-sm text-gray">
                    • Editar Instância
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col p-4 gap-4">
                {requestError instanceof Error && (
                  <RequestError
                    error={requestError}
                    customMessage="Erro ao carregar os clientes."
                  />
                )}
                {formError && <ErrorMessage message={formError} />}
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Nome do Cliente"
                    placeholder="Digite o Nome do Cliente..."
                    value={clientData.nomeOuRazaoSocial}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        nomeOuRazaoSocial: e.target.value,
                      })
                    }
                  />
                  <InputText
                    label="CPF/CNPJ"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={clientData.cpfOuCnpj}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        cpfOuCnpj: e.target.value,
                      })
                    }
                  />
                </div>
                <InputSelect
                  label="Tipo"
                  value={clientData.tipoPessoa}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      tipoPessoa: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione</option>
                  {TipoPessoa.map((tipo, i) => (
                    <option key={i} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </InputSelect>

                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Endereço</span>
                  <Line />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="CEP"
                    placeholder="Digite o CEP do Cliente..."
                    value={clientData.endereco.cep}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          cep: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Logradouro"
                    placeholder="Digite o Logradouro do Cliente..."
                    value={clientData.endereco.logradouro}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          logradouro: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Número"
                    placeholder="Digite o Número do Endereço do Cliente..."
                    value={clientData.endereco.numero}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          numero: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Bairro"
                    placeholder="Digite o Bairro do Cliente..."
                    value={clientData.endereco.bairro}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          bairro: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Cidade"
                    placeholder="Digite a Cidade do Cliente..."
                    value={clientData.endereco.cidade}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          cidade: e.target.value,
                        },
                      })
                    }
                  />
                  <InputSelect
                    label="UF"
                    value={clientData.endereco?.uf ?? ""}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        endereco: {
                          ...clientData.endereco,
                          uf: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Selecione</option>
                    {UF.map((UF, i) => (
                      <option key={i} value={UF.value}>
                        {UF.label}
                      </option>
                    ))}
                  </InputSelect>
                </div>
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Contato</span>
                  <Line />
                </div>
                <InputText
                  label="Email"
                  placeholder="Digite o Email do Cliente..."
                  value={clientData.email}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      email: e.target.value,
                    })
                  }
                />
                <InputTelephone
                  label="Telefones"
                  placeholder="Digite o telefone..."
                  value={clientData.telefones}
                  onChange={(newTelefones) =>
                    setClientData({ ...clientData, telefones: newTelefones })
                  }
                />
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
                <Button onClick={handleUpdatePost}>
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8279 1.50136C10.9868 1.34241 11.1755 1.21632 11.3832 1.1303C11.5909 1.04428 11.8135 1 12.0383 1C12.263 1 12.4856 1.04428 12.6933 1.1303C12.901 1.21632 13.0897 1.34241 13.2486 1.50136C13.4076 1.66031 13.5337 1.84901 13.6197 2.05669C13.7057 2.26436 13.75 2.48695 13.75 2.71174C13.75 2.93653 13.7057 3.15912 13.6197 3.3668C13.5337 3.57447 13.4076 3.76317 13.2486 3.92212L5.07855 12.0922L1.75 13L2.65779 9.67145L10.8279 1.50136Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="font-poppins text-white font-semibold text-sm">
                    Salvar Alterações
                  </span>
                </Button>
              </div>
            </>
          )}
        </CrudContainer>
      </div>
    </div>
  );
};

export default Clients;
