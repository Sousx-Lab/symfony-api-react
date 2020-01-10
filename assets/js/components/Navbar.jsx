import React from "react";
import { Link } from "react-router-dom"; //Router

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        SymReact !
      </a>
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
            <Link className="nav-link" to="/clients">
              Clients
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/factures">
              Factures
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="#" className="nav-link">
              inscription
            </a>
          </li>
          <li className="nav-item mr-1">
            <a href="#" className="btn btn-success">
              Connexion !
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="btn btn-danger">
              Déconnexion !
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
