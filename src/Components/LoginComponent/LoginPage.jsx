import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/LoginService";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(username, password);

      // BACKEND RETURNS: STUDENT / ADMIN
      const role = response.data;

      // STORE SESSION
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/AdminMenu");
      else if (role === "STUDENT") navigate("/StudentMenu");
      else setError("Invalid role");

    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <img src="/images/login-illustration.jpg" alt="Login" />
        </div>

        <div className="login-right">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
