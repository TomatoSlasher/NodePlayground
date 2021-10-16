import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { popup: "" };

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    popupState(state, action: any) {
      state.popup = action.payload;
    },
  },
});

const store = configureStore({
  reducer: popupSlice.reducer,
});

export const popupActions = popupSlice.actions;

export default store;
