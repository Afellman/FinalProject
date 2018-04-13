import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) =>
  <div style={{ height: "100vh", width: "100vw", clear: 'both' }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
