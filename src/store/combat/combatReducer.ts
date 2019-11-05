import { CombatActions } from "./combatActions";
import { CombatViewState } from "./types";

export function combatReducer(
  state: CombatViewState = initialState,
  action: CombatActions
): CombatViewState {
  // TODO
  return null;
}

const initialState: CombatViewState = {
  combat: emptyCombat(),
  error: null,
  loading: false
};

function emptyCombat() {
  return {
    participants: [],
    rounds: []
  };
}
