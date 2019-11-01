import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div id="nav-bar" className="d-flex justify-content-between">
      <Link to="/">&lt;- Main menu</Link>
      <Link to="/login">Logout</Link>
    </div>
  );
}
