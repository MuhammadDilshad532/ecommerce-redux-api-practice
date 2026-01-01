import axiosClient from "../axiosClient";

class AuthApi {
  static signUp(data) {
    return axiosClient.post("/auth/signup", data);
  }

  static login(data) {
    return axiosClient.post("/auth/login", data);
  }
}

export default AuthApi;
