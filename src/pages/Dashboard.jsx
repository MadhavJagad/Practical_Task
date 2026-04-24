import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, selectUser } from "../features/authSlice";
import {
  fetchTodos,
  fetchUserTodos,
  selectFilter,
  selectPage,
  selectTotalPages,
  setFilter,
  setPage,
} from "../features/todoSlice";
import { useCallback, useEffect, useRef } from "react";
import { incrementVisitCount } from "../utils/auth";
import toast from "react-hot-toast";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const filter = useSelector(selectFilter);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  // Track visit count (incremented once per mount)
  const visitCount = useRef(0);
  const visitedRef = useRef(false);

  /* ── Increment visit count on first mount ────────────── */
  useEffect(() => {
    if (!visitedRef.current) {
      visitCount.current = incrementVisitCount();
      visitedRef.current = true;
    }
  }, []);

  /* ── Load todos whenever filter or page changes ──────── */
  const loadTodos = useCallback(() => {
    // Prevent API call if userId is missing
    if (filter === "mine" && !user?.id) return;
    if (filter === "all") {
      dispatch(fetchTodos({ page }));
    } else {
      dispatch(fetchUserTodos({ userId: user?.id, page }));
    }
  }, [dispatch, filter, page, user?.id]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  /* ── Handlers ────────────────────────────────────────── */
  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    dispatch(setFilter(newFilter));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out. See you soon!");
    navigate("/login");
  };

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface grain">
      {/* ── Top nav ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="2"
                  y="4"
                  width="12"
                  height="10"
                  rx="1.5"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 8h6M5 11h4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 2v4M11 2v4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle
                  cx="13"
                  cy="3"
                  r="2.5"
                  fill="#ff5c35"
                />
              </svg>
            </div>
            <span className="font-display font-700 text-zinc-900 text-base tracking-tight">
              TaskFlow
            </span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Avatar chip */}
            <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-3 py-1.5 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-display font-700">
                {user?.firstName?.[0] ?? "?"}
              </div>
              <span className="text-xs font-medium text-zinc-700 hidden sm:block">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M6 13H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 10l3-3-3-3M13 7H5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* ── Welcome + stats row ── */}
        <div
          className="flex flex-wrap items-start justify-between gap-4 mb-8 animate-fade-up"
          style={{ animationFillMode: "forwards" }}
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-800 text-zinc-900 tracking-tight">
              Good day,{" "}
              <span className="text-accent">{user?.firstName}</span>{" "}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Here's what you need to get done today.
            </p>
          </div>

          {/* Visit count badge */}
          <div className="bg-white border border-zinc-100 rounded-2xl px-4 py-3 shadow-card text-center min-w-[100px]">
            <p className="font-display text-2xl font-800 text-zinc-900 tabular-nums">
              {visitCount.current}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {visitCount.current === 1 ? "visit" : "visits"}
            </p>
          </div>
        </div>

        {/* ── Filter toggle ── */}
        <div
          className="flex gap-2 mb-6 p-1 bg-white border border-zinc-100 rounded-xl shadow-sm w-fit animate-fade-up delay-75"
          style={{ animationFillMode: "forwards" }}
          role="group"
          aria-label="Filter todos"
        >
          {[
            { key: "all", label: "All Todos" },
            { key: "mine", label: "My Todos" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`
                px-4 py-2 rounded-lg text-sm font-display font-600 transition-all duration-150
                ${
                  filter === key
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
                }
              `}
              aria-pressed={filter === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Add Todo form ── */}
        <div
          className="animate-fade-up delay-150"
          style={{ animationFillMode: "forwards" }}
        >
          <AddTodo />
        </div>

        {/* ── Todos section ── */}
        <div
          className="bg-surface-card rounded-2xl border border-zinc-100 shadow-card p-5 animate-fade-up delay-225"
          style={{ animationFillMode: "forwards" }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-700 text-zinc-500 uppercase tracking-widest">
              {filter === "all" ? "All Todos" : "My Todos"}
            </h2>
            {/* Refresh button */}
            <button
              onClick={loadTodos}
              className="text-zinc-300 hover:text-zinc-600 transition-colors p-1.5 rounded-lg hover:bg-zinc-50"
              aria-label="Refresh todos"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M13 7A6 6 0 102 7"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M13 3v4h-4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Todos list */}
          <TodoList />

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
