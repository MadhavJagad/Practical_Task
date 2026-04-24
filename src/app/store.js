import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import todoReducer from "../features/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
  // Redux DevTools is enabled automatically in dev, disabled in prod
  devTools: import.meta.env.DEV,
});

export default store;
