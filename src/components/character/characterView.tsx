import React from "react";
import { connect } from "react-redux";
import {
  fetchCharacter,
  updateCharacteristics
} from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import { AppState } from "../../store/rootReducer";
import { NavBar } from "../navBar";
import { CharacterMainSheetView } from "./characterMainSheetView";

interface CharacterViewProps {
  character: Character;
  loading: boolean;
  error: Error | null;
  fetchCharacter: () => any;
  updateCharacteristics: (...args: any) => any;
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
        <NavBar />
        {error && (
          <div className="alert alert-danger">
            {error.message +
              " Please check your network connection and refresh."}
          </div>
        )}
        {
          <div id="character-view" className="container-fluid">
            <div className="row">
              <CharacterMainSheetView
                character={character}
                updateCharacteristics={this.props.updateCharacteristics}
              />
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
  { fetchCharacter, updateCharacteristics }
)(CharacterView);
