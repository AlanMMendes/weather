// src/features/data/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice: any = createSlice({
  name: "filter",
  initialState: {
    lat: 0,
    lon: 0,
  },
  reducers: {
    setData: (state: any, action: any) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setData } = filterSlice.actions;

export default filterSlice.reducer;
