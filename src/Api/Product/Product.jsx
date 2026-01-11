import axiosClient from "../axiosClient";

class ProductApi {
  static getAllProducts() {
    return axiosClient.get("/products");
  }

  static createProduct(data) {
    return axiosClient.post("/products", data);
  }

  static getProductById(id) {
    return axiosClient.get(`/products/${id}`);
  }

  static updateProduct(id, data) {
    return axiosClient.put(`/products/${id}`, data);
  }

  static deleteProduct(id) {
    return axiosClient.delete(`/products/${id}`);
  }
}

export default ProductApi;