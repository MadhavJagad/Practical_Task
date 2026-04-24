import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

/* ── Constants ───────────────────────────────────────────── */
export const PAGE_SIZE = 5; // todos per page

/* ── Async Thunks ────────────────────────────────────────── */
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async ({ page = 0 } = {}, { rejectWithValue }) => {
    try {
      const skip = page * PAGE_SIZE;
      const { data } = await api.get(`/todos?limit=${PAGE_SIZE}&skip=${skip}`);
      return { items: data.todos, total: data.total, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUserTodos = createAsyncThunk(
  "todos/fetchUserTodos",
  async ({ userId, page = 0 }, { rejectWithValue }) => {
    try {
      // dummyjson returns ALL user todos (no pagination support on this endpoint)
      const { data } = await api.get(`/users/${userId}/todos`);
      // Manually paginate on the client side
      const all = data.todos ?? [];
      const start = page * PAGE_SIZE;
      const items = all.slice(start, start + PAGE_SIZE);
      return { items, total: all.length, allItems: all, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos/add", payload);
      return data; // newly created todo
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const todoSlice = createSlice({
  name: "todos",

  initialState: {
    items: [],
    allUserItems: [],
    total: 0,
    loading: false,
    error: null,
    filter: "all", // 'all' | 'mine'
    page: 0,
  },

  reducers: {
    /** Switch between All Todos and My Todos, resetting to page 0 */
    setFilter(state, action) {
      state.filter = action.payload;
      state.page = 0;
      state.items = [];
      state.error = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearTodoError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ── fetchTodos ──────────────────────────────────────── */
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch todos";
      });

    /* ── fetchUserTodos ──────────────────────────────────── */
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.allUserItems = action.payload.allItems;
        state.page = action.payload.page;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch your todos";
      });

    /* ── addTodo ─────────────────────────────────────────── */
    builder
      .addCase(addTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // Optimistic prepend: add to front of current list
        state.items = [action.payload, ...state.items];
        state.total += 1;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add todo";
      });
  },
});

export const { setFilter, setPage, clearTodoError } = todoSlice.actions;

/* ── Selectors ───────────────────────────────────────────── */
export const selectTodos = (state) => state.todos?.items;
export const selectTotalTodos = (state) => state.todos?.total;
export const selectTodosLoading = (state) => state.todos?.loading;
export const selectTodosError = (state) => state.todos?.error;
export const selectFilter = (state) => state.todos?.filter;
export const selectPage = (state) => state.todos?.page;
// export const selectTotalPages = (state) =>
//   Math.ceil(state.todos?.total / PAGE_SIZE);
export const selectTotalPages = (state) => {
  const total = state.todos?.total ?? 0;
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
};

export default todoSlice.reducer;
