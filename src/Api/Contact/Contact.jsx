import axiosClient from "../axiosClient";

class ContactApi {
  static SendMessage(data) {
    return axiosClient.post("/contact", data);
  }
}

export default ContactApi;
