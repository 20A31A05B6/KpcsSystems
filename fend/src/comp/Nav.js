import { Link } from "react-router-dom";
import Ct from "./Ct";
import { useContext, useState } from "react";

const Nav = () => {
  const obj = useContext(Ct);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <button className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
        </button>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {obj.state.token !== "" && obj.state.role !== "admin" && (
            <Link to="/home" className="nav-link" onClick={() => setIsOpen(false)}>
              User Dashboard
            </Link>
          )}
          {obj.state.token === "" && (
            <Link to="/reg" className="nav-link" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          )}
          {obj.state.token === "" && (
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
          {obj.state.token !== "" && obj.state.role === "admin" && (
            <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          {obj.state.token !== "" && (
            <Link to="/logout" className="nav-link logout" onClick={() => setIsOpen(false)}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;