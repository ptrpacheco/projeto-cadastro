import Header from "../components/Header";
import NavBar from "../components/SideBar";
import EditButton from "../components/Button/EditButton";
import { ServicesHeader } from "../constants/CrudViewHeader";
import { axiosPrivate } from "../api/axiosConfig";
import { useEffect, useState } from "react";
import CrudContainer from "../components/CrudContainer";
import AddButton from "../components/Button/AddButton";
import CancelButton from "../components/Button/CancelButton";
import InputText from "../components/Input/InputText";
import FilterButton from "../components/Button/FilterButton";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button/Button";
import SecundaryButton from "../components/Button/SecundaryButton";
import type { ServiceData } from "../interface/ServiceData";
import Line from "../components/Line";
import InputProduct from "../components/Input/InputProduct";
import InputNumber from "../components/Input/InputNumber";
import InputSelect from "../components/Input/InputSelect";
import { TipoDesconto } from "../constants/TipoDesconto";
import PDFButton from "../components/Button/PDFButton";
import ModalButton from "../components/Button/ModalButton";
import type { ClientData } from "../interface/ClientData";
import ClientModal from "../components/Modal/ClientModal";
import RequestError from "../components/Error/RequestError";
import ErrorMessage from "../components/Error/ErrorMessage";
import axios from "axios";

const Services = () => {
  const [userState, setUserState] = useState<"view" | "add" | "edit">("view");

  const [postToEditId, setPostToEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"" | "nome/" | "cliente/">("");

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ServiceData[]>([]);
  const [requestError, setRequestError] = useState<unknown | null>(null);
  const [formError, setFormError] = useState<string>("");

  const [clientOpen, setClientOpen] = useState(false);
  const [clientList, setClientList] = useState<ClientData[]>([]);

  const initialServiceData: ServiceData = {
    codigo: 0,
    cliente: {
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
    },
    maoDeObra: {
      descricao: "",
      preco: 0,
    },
    itens: [
      {
        produtoId: 0,
        quantidade: 0,
        precoUnitario: 0,
        precoTotalItem: 0,
      },
    ],
    precoTotalProdutos: 0,
    precoTotal: 0,
    desconto: {
      tipo: "",
      valor: 0,
    },
    precoTotalComDesconto: 0,
    dataCriacao: "",
  };

  const [serviceData, setServiceData] = useState<ServiceData>({
    codigo: 0,
    cliente: {
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
    },
    maoDeObra: {
      descricao: "",
      preco: 0,
    },
    itens: [
      {
        produtoId: 0,
        quantidade: 0,
        precoUnitario: 0,
        precoTotalItem: 0,
      },
    ],
    precoTotalProdutos: 0,
    precoTotal: 0,
    desconto: {
      tipo: "",
      valor: 0,
    },
    precoTotalComDesconto: 0,
    dataCriacao: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosPrivate.get("/cliente");
        setClientList(response.data.data || []);
        setRequestError(null);
      } catch (error) {
        setRequestError(error);
      }
    };
    fetchClients();
  }, []);

  const handleSelectClient = (cpfOuCnpj: string) => {
    const selectedClient = clientList.find((c) => c.cpfOuCnpj === cpfOuCnpj);
    if (!selectedClient) return;

    setServiceData((prev) => ({
      ...prev,
      cliente: {
        ...selectedClient,
        cpfOuCnpj: selectedClient.cpfOuCnpj,
      },
    }));
    setClientOpen(false);
  };

  const getClientName = (cpfOuCnpj: string) => {
    if (!cpfOuCnpj) return "Selecione um cliente";
    const client = clientList.find((c) => c.cpfOuCnpj === cpfOuCnpj);
    return client?.nomeOuRazaoSocial || "Cliente não encontrado";
  };

  const resetServiceData = () => {
    setServiceData(initialServiceData);
  };

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/servico");
      setPosts(response.data.data);
      setRequestError(null);
    } catch (error) {
      setRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

const fetchPostById = async (codigo: number) => {
  try {
    const response = await axiosPrivate.get(`/servico/${codigo}`);
    const data = response.data.data;
    
    const processedData = {
      ...data,
      precoTotal: typeof data.precoTotal === 'string' 
        ? parseFloat(data.precoTotal) 
        : data.precoTotal,
      precoTotalComDesconto: typeof data.precoTotalComDesconto === 'string'
        ? parseFloat(data.precoTotalComDesconto)
        : data.precoTotalComDesconto,
      maoDeObra: {
        ...data.maoDeObra,
        preco: typeof data.maoDeObra.preco === 'string'
          ? parseFloat(data.maoDeObra.preco)
          : data.maoDeObra.preco
      },
      itens: data.itens.map((item: any) => ({
        produtoId: item.produtoId || item.produto?.codigo || 0,
        produto: item.produto || null,
        quantidade: item.quantidade || 0,
        precoUnitario: typeof item.precoUnitario === 'string'
          ? parseFloat(item.precoUnitario)
          : item.precoUnitario || 0,
        precoTotalItem: typeof item.precoTotalItem === 'string'
          ? parseFloat(item.precoTotalItem)
          : item.precoTotalItem || 0
      })),
      desconto: {
        ...data.desconto,
        valor: typeof data.desconto.valor === 'string'
          ? parseFloat(data.desconto.valor)
          : data.desconto.valor || 0
      }
    };
    
    setServiceData(processedData);
    setPostToEditId(codigo);
    setUserState("edit");
    setRequestError(null);
  } catch (error) {
    setRequestError(error);
  }
};

  const downloadPDF = async (codigoServico: number) => {
    try {
      const response = await axiosPrivate.get(`/servico-pdf/${codigoServico}`, {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", `servico-${codigoServico}.pdf`);
      document.body.appendChild(fileLink);
      fileLink.click();

      fileLink.remove();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        `/servico/${filterType.toLowerCase()}${searchTerm}`
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

const preparePayload = (serviceData: ServiceData) => {
  return {
    ...serviceData,
    cliente: serviceData.cliente.cpfOuCnpj,
    itens: serviceData.itens.map((item) => ({
      produtoId: item.produtoId || (item.produto ? item.produto.codigo : 0),
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      precoTotalItem: item.precoTotalItem,
    })),
  };
};

  const handleAddPost = async () => {
    try {
      const payload = preparePayload(serviceData);
      const response = await axiosPrivate.post("/servico", payload);
      console.log("Serviço criado:", response.data);
      setUserState("view");
      fetchAllPosts();
      setFormError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao adicionar serviço.");
      }
    }
  };

  const handleUpdatePost = async () => {
    if (!postToEditId) return;

    try {
      const payload = preparePayload(serviceData);
      await axiosPrivate.put(`/servico/${postToEditId}`, payload);
      setUserState("view");
      fetchAllPosts();
      setFormError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao atualizer serviço.");
      }
    }
  };

  const handleDeletePost = async () => {
    if (!postToEditId) return;

    try {
      await axiosPrivate.delete(`/servico/${postToEditId}`);
      setUserState("view");
      fetchAllPosts();
      setFormError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setFormError(apiMessage);
        console.error(error);
      } else {
        setFormError("Erro desconhecido ao apagar serviço.");
      }
    }
  };

  useEffect(() => {
    const precoTotalProdutos = serviceData.itens.reduce((total, item) => {
      return total + (item.precoTotalItem || 0);
    }, 0);

    const precoTotal = precoTotalProdutos + (serviceData.maoDeObra?.preco || 0);

    const descontoValor = serviceData.desconto?.valor || 0;
    const precoTotalComDesconto =
      serviceData.desconto?.tipo === "VALOR"
        ? precoTotal - descontoValor
        : serviceData.desconto?.tipo === "PORCENTAGEM"
        ? precoTotal - precoTotal * (descontoValor / 100)
        : precoTotal;

    setServiceData((prev) => ({
      ...prev,
      precoTotalProdutos,
      precoTotal,
      precoTotalComDesconto,
    }));
  }, [serviceData.itens, serviceData.maoDeObra.preco, serviceData.desconto]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/servico", {
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
    <>
      <ClientModal
        open={clientOpen}
        onClose={() => setClientOpen(false)}
        onSelect={handleSelectClient}
      />
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
                      Serviços
                    </h1>
                    {requestError instanceof Error && (
                      <RequestError
                        error={requestError}
                        customMessage="Erro ao carregar os serviços."
                      />
                    )}
                  </div>
                  <AddButton
                    onClick={() => {
                      setUserState("add"), resetServiceData();
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
                      Adicionar Novo Serviço
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
                      Código
                    </FilterButton>
                    <FilterButton
                      selected={filterType === "cliente/"}
                      onClick={() => setFilterType("cliente/")}
                    >
                      CPF/CNPJ Cliente
                    </FilterButton>
                  </div>
                </div>

                <ul className="w-full p-4 flex flex-row gap-2 bg-background border-b border-gray">
                  {ServicesHeader.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={
                          item.width + " font-poppins text-sm uppercase"
                        }
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
                    {posts.map((ServiceData, index) => (
                      <li
                        key={index}
                        className="w-full flex flex-row items-center justify-between p-4 border-b border-gray"
                      >
                        <div className="w-full flex flex-row gap-2">
                          <span className="text-sm basis-24 truncate">
                            {ServiceData.codigo}
                          </span>
                          <span className="text-sm basis-44 truncate">
                            {ServiceData.cliente.nomeOuRazaoSocial}
                          </span>
                          <span className="text-sm basis-38 truncate">
                            {ServiceData.cliente.cpfOuCnpj}
                          </span>
                          <span className="text-sm basis-80 truncate">
                            {ServiceData.maoDeObra.descricao}
                          </span>
                          <span className="text-sm basis-24 truncate">
                            R${" "}
                            {Number(ServiceData.precoTotalComDesconto) % 1 === 0
                              ? ServiceData.precoTotalComDesconto.toFixed(0)
                              : ServiceData.precoTotalComDesconto.toFixed(2)}
                          </span>
                          <span className="text-sm basis-32 truncate">
                            {ServiceData.dataCriacao}
                          </span>
                        </div>
                        <div className="flex flex-row gap-1">
                          <PDFButton
                            onClick={() => downloadPDF(ServiceData.codigo)}
                          />
                          <EditButton
                            onClick={() => fetchPostById(ServiceData.codigo)}
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
                      Serviços
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
                      customMessage="Erro ao carregar os serviços."
                    />
                  )}
                  {formError && <ErrorMessage message={formError} />}
                  <div className="w-full flex flex-col gap-1">
                    <label className="font-poppins font-light text-sm">
                      Cliente
                    </label>
                    <ModalButton onClick={() => setClientOpen(true)}>
                      {getClientName(serviceData.cliente.cpfOuCnpj)}
                    </ModalButton>
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Mão de Obra</span>
                    <Line />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputText
                      label="Descrição"
                      placeholder="Descreva o Serviço..."
                      value={serviceData.maoDeObra.descricao}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          maoDeObra: {
                            ...serviceData.maoDeObra,
                            descricao: e.target.value,
                          },
                        })
                      }
                    />
                    <InputNumber
                      label="Preço"
                      placeholder="Digite o Preço do Serviço..."
                      value={serviceData.maoDeObra.preco}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          maoDeObra: {
                            ...serviceData.maoDeObra,
                            preco: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Produtos</span>
                    <Line />
                  </div>
                  <InputProduct
                    value={serviceData.itens}
                    onChange={(newItens) =>
                      setServiceData({ ...serviceData, itens: newItens })
                    }
                  />
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Produtos</span>
                    <Line />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputNumber
                      label="Valor dos Produtos"
                      value={serviceData.precoTotalProdutos}
                      readOnly={true}
                    />
                    <InputNumber
                      label="Valor Total"
                      placeholder="Digite o Valor Total..."
                      value={serviceData.precoTotal}
                      readOnly={true}
                    />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputSelect
                      label="Tipo de Desconto"
                      value={serviceData.desconto?.tipo ?? ""}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          desconto: {
                            ...serviceData.desconto,
                            tipo: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="">Selecione</option>
                      {TipoDesconto.map((TipoDesconto, i) => (
                        <option key={i} value={TipoDesconto.value}>
                          {TipoDesconto.label}
                        </option>
                      ))}
                    </InputSelect>
                    <InputNumber
                      label="Valor de Desconto"
                      placeholder="Digite o Valor de Desconto..."
                      value={serviceData.desconto.valor}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          desconto: {
                            ...serviceData.desconto,
                            valor: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <InputNumber
                    label="Valor Total com Desconto"
                    value={serviceData.precoTotalComDesconto}
                    readOnly={true}
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
                      Adicionar Novo Serviço
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
                      Serviços
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
                      customMessage="Erro ao carregar os serviços."
                    />
                  )}
                  {formError && <ErrorMessage message={formError} />}
                  <div className="w-full flex flex-col gap-1">
                    <div className="w-full flex flex-col gap-1">
                      <label className="font-poppins font-light text-sm">
                        Cliente
                      </label>
                      <ModalButton onClick={() => setClientOpen(true)}>
                        {getClientName(serviceData.cliente.cpfOuCnpj)}
                      </ModalButton>
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Mão de Obra</span>
                    <Line />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputText
                      label="Descrição"
                      placeholder="Descreva o Serviço..."
                      value={serviceData.maoDeObra.descricao}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          maoDeObra: {
                            ...serviceData.maoDeObra,
                            descricao: e.target.value,
                          },
                        })
                      }
                    />
                    <InputNumber
                      label="Preço"
                      placeholder="Digite o Preço do Serviço..."
                      value={serviceData.maoDeObra.preco}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          maoDeObra: {
                            ...serviceData.maoDeObra,
                            preco: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Produtos</span>
                    <Line />
                  </div>
                  <InputProduct
                    value={serviceData.itens}
                    onChange={(newItens) =>
                      setServiceData({ ...serviceData, itens: newItens })
                    }
                  />
                  <div className="w-full flex flex-row gap-4 items-center">
                    <span className="font-poppins text-gray">Produtos</span>
                    <Line />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputNumber
                      label="Valor dos Produtos"
                      value={serviceData.precoTotalProdutos}
                      readOnly={true}
                    />
                    <InputNumber
                      label="Valor Total"
                      placeholder="Digite o Valor Total..."
                      value={serviceData.precoTotal}
                      readOnly={true}
                    />
                  </div>
                  <div className="w-full flex flex-row gap-6">
                    <InputSelect
                      label="Tipo de Desconto"
                      value={serviceData.desconto?.tipo ?? ""}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          desconto: {
                            ...serviceData.desconto,
                            tipo: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="">Selecione</option>
                      {TipoDesconto.map((TipoDesconto, i) => (
                        <option key={i} value={TipoDesconto.value}>
                          {TipoDesconto.label}
                        </option>
                      ))}
                    </InputSelect>
                    <InputNumber
                      label="Valor de Desconto"
                      placeholder="Digite o Valor de Desconto..."
                      value={serviceData.desconto.valor}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          desconto: {
                            ...serviceData.desconto,
                            valor: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <InputNumber
                    label="Valor Total com Desconto"
                    value={serviceData.precoTotalComDesconto}
                    readOnly={true}
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
    </>
  );
};

export default Services;
