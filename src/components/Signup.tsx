import { FormEvent, useState } from "react";
import { signup } from "../api";

import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(username, password);
      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error: any) {
      setMessage(error.response.data);
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
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
      </form>
      <p style={{ color: "#d7271a", marginTop: "10px" }}>{message}</p>
    </div>
  );
}

export default Signup;
