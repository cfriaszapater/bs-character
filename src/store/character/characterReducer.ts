import {
  CharacterActions,
  FETCH_CHARACTER_BEGIN,
  FETCH_CHARACTER_FAILURE,
  FETCH_CHARACTER_SUCCESS
} from "./characterActions";
import { CharacterViewState } from "./types";

export const initialState: CharacterViewState = {
  error: null,
  loading: false
};

export function characterReducer(
  state: CharacterViewState = initialState,
  action: CharacterActions
): CharacterViewState {
  switch (action.type) {
    case FETCH_CHARACTER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        error: null,
        loading: true
      };

    case FETCH_CHARACTER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        character: action.character,
        loading: false
      };

    case FETCH_CHARACTER_FAILURE:
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
