import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom"; 

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/clients");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" />
      <Route path="/clients" />
    </Routes>
  );
}

export default App;
