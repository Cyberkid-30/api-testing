import React, { FormEvent, useContext, useState } from "react";
import { login } from "../api";
import AuthContext from "../context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setToken(response.access_token);
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/diagnose");
      }, 1000);
    } catch (err: any) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div
      style={{
        width: "33.33%",
        margin: "100px auto",
        border: "2px solid #9d9d9d",
        borderRadius: "10px",
        padding: "100px 50px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "#d7271a", marginTop: "10px" }}>{message}</p>
    </div>
  );
}

export default Login;
