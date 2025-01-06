import { useState } from "react";
import Diagnose from "./components/Diagnose";
import AuthContext from "./context";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  const [token, setToken] = useState<string>("");
  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
};

export default App;
