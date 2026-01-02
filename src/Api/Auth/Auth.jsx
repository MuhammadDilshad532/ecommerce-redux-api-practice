import axiosClient from "../axiosClient";

class AuthApi {
  static login(data) {
    return axiosClient.post("/auth/login", data);
  }

  static signUp(data) {
    return axiosClient.post("/auth/signup", data);
  }
}

export default AuthApi;
