import React from "react";
import { Link } from "react-router-dom";

export function MenuView() {
  return (
    <div className="list-group">
      <Link to="/login" className="list-group-item list-group-item-action">
        Logout
      </Link>
      <Link to="/character" className="list-group-item list-group-item-action">
        -character-
      </Link>
      <Link to="/combat" className="list-group-item list-group-item-action">
        -combat-
      </Link>
    </div>
  );
}
