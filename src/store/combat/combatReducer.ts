import { CombatActions, FETCH_COMBAT_BEGIN, FETCH_COMBAT_FAILURE, FETCH_COMBAT_SUCCESS } from "./combatActions";
import { Combat, CombatViewState } from "./types";

export function combatReducer(
  state: CombatViewState = initialState,
  action: CombatActions
): CombatViewState {
  switch (action.type) {
    case FETCH_COMBAT_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        error: null,
        loading: true
      };

    case FETCH_COMBAT_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        combat: action.combat,
        loading: false
      };

    case FETCH_COMBAT_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      return {
        ...state,
        error: action.error,
        loading: false
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

const initialState: CombatViewState = {
  combat: emptyCombat(),
  error: null,
  loading: false
};

function emptyCombat(): Combat {
  return {
    participants: [],
    rounds: [],
    turn: null
  };
}
