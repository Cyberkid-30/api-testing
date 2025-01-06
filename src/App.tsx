import { useState } from "react";
import Diagnose from "./components/Diagnose";
import AuthContext from "./context";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [token, setToken] = useState<string>("");
  return (
    <div>
      <AuthContext.Provider value={{ token, setToken }}>
        {!token ? (
          <>
            <Signup />
            <Login />
          </>
        ) : (
          <Diagnose />
        )}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
