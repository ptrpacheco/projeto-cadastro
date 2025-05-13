import { useState, useEffect } from "react";
import { LogoBlack } from "../assets";
import { axiosPrivate } from "../api/axiosConfig";
import type { EnterpriseData } from "../interface/EnterpriseData";

const Header = () => {
  const [enterprise, setEnterprise] = useState<EnterpriseData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEnterprise = async () => {
      try {
        const response = await axiosPrivate.get("/empresa", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setEnterprise(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getEnterprise();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full flex flex-col bg-white border-b-1 border-b-gray">
      <div className="w-full py-4 flex flex-row items-center justify-center shadow-lg">
        <img src={LogoBlack} alt="Logo Sinergia" className="h-16 w-32" />
      </div>
      {enterprise?.length ? (
        <ul className="w-full py-4 flex flex-row items-center justify-around">
          {enterprise?.map((EnterpriseData) => (
            <>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.nomeFantasia}
              </li>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.razaoSocial}
              </li>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.cnpj}
              </li>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.endereco?.enderecoFormatado ??
                  "Endereço não disponível"}
              </li>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.email}
              </li>
              <li className="font-poppins text-xs text-center">
                {EnterpriseData.telefones.map((tel, i) => (
                  <span key={i}>
                    ({tel.ddd}) {tel.numero}{" "}
                  </span>
                ))}
              </li>
            </>
          ))}
        </ul>
      ) : (
        <p className="w-full py-4 text-center font-poppins text-sm text-gray">
          Nenhuma informação encontrada.
        </p>
      )}
    </div>
  );
};

export default Header;
