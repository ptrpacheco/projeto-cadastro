import { useMemo, useState } from "react";
import { LogoBlackHorizontal } from "../assets";
import { LoginService } from "../service/LoginService";
import Button from "../components/Button";
import InputPassword from "../components/InputPassword";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import Line from "../components/Line";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const loginService = useMemo(() => new LoginService(), []);
  const navigate = useNavigate()

  const efetuarLogin = () => {
    loginService
      .login(email, senha)
      .then((response) => {
        console.log("Sucesso");
        console.log(response.data);
        localStorage.setItem("ACCESS_TOKEN", response.data);
        navigate('/clientes')
      })
      .catch(() => {
        console.log("Erro");
      });
  };

  return (
    <div className="w-screen h-screen bg-background p-16 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1440px] h-full bg-white rounded-lg p-2 flex flex-row gap-2 items-center justify-center shadow-xl">
        <div className="w-full h-full bg-[url(./src/assets/images/side-image.png)] bg-cover bg-no-repeat bg-center rounded-lg"></div>
        <div className="w-full h-full px-32 gap-8 flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <img
              src={LogoBlackHorizontal}
              alt="Logo Sinergia"
              className="h-12 w-38"
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-poppins font-semibold text-xl">
                Fazer Login
              </h1>
              <p className="font-poppins font-light text-sm">
                Realize Login para entrar na plataforma.
              </p>
            </div>
          </div>
          <Line />
          <div className="flex flex-col gap-6">
            <InputText
              label="Email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputPassword
              label="Senha"
              placeholder="Digite sua senha..."
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <Button onClick={efetuarLogin}>Fazer Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
