import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../Button/CancelButton";
import type { ClientData } from "../../interface/ClientData";
import SearchBar from "../SearchBar";
import RequestError from "../Error/RequestError";

interface ClientModalProps {
  open: boolean;
  onSelect: (cpfOuCnpj: string) => void;
  onClose: () => void;
}

const ClientModal = ({ open, onClose, onSelect }: ClientModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<unknown | null>(null);
  const [clientList, setClientList] = useState<ClientData[]>([]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(`/cliente/nome/${searchTerm}`);
      const data = response.data.data;
      setRequestError(null);
      if (Array.isArray(data)) {
        setClientList(data);
      } else if (data) {
        setClientList([data]);
      } else {
        setClientList([]);
      }
    } catch (error) {
      setRequestError(error);
      setClientList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/cliente");
      setClientList(response.data.data);
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
        const response = await axiosPrivate.get("/cliente");
        setClientList(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar lista de clientes:", error);
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
              Selecionar Cliente
            </h1>
            {requestError instanceof Error && (
              <RequestError
                error={requestError}
                customMessage="Erro ao carregar os clientes."
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
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
        </div>
        {isLoading ? (
          <div className="w-full py-10 flex items-center justify-center">
            <p className="text-sm font-poppins text-gray">Carregando...</p>
          </div>
        ) : clientList.length ? (
          <ul className="h-full max-h-128 grow-0 flex flex-col overflow-y-auto">
            {clientList.map((c, index) => (
              <li
                key={index}
                onClick={() => onSelect(c.cpfOuCnpj)}
                className="w-full flex flex-row items-center justify-between p-4 border-b border-gray duration-200 cursor-pointer hover:bg-background"
              >
                <div className="w-full flex flex-row justify-between">
                  <span className="text-sm truncate">
                    {c.nomeOuRazaoSocial}
                  </span>
                  <span className="text-sm truncate">{c.cpfOuCnpj}</span>
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

export default ClientModal;
