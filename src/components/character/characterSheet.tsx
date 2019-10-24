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
              <div id="attributes" className="col-1">
                <div>T: {character.attributes.T}</div>
                <div>A: {character.attributes.A}</div>
                <div>S: {character.attributes.S}</div>
                <div>W: {character.attributes.W}</div>
                <div>I: {character.attributes.I}</div>
                <div>L: {character.attributes.L}</div>
                <div>P: {character.attributes.P}</div>
                <div>D: {character.attributes.D}</div>
                <div>E: {character.attributes.E}</div>
              </div>
              <div id="characteristics" className="col">
                <div>Ini: {character.characteristics.initiative}</div>
                <div>Sta: {character.characteristics.stamina}</div>
                <div>Imp: {character.characteristics.impact}</div>
                <div>Da: {character.characteristics.damage}</div>
                <div>HP: {character.characteristics.health}</div>
              </div>
              <div id="defenseCharacteristics" className="col">
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
                    Blu: {character.defenseCharacteristics.bludgeoning}
                  </div>
                  <div className="col">
                    Cut: {character.defenseCharacteristics.cut}
                  </div>
                  <div className="col">
                    Pie: {character.defenseCharacteristics.piercing}
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
