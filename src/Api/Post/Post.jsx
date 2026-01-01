import axiosClient from "../axiosClient";

class PostApi {
  static getAllPosts() {
    return axiosClient.get("/posts");
  }
}

export default PostApi;