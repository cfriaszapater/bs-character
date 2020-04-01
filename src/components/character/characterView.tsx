import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCharacter,
  updateAttributes,
  updateCharacteristics,
  updateEquipment
} from "../../store/character/characterActions";
import { Character, CharacterViewState } from "../../store/character/types";
import { AppState } from "../../store/rootReducer";
import { NavBar } from "../navBar";
import { CharacterMainSheetView } from "./characterMainSheetView";

interface CharacterViewProps {
  character: Character;
  loading: boolean;
  error: Error | null;
  fetchCharacter: (id: string) => any;
  updateCharacteristics: (...args: any) => any;
  updateEquipment: (...args: any) => any;
  updateAttributes: (...args: any) => any;
}

function CharacterView(props: CharacterViewProps) {
  const { characterId } = useParams();
  const { character, error, loading, fetchCharacter: fetchCharacterF } = props;

  useEffect(() => {
    if (characterId) {
      fetchCharacterF(characterId);
    }
  }, [characterId, fetchCharacterF]);

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
        <div id="character-view" className="container-fluid">
          <div className="row">
            <CharacterMainSheetView
              character={character}
              updateCharacteristics={props.updateCharacteristics}
              updateEquipment={props.updateEquipment}
              updateAttributes={props.updateAttributes}
              className="col"
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

const mapStateToProps = (state: AppState): CharacterViewState => ({
  character: state.character.character,
  error: state.character.error,
  loading: state.character.loading
});

export default connect(mapStateToProps, {
  fetchCharacter,
  updateCharacteristics,
  updateEquipment,
  updateAttributes
})(CharacterView);
