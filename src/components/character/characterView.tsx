import React from "react";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchCharacter } from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import { AttributesView } from "./attributesView";
import Characteristic from "./characteristic";

interface CharacterViewProps {
  character: Character | null;
  loading: boolean;
  error: Error | null;
  dispatch: ThunkDispatch<{}, {}, any>;
}

export default class CharacterView extends React.Component<
  CharacterViewProps,
  CharacterViewState
> {
  public componentDidMount() {
    this.props.dispatch(fetchCharacter());
  }

  public render() {
    const { character, error, loading } = this.props;

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
        {character && (
          <div id="sheet" className="container-fluid">
            <div id="personal-info" className="row">
              <div>Name: {character.name}</div>
            </div>
            <div id="equipment" className="row"></div>
            <div id="attribs-and-characteristics" className="row">
              <AttributesView attributes={character.attributes} />
              <div id="characteristics" className="col-3 grouped-container">
                <Characteristic
                  name="Ini"
                  value={character.characteristics.initiative}
                />
                <Characteristic
                  name="Sta"
                  value={character.characteristics.stamina}
                />
                <Characteristic
                  name="Imp"
                  value={character.characteristics.impact}
                />
                <Characteristic
                  name="Da"
                  value={character.characteristics.damage}
                />
                <Characteristic
                  name="HP"
                  value={character.characteristics.health}
                />
              </div>
              <div
                id="defenseCharacteristics"
                className="col grouped-container"
              >
                <div className="row">
                  <div className="col">
                    Dod: {character.defenseCharacteristics.dodge}
                  </div>
                  <div className="col">
                    Cov: {character.defenseCharacteristics.coverage}
                  </div>
                  <div className="col">{/*intentionally empty*/}</div>
                </div>
                <div className="row">
                  <div className="col">
                    Blu: {character.defenseCharacteristics.blunt}
                  </div>
                  <div className="col">
                    Cut: {character.defenseCharacteristics.cut}
                  </div>
                  <div className="col">
                    Pen: {character.defenseCharacteristics.penetrating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
