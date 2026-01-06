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
      const role = response.data;

      if (role === "Admin") navigate("/AdminMenu");
      else if (role === "Student") navigate("/StudentMenu");
      else setError("Invalid user role");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* LEFT IMAGE SECTION */}
        <div className="login-left">
          <img
            src="/images/login-illustration.jpg"
            alt="Login Illustration"
          />
        </div>

        {/* RIGHT LOGIN FORM */}
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

          <p className="register-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
