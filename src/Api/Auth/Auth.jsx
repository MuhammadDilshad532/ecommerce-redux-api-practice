import axiosClient from "../axiosClient";

class AuthApi {
    static signUp (data) {
        return axiosClient.post("/api/auth/register" , data)
    }

}

export default AuthApi