import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCharacter } from "../../store/character/characterActions";
import { Character } from "../../store/character/types";
import { AppState } from "../../store/rootReducer";
import { history } from "../../util/history";
import { NavBar } from "../navBar";

function MenuView(props: {
  loading: boolean;
  error: Error | null;
  character?: Character;
  createCharacter: (...c: any) => Promise<Character>;
}) {
  async function handleClickCreateCharacter(e: React.SyntheticEvent) {
    e.preventDefault();

    const createdCharacter = await props.createCharacter();
    console.log("created character = " + JSON.stringify(createdCharacter));
    history.push("/characters/" + createdCharacter.id);
  }

  const { loading, error, character } = props;
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      {error && (
        <div className="alert alert-danger">
          {error.message + " Please check your network connection and refresh."}
        </div>
      )}
      {
        <div className="list-group">
          <Link to="/login" className="list-group-item list-group-item-action">
            Logout
          </Link>
          <a
            href="/create-character"
            className="list-group-item list-group-item-action"
            onClick={handleClickCreateCharacter}
          >
            Create character
          </a>
          {character && (
            <Link
              to={"/characters/" + character.id}
              className="list-group-item list-group-item-action"
            >
              Current character
            </Link>
          )}
          <Link
            to="/characters"
            className="list-group-item list-group-item-action"
          >
            -characters-
          </Link>
          <Link to="/combat" className="list-group-item list-group-item-action">
            -combat-
          </Link>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  error: state.character.error,
  loading: state.character.loading,
  character: state.character.character
});

export default connect(mapStateToProps, {
  createCharacter
})(MenuView);
