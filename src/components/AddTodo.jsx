import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { useState } from "react";
import { addTodo } from "../features/todoSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AddTodo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  /* ── Validation ──────────────────────────────────────── */
  const validate = (value) => {
    if (!value.trim()) return "Todo cannot be empty.";
    if (value.trim().length < 3) return "Todo must be at least 3 characters.";
    return "";
  };

  /* ── Submit handler ──────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(text);
    if (err) {
      setFieldError(err);
      return;
    }

    setSubmitting(true);
    setFieldError("");

    try {
      if (!user?.id) {
        toast.error("User not found. Please login again.");
        return;
      }
      await dispatch(
        addTodo({
          todo: text.trim(),
          completed: false,
          userId: user.id,
        }),
      ).unwrap();

      toast.success("Todo added successfully! 🎉");
      setText("");
    } catch (err) {
      toast.error(err ?? "Failed to add todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-card rounded-2xl border border-zinc-100 shadow-card p-5 mb-6"
      noValidate
    >
      <h3 className="font-display text-sm font-600 text-zinc-500 uppercase tracking-widest mb-3">
        Add a new todo
      </h3>

      <div className="flex gap-3">
        {/* Input */}
        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (fieldError) setFieldError(validate(e.target.value));
            }}
            placeholder="What needs to be done?"
            disabled={submitting}
            className={`
              w-full px-4 py-2.5 rounded-xl text-sm font-body
              border transition-all duration-150 outline-none
              bg-white placeholder-zinc-300
              ${
                fieldError
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-zinc-200 focus:border-accent focus:ring-2 focus:ring-orange-100"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-describedby={fieldError ? "add-todo-error" : undefined}
          />
          {fieldError && (
            <p
              id="add-todo-error"
              className="text-xs text-red-500 mt-1.5 ml-1"
            >
              {fieldError}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="
            flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-zinc-900 text-white font-display text-sm font-semibold
            hover:bg-zinc-dark active:scale-95
            transition-all duration-150 shadow-sm
            disabled:opacity-60 disabled:cursor-not-allowed shrink-0
          "
        >
          {submitting ? (
            <Loader
              variant="dots"
              size="sm"
              label="Adding…"
            />
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Add
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
