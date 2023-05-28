import React, { useState } from "react";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" className="form-control" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="At least 6 letters/digits"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Either student or instructor"
            name="role"
          />
        </div>
        <br />
        <button className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
