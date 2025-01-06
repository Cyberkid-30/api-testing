import React, { FormEvent, useContext, useState } from "react";
import { login } from "../api";
import AuthContext from "../context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setToken(response.access_token);
      setMessage("Login successful!");
    } catch (err: any) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "100px auto",
        border: "1px solid black",
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
      <p>{message}</p>
    </div>
  );
}

export default Login;
