import axiosClient from "../axiosClient";

class AuthApi {
    static signUp (data) {
        return axiosClient.post("/api/auth/signup" , data)
    }

}

export default AuthApi