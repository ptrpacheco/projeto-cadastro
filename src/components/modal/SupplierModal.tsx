import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../Button/CancelButton";
import type { SupplierData } from "../../interface/SupplierData";
import SearchBar from "../SearchBar";
import RequestError from "../Error/RequestError";

interface SupplierModalProps {
  open: boolean;
  onSelect: (cpfOuCnpj: string) => void;
  onClose: () => void;
}

const SupplierModal = ({ open, onClose, onSelect }: SupplierModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<unknown | null>(null);

  const [supplierList, setSupplierList] = useState<SupplierData[]>([]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(`/supplier/nome/${searchTerm}`);
      const data = response.data.data;
      setRequestError(null);
      if (Array.isArray(data)) {
        setSupplierList(data);
      } else if (data) {
        setSupplierList([data]);
      } else {
        setSupplierList([]);
      }
    } catch (error) {
      setRequestError(error);
      setSupplierList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/fornecedor");
      setSupplierList(response.data.data);
      setRequestError(null);
    } catch (error) {
      setRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosPrivate.get("/fornecedor");
        setSupplierList(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar lista de fornecedores:", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        className={`bg-white rounded-lg w-128 max-h-[80vh] overflow-y-auto transition-all ${
          open ? "scale-100 opacity-100" : "scale-80 opacity-0"
        }`}
      >
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray">
          <div className="flex flex-row items-center gap-2">
            <CancelButton onClick={onClose} />
            <h1 className="font-poppins font-semibold text-xl text-main">
              Selecionar Fornecedor
            </h1>
            {requestError instanceof Error && (
              <RequestError
                error={requestError}
                customMessage="Erro ao carregar os fornecedores."
              />
            )}
          </div>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            onClear={() => {
              setSearchTerm("");
              fetchAllPosts();
            }}
          />
        </div>
        {isLoading ? (
          <div className="w-full py-10 flex items-center justify-center">
            <p className="text-sm font-poppins text-gray">Carregando...</p>
          </div>
        ) : supplierList.length ? (
          <ul className="h-full max-h-128 grow-0 flex flex-col overflow-y-auto">
            {supplierList.map((s, index) => (
              <li
                key={index}
                onClick={() => onSelect(s.cpfOuCnpj)}
                className="w-full flex flex-row items-center justify-between p-4 border-b border-gray duration-200 cursor-pointer hover:bg-background"
              >
                <div className="w-full flex flex-row justify-between">
                  <span className="text-sm truncate font-semibold">
                    {s.nomeOuRazaoSocial}
                  </span>
                  <span className="text-sm truncate">{s.cpfOuCnpj}</span>
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
      </div>
    </div>
  );
};

export default SupplierModal;
