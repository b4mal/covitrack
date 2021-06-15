import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
