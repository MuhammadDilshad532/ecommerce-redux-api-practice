import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Slice";
import productReducer from "./Product/Slice";
import userReducer from "./User/Slice";
import postReducer from "./Post/Slice";
import contactReducer from "./Contact/Slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    posts: postReducer,
    contact: contactReducer,
  },
});
