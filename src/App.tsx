import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";

function App() {
  const { user } = useAppContext();

  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
