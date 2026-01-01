import axios from "axios";
import { store } from "../Store/Store";
import { setAuthData } from "../Store/Auth/Slice";

const APP_URL = process.env.REACT_APP_BACKEND_LINK;

let options = {
    baseURL: APP_URL,
}
const axiosClient = axios.create(options)

axiosClient.interceptors.request.use(
    function (config) {
        if (localStorage.getItem("token")) {
            config.headers.Authorizaion = localStorage.getItem("token");
            config.headers["ngrok-skip-browser-warning"] = true;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            store.dispatch(
                setAuthData({
                    currentUser: null
                })
            );
        } else if (error.response.status === 422 || error.response.status === 404) {
            return Promise.reject(error)
        }
        return Promise.reject(error);
    }
)
export default axiosClient