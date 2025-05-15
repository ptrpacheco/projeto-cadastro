import { useState, useEffect } from "react";
import { LogoBlack } from "../assets";
import { axiosPrivate } from "../api/axiosConfig";
import type { EnterpriseData } from "../interface/EnterpriseData";

const Header = () => {
  const [posts, setPosts] = useState<EnterpriseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/empresa", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setPosts(response.data.data);
      } catch (error) {
        console.error("Erro ao listar empresa: ", error);
      }

      setIsLoading(false);
    };

    fetchPosts();
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
      {posts?.length ? (
        <ul className="w-full h-12 flex flex-row items-center justify-around">
          {posts?.map((EnterpriseData) => (
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
