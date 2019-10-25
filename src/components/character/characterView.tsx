import React from "react";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchCharacter } from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import { AttributesView } from "./attributesView";
import { CharacteristicsView } from "./characteristicsView";
import { DefenseCharacteristicsView } from "./defenseCharacteristicsView";

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
            <div className="row">
              <div id="combatSheet" className="col">
                <div id="personal-info" className="row">
                  <div>Name: {character.name}</div>
                </div>
                <div id="equipment" className="row"></div>
                <div id="attribs-and-characteristics" className="row">
                  <AttributesView attributes={character.attributes} />
                  <CharacteristicsView
                    characteristics={character.characteristics}
                  />
                  <DefenseCharacteristicsView
                    defense={character.defenseCharacteristics}
                  />
                </div>
              </div>
              <div id="nonCombatSheet" className="col">
                <div id="notes" className="row grouped-container h-100">
                  <div className="col">
                    <div>note 1</div>
                    <div>note 2</div>
                    <div>note ...</div>
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
