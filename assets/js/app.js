import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom"; //Router
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
require("../css/app.css");

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <main className="container mt-4">
        <Switch>
          <Route path="/factures" component={InvoicesPage} />
          <Route path="/clients" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
