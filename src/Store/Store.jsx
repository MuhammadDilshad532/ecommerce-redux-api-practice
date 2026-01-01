import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Slice"
export const store =configureStore({
    reducer: {
        auth: authReducer ,
    },
})