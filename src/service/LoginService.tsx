import { axiosPrivate } from "../api/axiosConfig";

export class LoginService {
  login(email: String, senha: String) {
    return axiosPrivate.post("/auth/login", null, {
      params: {
        username: email,
        password: senha,
      },
    });
  }
}
