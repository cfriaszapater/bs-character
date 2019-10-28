import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import { fetchCharacter } from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import { AttributesView } from "./attributesView";
import CharacteristicsView from "./characteristicsView";
import DefenseCharacteristicsView from "./defenseCharacteristicsView";

interface CharacterViewProps {
  character?: Character;
  loading: boolean;
  error: Error | null;
  fetchCharacter: () => any;
}

class CharacterView extends React.Component<
  CharacterViewProps,
  CharacterViewState
> {
  public componentDidMount() {
    this.props.fetchCharacter();
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
              <div id="mainSheet" className="col">
                {/* Combat sheet */}
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
                    characteristics={character.characteristics}
                  />
                </div>
              </div>
              <div id="secondarySheet" className="col">
                {/* Non-combat sheet */}
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

const mapStateToProps = (state: AppState) => ({
  character: state.character.character,
  error: state.character.error,
  loading: state.character.loading
});

export default connect(
  mapStateToProps,
  { fetchCharacter }
)(CharacterView);
