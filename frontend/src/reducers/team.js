import { REGISTER_TEAM_SUCCESS, REGISTER_TEAM_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_TEAM_SUCCESS:
      return {
        ...state,
      };
    case REGISTER_TEAM_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
