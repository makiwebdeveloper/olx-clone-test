import { createSlice } from "@reduxjs/toolkit";

interface IPaginationState {
  currentPage: number;
  perPage: number;
}

const initialState: IPaginationState = {
  currentPage: 1,
  perPage: 8,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
});
