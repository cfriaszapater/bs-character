import React from "react";
import { Link } from "react-router-dom";
import { history } from "../../util/history";

export function MenuView() {
  return (
    <div className="list-group">
      <Link to="/login" className="list-group-item list-group-item-action">
        Logout
      </Link>
      <a href="/character" onClick={handleClickCreateCharacter}>
        Create character
      </a>
      <Link to="/character" className="list-group-item list-group-item-action">
        -character-
      </Link>
      <Link to="/combat" className="list-group-item list-group-item-action">
        -combat-
      </Link>
    </div>
  );
}

function handleClickCreateCharacter(e: React.SyntheticEvent) {
  e.preventDefault();
  // TODO call characterActions.createCharacther, that will:
  // - CREATE_CHARACTER_BEGIN action (see fetchCharacter):
  // - Create character (POST), obtain id

  // TODO then, on SUCCESS:
  // history.push("/character/{id}")
  history.push("/character");
}
