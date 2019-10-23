import React from "react";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchCharacter } from "../../store/character/characterActions";
import { Character, CharacterSheetState } from "../../store/character/types";

interface CharacterSheetProps {
  character: Character | null;
  loading: boolean;
  error: Error | null;
  dispatch: ThunkDispatch<{}, {}, any>;
}

export default class CharacterSheet extends React.Component<
  CharacterSheetProps,
  CharacterSheetState
> {
  public componentDidMount() {
    this.props.dispatch(fetchCharacter());
  }

  public render() {
    const { error, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>
          <Link to="/login">Logout</Link>
        </div>
        {error && (
          <div className="alert alert-danger">
            {error.message +
              " Please check your network connection and refresh."}
          </div>
        )}
        {this.props.character && <div>{this.props.character.name}</div>}
      </div>
    );
  }
}
