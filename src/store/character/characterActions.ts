import { ThunkDispatch } from "redux-thunk";
import { givenTestCharacter } from "../../testUtil/givenAppStateWithMockData";
import { Character, Characteristics, Equipment } from "./types";

export const FETCH_CHARACTER_BEGIN = "FETCH_CHARACTER_BEGIN";
export const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
export const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";
export const UPDATE_CHARACTERISTICS_BEGIN = "UPDATE_CHARACTERISTICS_BEGIN";
export const UPDATE_EQUIPMENT_BEGIN = "UPDATE_EQUIPMENT_BEGIN";

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

export interface UpdateCharacteristicsBeginAction {
  type: typeof UPDATE_CHARACTERISTICS_BEGIN;
  characteristics: Characteristics;
}

export interface UpdateEquipmentBeginAction {
  type: typeof UPDATE_EQUIPMENT_BEGIN;
  equipment: Equipment;
}

export type CharacterActions =
  | FetchCharacterBeginAction
  | FetchCharacterFailureAction
  | FetchCharacterSuccessAction
  | UpdateCharacteristicsBeginAction
  | UpdateEquipmentBeginAction;

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
  // TODO return await get(backendUrl() + "/characters/{id}");
  return new Promise(resolve => {
    resolve(givenTestCharacter());
  });
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

export function updateCharacteristics(characteristics: Characteristics) {
  return {
    characteristics,
    type: UPDATE_CHARACTERISTICS_BEGIN
  };
}

export function updateEquipment(equipment: Equipment) {
  return {
    equipment,
    type: UPDATE_EQUIPMENT_BEGIN
  };
}
