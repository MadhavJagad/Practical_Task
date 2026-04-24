import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      {/* ── Toast notifications ─────────────────────────── */}
      <Toaster
        position="top-right"
        gutter={8}
        containerStyle={{ top: 64 }}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            color: "#0a0a0a",
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          },
          success: {
            iconTheme: { primary: "#ff5c35", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
          },
        }}
      />
      {/* ── Routes ──────────────────────────────────────── */}

      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Public */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        {/* 404 catch-all */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
