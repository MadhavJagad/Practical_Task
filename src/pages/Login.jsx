import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAuthError,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  /* Redirect if already authenticated */
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  /* Show global auth error as toast */
  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(clearAuthError());
    }
  }, [authError, dispatch]);

  /* ── Validation ──────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  /* ── Handlers ────────────────────────────────────────── */
  const handleChange = ({ target: { name, value } }) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const cleanedForm = {
    username: form.username.trim(),
    password: form.password.trim(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    try {
      await dispatch(loginUser(cleanedForm)).unwrap();
      toast.success(`Welcome back!`);
      navigate("/dashboard");
    } catch {
      // error toast handled in useEffect above
    }
  };
  return (
    <>
      <div className="min-h-screen bg-surface flex items-center justify-center p-4 grain">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-zinc-900/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-zinc-900/5 blur-3xl" />
        </div>

        <div
          className="relative w-full max-w-md animate-fade-up"
          style={{ animationFillMode: "forwards" }}
        >
          {/* ── Logo / brand ─── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 mb-4 shadow-brutal">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  x="5"
                  y="8"
                  width="18"
                  height="15"
                  rx="2"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 14h8M10 18h5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9 5v6M19 5v6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="21"
                  cy="7"
                  r="4"
                  fill="#ff5c35"
                />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-800 text-zinc-900 tracking-tight">
              TaskFlow
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Sign in to your workspace
            </p>
          </div>

          {/* ── Card ─── */}
          <div className="bg-surface-card rounded-3xl border border-zinc-100 shadow-card p-8">
            {/* Demo hint */}
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
              <svg
                className="shrink-0 mt-0.5"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="#d97706"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 5v4M8 11h.01"
                  stroke="#d97706"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Demo credentials</strong>
                <br />
                Username: <code className="font-mono">emilys</code> <br />
                Password: <code className="font-mono">emilyspass</code>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* Username */}
              <div>
                <label className="block text-xs font-display font-600 text-zinc-500 uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="emilys"
                  disabled={loading}
                  className={`
                  w-full px-4 py-3 rounded-xl text-sm font-body
                  border bg-white placeholder-zinc-300 outline-none
                  transition-all duration-150
                  ${
                    errors.username
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-zinc-200 focus:border-accent focus:ring-2 focus:ring-orange-100"
                  }
                  disabled:opacity-60
                `}
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.username}
                  </p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="block text-xs font-display font-600 text-zinc-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={loading}
                    className={`
                    w-full px-4 py-3 pr-11 rounded-xl text-sm font-body
                    border bg-white placeholder-zinc-300 outline-none
                    transition-all duration-150
                    ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-zinc-200 focus:border-accent focus:ring-2 focus:ring-orange-100"
                    }
                    disabled:opacity-60
                  `}
                  />
                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <circle
                          cx="9"
                          cy="9"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M2 2l14 14"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <circle
                          cx="9"
                          cy="9"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.password}
                  </p>
                )}
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                w-full py-3 rounded-xl bg-zinc-900 text-white
                font-display font-semibold text-sm tracking-wide
                hover:bg-zinc-700 active:scale-[0.98]
                transition-all duration-150 shadow-sm
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in →"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-300 mt-6">
            Powered by{" "}
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-500 transition-colors"
            >
              DummyJSON
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
