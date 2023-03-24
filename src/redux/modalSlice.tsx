import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalSliceState {
  isOpen: boolean;
  data: [];
}

export const initialState: modalSliceState = {
  isOpen: false,
  data: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<boolean>) {
      state.isOpen = true;
    },
    closeModal(state, action: PayloadAction<boolean>) {
      state.isOpen = false;
      state.data = [];
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
