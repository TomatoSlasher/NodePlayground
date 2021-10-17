import { createSlice, configureStore } from "@reduxjs/toolkit";

const popupInitialState = { popup: "" };

const popupSlice = createSlice({
  name: "popup",
  initialState: popupInitialState,
  reducers: {
    popupState(state, action: any) {
      state.popup = action.payload;
    },
  },
});

const loginInitialState = { userId: "", username: "" };

const loginSlice = createSlice({
  name: "login",
  initialState: loginInitialState,
  reducers: {
    loginState(state, action: any) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

const store = configureStore({
  reducer: { popup: popupSlice.reducer, login: loginSlice.reducer },
});

export const popupActions = popupSlice.actions;
export const loginActions = loginSlice.actions;

export default store;
