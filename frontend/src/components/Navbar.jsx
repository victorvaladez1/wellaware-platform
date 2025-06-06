import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#111", color: "#fff" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/wells">Wells</Link>
      <Link to="/maintenance">Maintenance</Link>
      {role === "admin" && <Link to="/wells/new">Add Well</Link>}
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
