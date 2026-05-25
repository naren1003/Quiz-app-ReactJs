import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "quiz123";

export function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      credentials.username.trim() === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
      onLogin();
      navigate("/setQuiz", { replace: true });
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <main className="app-page auth-page">
      <section className="page-card auth-card">
        <div className="section-heading">
          <span className="eyebrow">Authentication</span>
          <h1>Sign in to manage quizzes</h1>
          <p>Only authenticated admins can create, edit, or delete questions.</p>
        </div>

        <form className="question-form auth-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              value={credentials.username}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  username: event.target.value,
                })
              }
              placeholder="Username"
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <input
              value={credentials.password}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                })
              }
              placeholder="Password"
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="form-message form-error">{error}</p>}

          <div className="form-actions">
            <button className="primary-btn" type="submit">
              Sign In
            </button>
            <Link className="secondary-link" to="/">
              Home
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
