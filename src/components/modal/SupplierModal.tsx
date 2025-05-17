import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../Button/CancelButton";
import type { SupplierData } from "../../interface/SupplierData";

interface SupplierModalProps {
  open: boolean;
  onSelect: (cpfOuCnpj: string) => void;
  onClose: () => void;
}

const SupplierModal = ({ open, onClose, onSelect }: SupplierModalProps) => {
  const [clientList, setClientList] = useState<SupplierData[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosPrivate.get("/fornecedor");
        setClientList(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar lista de fornecedores:", error);
      }
    };
    fetchSuppliers();
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
          </div>
        </div>
        <ul className="p-4 flex flex-col gap-2">
          {clientList.map((cliente, index) => (
            <li
              key={index}
              onClick={() => onSelect(cliente.cpfOuCnpj)}
              className="cursor-pointer duration-200 hover:bg-background p-2 rounded"
            >
              <div className="flex flex-row justify-between">
                <span>{cliente.nomeOuRazaoSocial}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupplierModal;
