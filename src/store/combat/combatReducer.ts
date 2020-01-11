import {
  CombatActions,
  FETCH_COMBAT_BEGIN,
  FETCH_COMBAT_FAILURE,
  FETCH_COMBAT_SUCCESS,
  RESOLVE_ATTACK_FAILURE,
  RESOLVE_ATTACK_SUCCESS
} from "./combatActions";
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
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case RESOLVE_ATTACK_SUCCESS:
      return {
        ...state,
        combat: {
          ...state.combat,
          turn: action.turn
        }
      };

    case RESOLVE_ATTACK_FAILURE:
      return {
        ...state,
        error: action.error
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
    rounds: []
  };
}
