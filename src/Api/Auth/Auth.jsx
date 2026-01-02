import axiosClient from "../axiosClient";

class AuthApi {
  static login(data) {
    return axiosClient.post("/auth/login", data);
  }

  static signUp(data) {
    return axiosClient.post("/auth/signup", data);
  }

  static verifyOtp(data) {
    return axiosClient.post("/auth/verify-otp", data);
  }
}

export default AuthApi;
