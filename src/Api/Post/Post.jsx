import axiosClient from "../axiosClient";

const api = "api/posts";
class postApi {
    static getAllPosts () {
        return axiosClient.get(`${api}/posts`);
    }
}
export default postApi;