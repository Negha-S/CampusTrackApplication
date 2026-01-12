import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "./RegisterUser.css";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostFoundUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let temp = {};
    let valid = true;

    if (!lostFoundUser.username) {
      temp.username = "Username required";
      valid = false;
    }
    if (!lostFoundUser.password) {
      temp.password = "Password required";
      valid = false;
    } else if (lostFoundUser.password.length < 5) {
      temp.password = "Minimum 5 characters";
      valid = false;
    }
    if (!confirmPassword) {
      temp.confirmPassword = "Confirm password";
      valid = false;
    }
    if (lostFoundUser.password !== confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
      valid = false;
    }
    if (!lostFoundUser.personalName) {
      temp.personalName = "Enter your name";
      valid = false;
    }
    if (!lostFoundUser.email) {
      temp.email = "Enter email";
      valid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      temp.email = "Invalid email";
      valid = false;
    }
    if (!lostFoundUser.role) {
      temp.role = "Select a role";
      valid = false;
    }

    setErrors(temp);

    if (valid) {
      registerNewUser(lostFoundUser).then(() => {
        alert("User Registered Successfully! Please Login.");
        navigate("/");
      });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Create Account</h2>

        <form onSubmit={handleValidation}>
          <input
            name="username"
            placeholder="Username"
            value={lostFoundUser.username}
            onChange={onChangeHandler}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={lostFoundUser.password}
            onChange={onChangeHandler}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <input
            name="personalName"
            placeholder="Full Name"
            value={lostFoundUser.personalName}
            onChange={onChangeHandler}
          />
          {errors.personalName && (
            <p className="error-text">{errors.personalName}</p>
          )}

          <input
            name="email"
            placeholder="Email"
            value={lostFoundUser.email}
            onChange={onChangeHandler}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <select
            name="role"
            value={lostFoundUser.role}
            onChange={onChangeHandler}
          >
            <option value="">Select Role</option>
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>
          {errors.role && <p className="error-text">{errors.role}</p>}

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
