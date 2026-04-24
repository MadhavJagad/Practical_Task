import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import { clearUser, loadUser, saveUser } from "../utils/auth";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/user/login", {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 60,
      });
      // Persist to localStorage so session survives a page refresh
      saveUser(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ── Slice ───────────────────────────────────────────────── */
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: loadUser(),
    loading: false,
    error: null,
  },

  reducers: {
    /** Sync logout – clears store + localStorage */
    logoutUser(state) {
      state.user = null;
      state.error = null;
      clearUser();
    },
    /** Clear any lingering error (e.g. when user starts re-typing) */
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;

/* ── Selectors ───────────────────────────────────────────── */
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
