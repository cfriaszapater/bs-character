import { ThunkDispatch } from "redux-thunk";
import { Attributes } from "../../store/character/types";
import { backendUrl } from "../../util/backendUrl";
import { get, post, put } from "../../util/fetchJson";
import { AppState } from "../rootReducer";
import { Character, Characteristics, Equipment } from "./types";

export const FETCH_CHARACTER_BEGIN = "FETCH_CHARACTER_BEGIN";
export const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
export const FETCH_CHARACTER_FAILURE = "FETCH_CHARACTER_FAILURE";
export const UPDATE_CHARACTERISTICS_BEGIN = "UPDATE_CHARACTERISTICS_BEGIN";
export const UPDATE_EQUIPMENT_BEGIN = "UPDATE_EQUIPMENT_BEGIN";
export const UPDATE_ATTRIBUTES_BEGIN = "UPDATE_ATTRIBUTES_BEGIN";
export const UPDATE_ATTRIBUTES_SUCCESS = "UPDATE_ATTRIBUTES_SUCCESS";
export const UPDATE_ATTRIBUTES_FAILURE = "UPDATE_ATTRIBUTES_FAILURE";
export const CREATE_CHARACTER_BEGIN = "CREATE_CHARACTER_BEGIN";
export const CREATE_CHARACTER_SUCCESS = "CREATE_CHARACTER_SUCCESS";
export const CREATE_CHARACTER_FAILURE = "CREATE_CHARACTER_FAILURE";

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

export interface UpdateAttributesBeginAction {
  type: typeof UPDATE_ATTRIBUTES_BEGIN;
  attributes: Attributes;
}

export interface CreateCharacterBeginAction {
  type: typeof CREATE_CHARACTER_BEGIN;
}

export interface CreateCharacterSuccessAction {
  type: typeof CREATE_CHARACTER_SUCCESS;
  character: Character;
}

export interface CreateCharacterFailureAction {
  type: typeof CREATE_CHARACTER_FAILURE;
  error: Error | null;
}

export interface UpdateAttributesSuccessAction {
  type: typeof UPDATE_ATTRIBUTES_SUCCESS;
  character: Character;
}

export interface UpdateAttributesFailureAction {
  type: typeof UPDATE_ATTRIBUTES_FAILURE;
  error: Error | null;
}

export type CharacterActions =
  | FetchCharacterBeginAction
  | FetchCharacterFailureAction
  | FetchCharacterSuccessAction
  | UpdateCharacteristicsBeginAction
  | UpdateEquipmentBeginAction
  | UpdateAttributesBeginAction
  | UpdateAttributesSuccessAction
  | UpdateAttributesFailureAction
  | CreateCharacterBeginAction
  | CreateCharacterFailureAction
  | CreateCharacterSuccessAction;

export const fetchCharacter = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<Character> => {
  dispatch(fetchCharacterBegin());
  try {
    const character: Character = await getCharacter(id);
    return dispatch(fetchCharacterSuccess(character)).character;
  } catch (error) {
    dispatch(fetchCharacterFailure(error));
    throw error;
  }
};

async function getCharacter(id: string): Promise<Character> {
  return await get(backendUrl() + "/characters/" + id);
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

export function updateCharacteristics(
  characteristics: Characteristics
): UpdateCharacteristicsBeginAction {
  return {
    characteristics,
    type: UPDATE_CHARACTERISTICS_BEGIN
  };
}

export function updateEquipment(
  equipment: Equipment
): UpdateEquipmentBeginAction {
  return {
    equipment,
    type: UPDATE_EQUIPMENT_BEGIN
  };
}

export const updateAttributes = (attributes: Attributes) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => AppState
): Promise<Character> => {
  dispatch(updateAttributesBegin(attributes));
  try {
    const character = getState().character.character;
    const updatedCharacter: Character = await putCharacter(character);
    return dispatch(updateAttributesSuccess(updatedCharacter)).character;
  } catch (error) {
    dispatch(updateAttributesFailure(error));
    throw error;
  }
};

function updateAttributesBegin(
  attributes: Attributes
): UpdateAttributesBeginAction {
  return {
    attributes,
    type: UPDATE_ATTRIBUTES_BEGIN
  };
}

async function putCharacter(character: Character): Promise<Character> {
  return await put(backendUrl() + "/characters/" + character.id, character);
}

export const createCharacter = () => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<Character> => {
  dispatch(createCharacterBegin());
  try {
    const character: Character = await postCharacter();
    return dispatch(createCharacterSuccess(character)).character;
  } catch (error) {
    dispatch(createCharacterFailure(error));
    throw error;
  }
};

const createCharacterBegin = (): CreateCharacterBeginAction => ({
  type: CREATE_CHARACTER_BEGIN
});

async function postCharacter(): Promise<Character> {
  return await post(backendUrl() + "/characters", null);
}

export const createCharacterSuccess = (
  character: Character
): CreateCharacterSuccessAction => ({
  character,
  type: CREATE_CHARACTER_SUCCESS
});

export const createCharacterFailure = (
  error: Error
): CreateCharacterFailureAction => ({
  error,
  type: CREATE_CHARACTER_FAILURE
});

export const updateAttributesSuccess = (
  character: Character
): UpdateAttributesSuccessAction => ({
  character,
  type: UPDATE_ATTRIBUTES_SUCCESS
});

export const updateAttributesFailure = (
  error: Error
): UpdateAttributesFailureAction => ({
  error,
  type: UPDATE_ATTRIBUTES_FAILURE
});
