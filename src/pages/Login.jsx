import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import FormField from "../components/common/FormField";
import Button from "../components/common/Button";
import { inputClass } from "../utils/formStyles";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      showToast("Please enter your username or email.", "error");
      return;
    }
    if (!password) {
      showToast("Please enter your password.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await login(identifier.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      // err.message comes straight from the backend's structured error
      // response (e.g. "Incorrect password. Please try again.") — never a
      // raw "Request failed with status code 401" style message.
      showToast(err.message || "Something went wrong. Please try again later.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue tracking your progress."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Username or Email">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
            autoComplete="username"
            required
          />
        </FormField>

        <FormField label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputClass}
            autoComplete="current-password"
            required
          />
        </FormField>

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={submitting}>
          {submitting ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
