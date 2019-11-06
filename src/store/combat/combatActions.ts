import { ThunkDispatch } from "redux-thunk";
import { givenTestCombat } from "../../testUtil/givenAppStateWithMockData";
import { Combat } from "./types";

export const FETCH_COMBAT_BEGIN = "FETCH_COMBAT_BEGIN";
export const FETCH_COMBAT_SUCCESS = "FETCH_COMBAT_SUCCESS";
export const FETCH_COMBAT_FAILURE = "FETCH_COMBAT_FAILURE";

export interface FetchCombatBeginAction {
  type: typeof FETCH_COMBAT_BEGIN;
}

export interface FetchCombatSuccessAction {
  type: typeof FETCH_COMBAT_SUCCESS;
  combat: Combat;
}

export interface FetchCombatFailureAction {
  type: typeof FETCH_COMBAT_FAILURE;
  error: Error | null;
}

export type CombatActions =
  | FetchCombatBeginAction
  | FetchCombatFailureAction
  | FetchCombatSuccessAction;

export const fetchCombat = () => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<FetchCombatSuccessAction | FetchCombatFailureAction> => {
  dispatch(fetchCombatBegin());
  try {
    const combat: Combat = await getCombat();
    return dispatch(fetchCombatSuccess(combat));
  } catch (error) {
    return dispatch(fetchCombatFailure(error));
  }
};

async function getCombat(): Promise<Combat> {
  // TODO return await get(backendUrl() + "/combats/{id}");
  return new Promise(resolve => {
    resolve(givenTestCombat());
  });
}

export const fetchCombatBegin = (): FetchCombatBeginAction => ({
  type: FETCH_COMBAT_BEGIN
});

export const fetchCombatSuccess = (
  combat: Combat
): FetchCombatSuccessAction => ({
  combat,
  type: FETCH_COMBAT_SUCCESS
});

export const fetchCombatFailure = (error: Error): FetchCombatFailureAction => ({
  error,
  type: FETCH_COMBAT_FAILURE
});
