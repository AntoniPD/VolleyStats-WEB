import { START_MATCH_SUCCESS, START_MATCH_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_MATCH_SUCCESS:
      return {
        ...state,
      };
    case START_MATCH_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
