import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosConfig";
import CancelButton from "../Button/CancelButton";
import type { ProductFamilyData } from "../../interface/ProductFamilyData";

interface ProductFamilyModalProps {
  open: boolean;
  onSelect: (codigo: number) => void;
  onClose: () => void;
}

const ProductFamilyModal = ({
  open,
  onClose,
  onSelect,
}: ProductFamilyModalProps) => {
  const [productFamilyList, setProductFamilyList] = useState<
    ProductFamilyData[]
  >([]);

  useEffect(() => {
    const fetchProductsFamilies = async () => {
      try {
        const response = await axiosPrivate.get("/familia");
        setProductFamilyList(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar lista de familias:", error);
      }
    };
    fetchProductsFamilies();
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
              Selecionar Família
            </h1>
          </div>
        </div>
        <ul className="p-4 flex flex-col gap-2">
          {productFamilyList.map((familia, index) => (
            <li
              key={index}
              onClick={() => onSelect(familia.codigo)}
              className="cursor-pointer duration-200 hover:bg-background p-2 rounded"
            >
              <div className="flex flex-row justify-between">
                <span>{familia.nome}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFamilyModal;
