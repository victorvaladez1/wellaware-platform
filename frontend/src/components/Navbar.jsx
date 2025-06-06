import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/wells">Wells</Link>
        <Link to="/maintenance">Maintenance</Link>
        <Link to="/wells/new">Add Well</Link>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
