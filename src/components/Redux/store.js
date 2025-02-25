import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/User"; // Ensure the correct path

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
