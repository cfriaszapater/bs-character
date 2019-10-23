import { ThunkDispatch } from "redux-thunk";
import { backendUrl } from "../../util/backendUrl";
import { post } from "../../util/fetchJson";
import { history } from "../../util/history";
import { alertActions } from "../alert/alertActions";
import { User } from "../login/types";

export const createUser = (
  username?: string,
  password?: string,
  password2?: string
) => async (dispatch: ThunkDispatch<{}, {}, any>): Promise<void> => {
  if (!username || !password || !validPwd(password, password2)) {
    dispatch({ type: REGISTER_SUBMIT_VALIDATION_FAILED });
    return;
  }

  const user = { username, password };
  dispatch(request(user));

  try {
    const createdUser = await registerAndSetupUser(user);

    dispatch(success(createdUser));
    history.push("/");
  } catch (err) {
    dispatch(alertActions.error(err.message));
    dispatch(failure(err));
  }

  function request(requestedUser: User) {
    return { type: CREATE_USER_BEGIN, requestedUser };
  }
  function success(createdUser: User) {
    return { type: CREATE_USER_SUCCESS, user: createdUser };
  }
  function failure(error: Error) {
    return { type: CREATE_USER_FAILURE, error };
  }
};

async function registerAndSetupUser(user: User) {
  const createdUser = await postUser(user);

  return createdUser;
}

async function postUser(user: { username: string; password: string }) {
  return post(backendUrl() + "/users", user);
}

export function changeRegisterEditing(userData: {
  username?: string;
  password?: string;
  password2?: string;
}): ChangeRegisterEditingAction {
  return {
    password: userData.password,
    password2: userData.password2,
    type: CHANGE_REGISTER_EDITING,
    username: userData.username
  };
}

export function validPwd(password?: string, password2?: string) {
  return password && password2 && password === password2;
}

export const CREATE_USER_BEGIN = "CREATE_USER_BEGIN";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const CHANGE_REGISTER_EDITING = "CHANGE_REGISTER_EDITING";
export const REGISTER_SUBMIT_VALIDATION_FAILED =
  "REGISTER_SUBMIT_VALIDATION_FAILED";

export type RegisterActions =
  | CreateUserBeginAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | ChangeRegisterEditingAction
  | RegisterSubmitValidationFailed;

export interface CreateUserBeginAction {
  type: typeof CREATE_USER_BEGIN;
  user: User;
}

export interface CreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS;
  user: User;
}

export interface CreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE;
  error: Error;
}

export interface ChangeRegisterEditingAction {
  type: typeof CHANGE_REGISTER_EDITING;
  username?: string;
  password?: string;
  password2?: string;
}

export interface RegisterSubmitValidationFailed {
  type: typeof REGISTER_SUBMIT_VALIDATION_FAILED;
}
