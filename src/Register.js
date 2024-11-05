import React, { useState } from "react";
import { register }  from "./services/api";

const Register = ({ toggleLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      register(form).then(toggleLogin);
    } catch (error) {
      console.log("Reigistration failed.");
    }
  };

  return (
    <div className="card bg-light">
      <div className="card-body">
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={form?.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form?.email}
              onChange={handleChange}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form?.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          <button className="btn btn-link" onClick={toggleLogin}>Login here</button>
        </p>
      </div>
    </div>
  );
}

export default Register;

