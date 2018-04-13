import React from "react";
import "./Nav.css";


const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
    
        <a href="/" className="navbar-brand">
          Final Project
        </a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/">Login</a></li>
        <li><a href="/saved">Sign-up</a></li>
      </ul>
    </div>
  </nav>



export default Nav;