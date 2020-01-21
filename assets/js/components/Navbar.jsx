import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom"; //Router
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ history, user }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () =>{
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnécté ✋")
    history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        SymReact !
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/clients">
              Clients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/factures">
              Factures
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
        {(!isAuthenticated && (
          <>
          <li className="nav-item">
            <NavLink href="#" className="nav-link" to="/register">
              inscription
            </NavLink>
          </li>
          <li className="nav-item mr-1">
            <NavLink className="btn btn-success" to="/login">
              Connexion !
            </NavLink>
          </li>
          </>
        )) || (
          <>
         <li className="nav-item mr-2 mt-2">
             Bonjour <strong>{user.firstname}</strong>
         </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-danger">
              Déconnexion !
            </button>
          </li>
          </>
        )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
