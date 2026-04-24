import { useSelector } from "react-redux";
import {
  selectTodos,
  selectTodosError,
  selectTodosLoading,
} from "../features/todoSlice";
import Loader from "./Loader";

const TodoCard = ({ todo, index }) => {
  const delayClass =
    ["delay-75", "delay-150", "delay-225", "delay-300", "delay-375"][index] ??
    "";

  return (
    <div
      className={`
        group flex items-start gap-3 p-4 bg-surface-card rounded-xl border border-zinc-100
        shadow-card hover:shadow-card-hover hover:-translate-y-0.5
        transition-all duration-200 animate-fade-up opacity-0 ${delayClass}
      `}
      style={{ animationFillMode: "forwards" }}
    >
      {/* Checkbox (visual only — dummyjson doesn't persist changes) */}
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        className="todo-check mt-0.5"
        aria-label={`Mark "${todo.todo}" as ${todo.completed ? "incomplete" : "complete"}`}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed ${
            todo.completed ? "line-through text-zinc-300" : "text-zinc-800"
          }`}
        >
          {todo.todo}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-2">
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full ${
              todo.completed
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                todo.completed ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {todo.completed ? "Done" : "Pending"}
          </span>

          {/* User id chip */}
          <span className="text-xs text-zinc-300 font-mono">
            uid:{todo.userId}
          </span>
        </div>
      </div>

      {/* Decorative id label */}
      <span className="text-xs text-zinc-200 font-mono mt-0.5 shrink-0">
        #{todo.id}
      </span>
    </div>
  );
};

/* ── TodoList ─────────────────────────────────────────────── */
const TodoList = () => {
  const todos = useSelector(selectTodos) || [];
  const loading = useSelector(selectTodosLoading);
  const error = useSelector(selectTodosError);

  /* Loading state */
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader label="Fetching todos…" />
      </div>
    );
  }

  /* Error state */
  if (error) {
    return (
      <div className="flex flex-col items-center py-12 gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="9"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <path
              d="M11 7v5M11 15h.01"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-red-500">{error}</p>
        <p className="text-xs text-zinc-400">
          Please try again or check your connection.
        </p>
      </div>
    );
  }

  /* Empty state */
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <rect
              x="4"
              y="6"
              width="18"
              height="16"
              rx="2"
              stroke="#c2c2c2"
              strokeWidth="1.5"
            />
            <path
              d="M9 12h8M9 16h5"
              stroke="#c2c2c2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9 3v6"
              stroke="#c2c2c2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M17 3v6"
              stroke="#c2c2c2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-400">No todos found</p>
        <p className="text-xs text-zinc-300">Add one above to get started.</p>
      </div>
    );
  }

  /* Todos list */
  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo, i) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          index={i}
        />
      ))}
    </div>
  );
};

export default TodoList;
