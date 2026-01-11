import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ContactApi from "../../Api/Contact/Contact";

export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ContactApi.SendMessage(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearContactError } = contactSlice.actions;
export default contactSlice.reducer;