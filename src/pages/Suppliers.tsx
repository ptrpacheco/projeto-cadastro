import Header from "../components/Header";
import NavBar from "../components/SideBar";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { SuppliersHeader } from "../constants/CrudViewHeader";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../api/axiosConfig";
import type { SupplierData } from "../interface/SupplierData";
import { useEffect, useState } from "react";
import CrudContainer from "../components/CrudContainer";
import AddButton from "../components/AddButton";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSuppliers = async () => {
      try {
        const response = await axiosPrivate.get("/fornecedor", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setSuppliers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getSuppliers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <div className="size-full flex flex-row">
        <NavBar />
        <CrudContainer>
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
          <h1 className="font-poppins font-semibold text-xl text-main">
            Fornecedores
          </h1>
          <Link to="/clientes/add">
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
                Adicionar Novo Fornecedor
              </span>
            </AddButton>
          </Link>
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
          <div className="flex flex-row gap-2 ">
            <span className="text-sm text-gray">Buscar por:</span>
          </div>
        </div>
        <ul className="w-full p-4 flex flex-row bg-background border-b border-gray">
          {SuppliersHeader.map((item, index) => {
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
        {suppliers.length ? (
          <ul className="size-full flex flex-col overflow-y-scroll">
            {suppliers.map((SupplierData) => (
              <li className="w-full flex flex-row items-center justify-between p-4 border-b border-gray">
                <div className="w-full flex flex-row">
                  <span className="text-sm basis-44 truncate">
                    {SupplierData.nomeOuRazaoSocial}
                  </span>
                  <span className="text-sm basis-38 truncate">
                    {SupplierData.cpfOuCnpj}
                  </span>
                  <span className="text-sm basis-24 truncate">
                    {SupplierData.tipoPessoa}
                  </span>
                  <span className="text-sm basis-38 truncate">
                    {SupplierData.email}
                  </span>
                  <span className="text-sm basis-38 truncate">
                    {SupplierData.telefones?.[0]
                      ? `(${SupplierData.telefones[0].ddd}) ${SupplierData.telefones[0].numero}`
                      : "N/A"}
                  </span>
                  <span className="text-sm basis-44 truncate">
                    {SupplierData.endereco?.enderecoFormatado ??
                      "Endereço não disponível"}
                  </span>
                </div>
                <div className="flex flex-row gap-1">
                  <EditButton />
                  <DeleteButton />
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
        </CrudContainer>
      </div>
    </div>
  );
};

export default Suppliers;
