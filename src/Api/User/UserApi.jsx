import axiosClient from "../axiosClient";

class UserApi {
  static getUsers({ page = 1, limit = 10, search = "", role = "" }) {
    return axiosClient.get("/user", {
      params: { page, limit, search, role },
    });
  }
}

export default UserApi;
