import { useState, useEffect, Fragment } from "react";
import { LogoBlack } from "../assets";
import { axiosPrivate } from "../api/axiosConfig";
import type { EnterpriseData } from "../interface/EnterpriseData";
import axios from "axios";

const Header = () => {
  const [posts, setPosts] = useState<EnterpriseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/empresa", {
          signal: controller.signal,
        });
        setPosts(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
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
    <div className="w-full flex flex-col bg-white border-b-1 border-b-gray">
      <div className="w-full py-4 flex flex-row items-center justify-center shadow-lg">
        <img src={LogoBlack} alt="Logo Sinergia" className="h-16 w-32" />
      </div>

      {isLoading ? (
        <div className="w-full py-10 flex items-center justify-center">
          <p className="text-sm font-poppins text-gray">Carregando...</p>
        </div>
      ) : posts?.length ? (
        <ul className="w-full h-12 grow-0 flex flex-row items-center justify-around">
          {posts.map((enterprise, index) => (
            <Fragment key={index}>
              <li className="font-poppins text-xs text-center">{enterprise.nomeFantasia}</li>
              <li className="font-poppins text-xs text-center">{enterprise.razaoSocial}</li>
              <li className="font-poppins text-xs text-center">{enterprise.cnpj}</li>
              <li className="font-poppins text-xs text-center">
                {enterprise.endereco?.enderecoFormatado ??
                  "Endereço não disponível"}
              </li>
              <li className="font-poppins text-xs text-center">{enterprise.email}</li>
              <li className="font-poppins text-xs text-center">
                {enterprise.telefones.map((tel, i) => (
                  <span key={i}>
                    ({tel.ddd}) {tel.numero}{" "}
                  </span>
                ))}
              </li>
            </Fragment>
          ))}
        </ul>
      ) : (
        <p className="w-full py-4 text-center font-poppins text-xs text-gray">
          Nenhuma informação encontrada.
        </p>
      )}
    </div>
  );
};

export default Header;
