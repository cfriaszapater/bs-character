import { ThunkDispatch } from "redux-thunk";
import { Character } from "./types";

export const FETCH_CHARACTER_BEGIN = "FETCH_CHARACTER_BEGIN";
export const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
export const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";

export interface FetchCharacterBeginAction {
  type: typeof FETCH_CHARACTER_BEGIN;
}

export interface FetchCharacterSuccessAction {
  type: typeof FETCH_CHARACTER_SUCCESS;
  character: Character;
}

export interface FetchCharacterFailureAction {
  type: typeof FETCH_CHARACTER_FAILURE;
  error: Error | null;
}

export type CharacterActions =
  | FetchCharacterBeginAction
  | FetchCharacterFailureAction
  | FetchCharacterSuccessAction;

export const fetchCharacter = () => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<FetchCharacterSuccessAction | FetchCharacterFailureAction> => {
  dispatch(fetchCharacterBegin());
  try {
    const character: Character = await getCharacter();
    return dispatch(fetchCharacterSuccess(character));
  } catch (error) {
    return dispatch(fetchCharacterFailure(error));
  }
};

async function getCharacter(): Promise<Character> {
  return new Promise(resolve => {
    resolve({
      name: "jarl",
      attributes: {
        R: 0,
        A: 0,
        F: 0,
        V: 0,
        I: 0,
        L: 0,
        P: 0,
        D: 0,
        E: 0
      }
    });
  });
  // TODO return await get(backendUrl() + "/character");
}

export const fetchCharacterBegin = (): FetchCharacterBeginAction => ({
  type: FETCH_CHARACTER_BEGIN
});

export const fetchCharacterSuccess = (
  character: Character
): FetchCharacterSuccessAction => ({
  character,
  type: FETCH_CHARACTER_SUCCESS
});

export const fetchCharacterFailure = (
  error: Error
): FetchCharacterFailureAction => ({
  error,
  type: FETCH_CHARACTER_FAILURE
});
