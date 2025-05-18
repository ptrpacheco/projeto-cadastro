import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../Button/CancelButton";
import type { ProductData } from "../../interface/ProductData";
import SearchBar from "../SearchBar";
import RequestError from "../Error/RequestError";

interface ProductModalProps {
  open: boolean;
  onSelect: (codigo: number) => void;
  onClose: () => void;
}

const ProductModal = ({ open, onClose, onSelect }: ProductModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<unknown | null>(null);

  const [productList, setProductList] = useState<ProductData[]>([]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(`/produto/nome/${searchTerm}`);
      const data = response.data.data;
      setRequestError(null);
      if (Array.isArray(data)) {
        setProductList(data);
      } else if (data) {
        setProductList([data]);
      } else {
        setProductList([]);
      }
    } catch (error) {
      setRequestError(error);
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get("/produto");
      setProductList(response.data.data);
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
        const response = await axiosPrivate.get("/produto");
        setProductList(response.data.data);
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
              Selecionar Produto
            </h1>
            {requestError instanceof Error && (
              <RequestError
                error={requestError}
                customMessage="Erro ao carregar os produtos."
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
        ) : productList.length ? (
          <ul className="h-full max-h-128 grow-0 flex flex-col overflow-y-auto">
            {productList.map((f, index) => (
              <li
                key={index}
                onClick={() => onSelect(f.codigo)}
                className="w-full flex flex-row items-center justify-between p-4 border-b border-gray duration-200 cursor-pointer hover:bg-background"
              >
                <div className="w-full flex flex-row justify-between">
                  <span className="text-sm truncate">{f.nome}</span>
                  <span className="text-sm truncate">{f.familia.codigo}</span>
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

export default ProductModal;
