import React from "react";
import { connect } from "react-redux";
import * as characterActions from "../../store/character/characterActions";
import { Character } from "../../store/character/types";
import { fetchCombat } from "../../store/combat/combatActions";
import { Combat, CombatViewState } from "../../store/combat/types";
import { AppState } from "../../store/rootReducer";
import { CharacterMainSheetView } from "../character/characterMainSheetView";
import { NavBar } from "../navBar";
import { decodeTurn } from "./decodeTurn";
import { InteractionView } from "./interactionView";

interface CombatViewProps {
  combat: Combat;
  character: Character;
  loading: boolean;
  error: Error | null;
  fetchCombat: () => void;
  updateCharacteristics?: typeof characterActions.updateCharacteristics;
  updateEquipment?: typeof characterActions.updateEquipment;
}

class CombatView extends React.Component<CombatViewProps, CombatViewState> {
  public componentDidMount() {
    this.props.fetchCombat();
  }

  public render() {
    const {
      combat,
      character,
      error,
      loading,
      updateCharacteristics,
      updateEquipment
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    const { turn } = combat;
    const { opponent } = decodeTurn(character, turn);
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
          <div id="combat-view" className="container-fluid">
            <div className="row">
              <CharacterMainSheetView
                character={character}
                updateCharacteristics={updateCharacteristics}
                updateEquipment={updateEquipment}
                className="col-5"
              />
              {turn && opponent && (
                <InteractionView
                  character={character}
                  turn={turn}
                  className="col"
                />
              )}
              {opponent && (
                <CharacterMainSheetView
                  character={opponent}
                  className="col-5"
                />
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  combat: state.combat.combat,
  error: state.combat.error,
  loading: state.combat.loading,
  character: state.character.character
});

export default connect(
  mapStateToProps,
  {
    fetchCombat,
    updateCharacteristics: characterActions.updateCharacteristics,
    updateEquipment: characterActions.updateEquipment
  }
)(CombatView);
