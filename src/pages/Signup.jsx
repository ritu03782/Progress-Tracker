import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import FormField from "../components/common/FormField";
import Button from "../components/common/Button";
import { inputClass } from "../utils/formStyles";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    if (password.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await signup({
        fullName: fullName.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password,
        avatarFile,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast(err.message || "Something went wrong. Please try again later.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking your placement prep today."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full Name">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ritu Singh"
            className={inputClass}
            required
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Username">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ritu_singh"
              className={inputClass}
              autoComplete="username"
              required
            />
          </FormField>
          <FormField label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              autoComplete="email"
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              autoComplete="new-password"
              required
            />
          </FormField>
          <FormField label="Confirm Password">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              autoComplete="new-password"
              required
            />
          </FormField>
        </div>

        <FormField label="Avatar (optional)">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className={`${inputClass} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-slate-700 file:text-white file:cursor-pointer cursor-pointer`}
          />
        </FormField>

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={submitting}>
          {submitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
