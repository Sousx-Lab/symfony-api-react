import React, { useState} from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter} from "react-router-dom"; //Router
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";

require("../css/app.css");

AuthAPI.setUp();

const App = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
      const NavbarWhitRouter = withRouter(Navbar);
  
  return (
    <AuthContext.Provider value={{isAuthenticated,
        setIsAuthenticated}} >
    <HashRouter>
      <NavbarWhitRouter />

      <main className="container mt-4">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/facture/:id" component={InvoicePage} />
          <ProtectedRoute path="/factures" component={InvoicesPage} />
          <ProtectedRoute path="/client/:id" component={CustomerPage} />
          <ProtectedRoute path="/clients" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);