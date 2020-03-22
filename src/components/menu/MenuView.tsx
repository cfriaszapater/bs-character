import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCharacter } from "../../store/character/characterActions";
import { AppState } from "../../store/rootReducer";
import { history } from "../../util/history";

function MenuView(props: {
  loading: boolean;
  createCharacter: (...c: any) => any;
}) {
  async function handleClickCreateCharacter(e: React.SyntheticEvent) {
    e.preventDefault();

    const character = await props.createCharacter();
    console.log("created character = " + JSON.stringify(character));
    history.push("/character");
  }

  const { loading } = props;
  if (loading) {
    return <div>Loading...</div>;
  }

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

const mapStateToProps = (state: AppState) => ({
  loading: state.character.loading
});

export default connect(mapStateToProps, {
  createCharacter
})(MenuView);
