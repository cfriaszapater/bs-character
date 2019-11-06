import React from "react";
import { connect } from "react-redux";
import { Character } from "../../store/character/types";
import { fetchCombat } from "../../store/combat/combatActions";
import { Combat, CombatViewState } from "../../store/combat/types";
import { AppState } from "../../store/rootReducer";
import { CharacterMainSheetView } from "../character/characterMainSheetView";
import { NavBar } from "../navBar";

interface CombatViewProps {
  combat: Combat;
  character: Character;
  loading: boolean;
  error: Error | null;
  fetchCombat: () => void;
}

class CombatView extends React.Component<
  CombatViewProps,
  CombatViewState
> {
  public componentDidMount() {
    this.props.fetchCombat();
  }

  public render() {
    const { combat, character, error, loading } = this.props;

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
          <div id="combat-view" className="container-fluid">
            <div className="row">
              <CharacterMainSheetView character={character} />
              {combat.turn && combat.turn.defender && <div id="opponent-or-card-board-view" className="col">
                {/* TODO opponent or card board view */}
                <div id="TODO" className="row grouped-container h-100">
                  <div className="col">
                    <div>this will show</div>
                    <div>card board view</div>
                    <div>or selected opponent sheet...</div>
                  </div>
                </div>
              </div>}
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
  character: state.character.character,
});

export default connect(
  mapStateToProps,
  { fetchCombat }
)(CombatView);
