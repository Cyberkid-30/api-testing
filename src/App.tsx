import { useState } from "react";
import AuthContext from "./context";
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
