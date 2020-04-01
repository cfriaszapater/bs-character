import { ThunkDispatch } from "redux-thunk";
import {
  givenTestCombatDecideStaminaHigherIni,
  givenTurnAttackResolved
} from "../../testUtil/givenAppStateWithMockData";
import { AttackStamina, Combat, DefendStamina, Turn } from "./types";
import { setInterval } from "timers";
import { AppState } from "../rootReducer";
import { Character } from "../character/types";

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
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => AppState
): Promise<FetchCombatSuccessAction | FetchCombatFailureAction> => {
  dispatch(fetchCombatBegin());
  try {
    console.log("state on fetchCombat = " + JSON.stringify(getState()));
    return await fetchCombatNoLoading(dispatch, getState().character.character);
  } catch (error) {
    return dispatch(fetchCombatFailure(error));
  }
};

// TODO mock implementation until integration with backend
async function fetchCombatNoLoading(
  dispatch: ThunkDispatch<{}, {}, any>,
  character?: Character
) {
  if (character) {
    console.log(
      "fetchCombatNoLoading called with character " +
        character.id +
        ", " +
        character.name
    );
  } else {
    console.log("fetchCombatNoLoading without character !!!");
  }
  await timeout(300);
  const combat = await getCombat(character);
  return dispatch(fetchCombatSuccess(combat));
}

async function getCombat(character?: Character): Promise<Combat> {
  // TODO return await get(backendUrl() + "/combats/{id}");
  return new Promise(resolve => {
    resolve(givenTestCombatDecideStaminaHigherIni(character));
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
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => AppState
): Promise<ResolveAttackSuccessAction | ResolveAttackFailureAction> => {
  const character = getState().character.character;
  console.log(
    "resolveAttack with stamina, character",
    JSON.stringify(stamina),
    JSON.stringify(character)
  );
  dispatch(resolveAttackBegin());
  try {
    const turn = await postResolveAttack(stamina, character);
    return dispatch(resolveAttackSuccess(turn));
    // TODO fetchCombat() and then fetchCombatSuccess()?
    // const combat = await fetchCombat();
  } catch (error) {
    return dispatch(resolveAttackFailure(error));
  }
};

async function postResolveAttack(
  stamina: AttackStamina | DefendStamina,
  character: Character
): Promise<Turn> {
  console.log(
    "postResolveAttack with character = " + JSON.stringify(character)
  );
  // TODO POST /attack, /defense or PATCH /turn with stamina. Eg:
  // return await post(backendUrl() + "/combats/{id}/turn/attacks/{attackNumber}/attackerStamina");
  return new Promise(resolve => {
    resolve(givenTurnAttackResolved(character));
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

export const pollOpponentDecision = (delay: number) => (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => AppState
): NodeJS.Timeout => {
  return setInterval(
    () => fetchCombatNoLoading(dispatch, getState().character.character),
    delay,
    dispatch
  );
};
