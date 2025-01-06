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
      navigate("/login");
    } catch (error: any) {
      setMessage(error.response.data);
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
      <p>{message}</p>
    </div>
  );
}

export default Signup;
