import { LogoBlackHorizontal } from "../assets";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";

const EmailValidation = () => {
  return (
    <div className="w-screen h-screen bg-background p-16 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1440px] h-full bg-white rounded-lg p-2 flex flex-row gap-2 items-center justify-center shadow-xl">
        <div className="w-full h-full px-32 gap-8 flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <img
              src={LogoBlackHorizontal}
              alt="Logo Sinergia"
              className="h-12 w-38"
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-poppins font-semibold text-xl">
                Validação de Email
              </h1>
              <p className="font-poppins font-light text-sm">
                Seu e-mail foi validado com sucesso!
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray rounded-full"></div>
          <Link to="/">
            <Button>Voltar à página de Login</Button>
          </Link>
        </div>
        <div className="w-full h-full bg-[url(./src/assets/images/side-image.png)] bg-cover bg-no-repeat bg-center rounded-lg"></div>
      </div>
    </div>
  );
};

export default EmailValidation;
