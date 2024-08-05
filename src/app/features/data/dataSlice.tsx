// src/features/data/dataSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Criação do thunk assíncrono para buscar dados da API
export const fetchData: any = createAsyncThunk(
  "data/fetchData",
  async (endpoint: any) => {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
