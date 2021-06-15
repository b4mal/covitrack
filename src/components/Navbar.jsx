import React from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <NavLink className="navbar__brand" to="/" exact>
          <h1>COVID-19 Tracker</h1>
        </NavLink>
        <NavLink className="navbar__item" to="/about" exact>
          <h3>About</h3>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
