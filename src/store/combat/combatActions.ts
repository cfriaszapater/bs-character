import { ThunkDispatch } from "redux-thunk";
import {
  givenTestCombatDecideStaminaHigherIni,
  givenTurnAttackResolved
} from "../../testUtil/givenAppStateWithMockData";
import {
  AttackResult,
  AttackStamina,
  Combat,
  DefendStamina,
  Turn
} from "./types";

export const FETCH_COMBAT_BEGIN = "FETCH_COMBAT_BEGIN";
export const FETCH_COMBAT_SUCCESS = "FETCH_COMBAT_SUCCESS";
export const FETCH_COMBAT_FAILURE = "FETCH_COMBAT_FAILURE";

export const RESOLVE_ATTACK_BEGIN = "RESOLVE_ATTACK_BEGIN";
export const RESOLVE_ATTACK_SUCCESS = "RESOLVE_ATTACK_SUCCESS";
export const RESOLVE_ATTACK_FAILURE = "RESOLVE_ATTACK_FAILURE";

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

export interface ResolveAttackBeginAction {
  type: typeof RESOLVE_ATTACK_BEGIN;
}

export interface ResolveAttackSuccessAction {
  type: typeof RESOLVE_ATTACK_SUCCESS;
  turn: Turn;
}

export interface ResolveAttackFailureAction {
  type: typeof RESOLVE_ATTACK_FAILURE;
  error: Error | null;
}

export type CombatActions =
  | FetchCombatBeginAction
  | FetchCombatFailureAction
  | FetchCombatSuccessAction
  | ResolveAttackBeginAction
  | ResolveAttackFailureAction
  | ResolveAttackSuccessAction;

export const fetchCombat = () => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<FetchCombatSuccessAction | FetchCombatFailureAction> => {
  dispatch(fetchCombatBegin());
  try {
    await timeout(300);
    const combat = await getCombat();
    return dispatch(fetchCombatSuccess(combat));
  } catch (error) {
    return dispatch(fetchCombatFailure(error));
  }
};

async function getCombat(): Promise<Combat> {
  // TODO return await get(backendUrl() + "/combats/{id}");
  return new Promise(resolve => {
    resolve(givenTestCombatDecideStaminaHigherIni());
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

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const resolveAttack = (stamina: AttackStamina | DefendStamina) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<ResolveAttackSuccessAction | ResolveAttackFailureAction> => {
  console.log("resolveAttack with stamina", JSON.stringify(stamina));
  dispatch(resolveAttackBegin());
  try {
    const turn = await postResolveAttack(stamina);
    return dispatch(resolveAttackSuccess(turn));
    // TODO fetchCombat() and then fetchCombatSuccess()?
    // const combat = await fetchCombat();
  } catch (error) {
    return dispatch(resolveAttackFailure(error));
  }
};

async function postResolveAttack(
  stamina: AttackStamina | DefendStamina
): Promise<Turn> {
  // TODO return await post(backendUrl() + "/combats/{id}/turn/{id}/attack");
  // or   return await post(backendUrl() + "/combats/{id}/turn/{id}/defense");
  return new Promise(resolve => {
    resolve(givenTurnAttackResolved());
  });
}

export const resolveAttackBegin = (): ResolveAttackBeginAction => ({
  type: RESOLVE_ATTACK_BEGIN
});

export const resolveAttackSuccess = (
  turn: Turn
): ResolveAttackSuccessAction => ({
  turn,
  type: RESOLVE_ATTACK_SUCCESS
});

export const resolveAttackFailure = (
  error: Error
): ResolveAttackFailureAction => ({
  error,
  type: RESOLVE_ATTACK_FAILURE
});
