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
      name: "Jarl",
      attributes: {
        endurance: 2,
        agility: 2,
        strength: 3,
        will: 3,
        intelligence: 2,
        leadership: 2,
        power: 2,
        defense: 2,
        extension: 5
      },
      equipment: {
        hand1: {
          type: "weapon",
          id: "long-sword",
          level: 1,
          reach: 2,
          structure: 3,
          weight: 2
        },
        hand2: {
          type: "shield",
          id: "round-shield",
          level: 1,
          structure: 1,
          weight: 1,
          coverage: 1,
          blunt: 0,
          cut: 0,
          penetrating: 2
        },
        body: {
          type: "armor",
          id: "chainmail",
          level: 1,
          structure: 3,
          weight: 11,
          dodge: 2,
          coverage: 5,
          blunt: 2,
          cut: 3,
          penetrating: 3
        },
        bag: [
          {
            type: "miscelaneous",
            id: "flask"
          }
        ]
      },
      characteristics: {
        initiative: 6,
        stamina: 10,
        impact: 4,
        damage: 5,
        health: 15
      },
      defenseCharacteristics: {
        dodge: 2,
        coverage: 6,
        blunt: 2,
        cut: 3,
        penetrating: 5
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
