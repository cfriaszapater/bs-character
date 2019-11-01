import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import { fetchCharacter } from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import AttackView from "./attackView";
import { AttributesView } from "./attributesView";
import DefenseView from "./defenseView";

interface CharacterViewProps {
  character: Character;
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
        {
          <div id="character-view" className="container-fluid">
            <div className="row">
              <div id="main-sheet" className="col">
                {/* Combat sheet */}
                <div id="personal-info" className="row">
                  <div>Name: {character.name}</div>
                </div>
                <div id="main" className="row">
                  <AttributesView
                    attributes={character.attributes}
                    className="col-3 grouped-container"
                  />
                  <AttackView
                    characteristics={character.characteristics}
                    className="col-3 grouped-container"
                  />
                  <DefenseView
                    characteristics={character.characteristics}
                    className="col-6 grouped-container"
                  />
                </div>
              </div>
              <div id="secondary-sheet" className="col">
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
        }
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
