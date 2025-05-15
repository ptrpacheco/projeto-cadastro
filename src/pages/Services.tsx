import Header from "../components/Header";
import NavBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import { ServicesHeader } from "../constants/CrudViewHeader";
import { axiosPrivate } from "../api/axiosConfig";
import { useEffect, useState } from "react";
import CrudContainer from "../components/CrudContainer";
import AddButton from "../components/AddButton";
import CancelButton from "../components/CancelButton";
import InputText from "../components/InputText";
import FilterButton from "../components/FilterButton";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import SecundaryButton from "../components/SecundaryButton";
import type { ServiceData } from "../interface/ServiceData";
import Line from "../components/Line";
import InputProduct from "../components/InputProduct";
import InputNumber from "../components/InputNumber";
import InputSelect from "../components/InputSelect";
import { TipoDesconto } from "../constants/TipoDesconto";

const Clients = () => {
  const [userState, setUserState] = useState<"view" | "add" | "edit">("view");

  const [postToEditId, setPostToEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"" | "nome/" | "cliente/">("");

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ServiceData[]>([]);

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
        produto: {
          codigo: 0,
          familia: {
            codigo: 0,
            nome: "",
          },
          nome: "",
          descricao: "",
          preco: 0,
          fornecedor: {
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
        },
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

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/servico");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar todos os servicços:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostById = async (codigo: number) => {
    try {
      const response = await axiosPrivate.get(`/servico/${codigo}`);
      setServiceData(response.data.data);
      setPostToEditId(codigo);
      setUserState("edit");
    } catch (error) {
      console.error("Erro ao buscar servico:", error);
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
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data) {
        setPosts([data]);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPost = async () => {
    try {
      const response = await axiosPrivate.post("/servico", serviceData);
      console.log("Serviço criado:", response.data);
      setUserState("view");
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  };

  const handleUpdatePost = async () => {
    if (!postToEditId) return;

    try {
      await axiosPrivate.put(`/servico/${postToEditId}`, serviceData);
      setUserState("view");
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!postToEditId) return;

    try {
      await axiosPrivate.delete(`/servico/${postToEditId}`);
      setUserState("view");
    } catch (error) {
      console.error("Erro ao apagar serviço:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/servico", {
          signal: controller.signal,
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Erro ao procurar serviços:", error);
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
      <div className="size-full flex flex-row">
        <NavBar />
        <CrudContainer>
          {userState === "view" && (
            <>
              <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
                <h1 className="font-poppins font-semibold text-xl text-main">
                  Serviços
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

              <ul className="w-full p-4 flex flex-row bg-background border-b border-gray">
                {ServicesHeader.map((item, index) => {
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
                <ul className="max-h-5/6 flex flex-col overflow-y-auto">
                  {posts.map((ServiceData, index) => (
                    <li
                      key={index}
                      className="w-full flex flex-row items-center justify-between p-4 border-b border-gray"
                    >
                      <div className="w-full flex flex-row">
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
                          R$ {ServiceData.precoTotalComDesconto}
                        </span>
                        <span className="text-sm basis-32 truncate">
                          {ServiceData.dataCriacao}
                        </span>
                      </div>
                      <div className="flex flex-row gap-1">
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
                  <CancelButton onClick={() => setUserState("view")} />
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Serviços
                  </h1>
                  <p className="font-poppins text-sm text-gray">
                    • Adicionar Instância
                  </p>
                </div>
              </div>
              <div className="h-full max-h-156 grow-0 flex flex-col gap-4 p-4 overflow-y-auto">
                <InputText
                  label="Cliente (CPF/CNPJ)"
                  placeholder="Digite o CPF/CNPJ do Cliente..."
                  value={serviceData.cliente.cpfOuCnpj}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      cliente: {
                        ...serviceData.cliente,
                        cpfOuCnpj: e.target.value,
                      },
                    })
                  }
                />
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Produtos</span>
                  <Line />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Cliente (CPF/CNPJ)"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={serviceData.cliente.cpfOuCnpj}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        cliente: {
                          ...serviceData.cliente,
                          cpfOuCnpj: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Cliente (CPF/CNPJ)"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={serviceData.cliente.cpfOuCnpj}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        cliente: {
                          ...serviceData.cliente,
                          cpfOuCnpj: e.target.value,
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
                  label="Produto (Código)"
                  placeholder="Digite o Código do Produto..."
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
                    placeholder="Digite o Valor Total dos Produtos..."
                    value={serviceData.precoTotalProdutos}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        precoTotalProdutos: e.target.value,
                      })
                    }
                  />
                  <InputNumber
                    label="Valor Total do Serviço"
                    placeholder="Digite o Valor Total do Serviço..."
                    value={serviceData.precoTotal}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        precoTotal: e.target.value,
                      })
                    }
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
                          valor: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <InputNumber
                  label="Valor Total com Desconto"
                  placeholder="Digite o Valor Total com Desconto do Serviço..."
                  value={serviceData.precoTotalComDesconto}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      precoTotalComDesconto: e.target.value,
                    })
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                  <CancelButton onClick={() => setUserState("view")} />
                  <h1 className="font-poppins font-semibold text-xl text-main">
                    Serviços
                  </h1>
                  <p className="font-poppins text-sm text-gray">
                    • Editar Instância
                  </p>
                </div>
              </div>
              <div className="h-full max-h-156 grow-0 flex flex-col gap-4 p-4 overflow-y-auto">
                <InputText
                  label="Cliente (CPF/CNPJ)"
                  placeholder="Digite o CPF/CNPJ do Cliente..."
                  value={serviceData.cliente.cpfOuCnpj}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      cliente: {
                        ...serviceData.cliente,
                        cpfOuCnpj: e.target.value,
                      },
                    })
                  }
                />
                <div className="w-full flex flex-row gap-4 items-center">
                  <span className="font-poppins text-gray">Produtos</span>
                  <Line />
                </div>
                <div className="w-full flex flex-row gap-6">
                  <InputText
                    label="Cliente (CPF/CNPJ)"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={serviceData.cliente.cpfOuCnpj}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        cliente: {
                          ...serviceData.cliente,
                          cpfOuCnpj: e.target.value,
                        },
                      })
                    }
                  />
                  <InputText
                    label="Cliente (CPF/CNPJ)"
                    placeholder="Digite o CPF/CNPJ do Cliente..."
                    value={serviceData.cliente.cpfOuCnpj}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        cliente: {
                          ...serviceData.cliente,
                          cpfOuCnpj: e.target.value,
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
                  label="Produto (Código)"
                  placeholder="Digite o Código do Produto..."
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
                    placeholder="Digite o Valor Total dos Produtos..."
                    value={serviceData.precoTotalProdutos}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        precoTotalProdutos: e.target.value,
                      })
                    }
                  />
                  <InputNumber
                    label="Valor Total do Serviço"
                    placeholder="Digite o Valor Total do Serviço..."
                    value={serviceData.precoTotal}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        precoTotal: e.target.value,
                      })
                    }
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
                          valor: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <InputNumber
                  label="Valor Total com Desconto"
                  placeholder="Digite o Valor Total com Desconto do Serviço..."
                  value={serviceData.precoTotalComDesconto}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      precoTotalComDesconto: e.target.value,
                    })
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
