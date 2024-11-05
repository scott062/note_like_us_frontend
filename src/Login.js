import React, { useState } from "react";
import api from "./api";

const Login = ({ onLogin, toggleRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/token/", { username, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      console.log("Login successful");
      onLogin();
    } catch (error) {
      console.log("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="card bg-light">
      <div className="card-body">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          <button className="btn btn-link" onClick={toggleRegister}>Register here</button>
        </p>
      </div>
    </div>
  );
}

export default Login;

