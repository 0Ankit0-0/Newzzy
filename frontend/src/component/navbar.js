import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor =
      props.mode === "dark" ? "#1a1a1a" : "#f8f9fa";
    document.body.style.color = props.mode === "dark" ? "white" : "black";
  }, [props.mode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${
        props.mode === "light" ? "light" : "dark"
      } bg-${props.mode}`}
      style={{
        borderBottom: `1px solid ${props.mode === "light" ? "#ddd" : "#333"}`,
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-newspaper"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle text-${
                  props.mode === "dark" ? "light" : "dark"
                }`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/business">
                    Business
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/entertainment">
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/general">
                    General
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/science">
                    Science
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/health">
                    Health
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sports">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/technology">
                    Technology
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isAuthenticated && (
              <span
                className={`text-${
                  props.mode === "light" ? "dark" : "light"
                } me-3`}
              >
                Welcome,{" "}
                {JSON.parse(localStorage.getItem("user"))?.name || "User"}!
              </span>
            )}

            {isAuthenticated ? (
              <button
                className="btn btn-outline-danger me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-primary me-2" to="/login">
                Login
              </Link>
            )}

            <div
              className={`form-check form-switch custom-switch text-${
                props.mode === "light" ? "dark" : "light"
              }`}
            >
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onClick={props.toggleMode}
                  id="flexSwitchCheckDefault"
                />
                {props.mode === "light" ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
