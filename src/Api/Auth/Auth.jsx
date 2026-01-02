import axiosClient from "../axiosClient";

class AuthApi {
  static login(data) {
    return axiosClient.post("/auth/login", data);
  }
}

export default AuthApi;
