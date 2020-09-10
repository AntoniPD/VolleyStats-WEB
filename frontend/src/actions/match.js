import { START_MATCH_SUCCESS, START_MATCH_FAIL, SET_MESSAGE } from "./types";
import MatchService from "../services/match.service";

export const startMatch = (name, teamId, token) => (dispatch) => {
  return MatchService.startMatch(name, teamId, token).then(
    (response) => {
      dispatch({
        type: START_MATCH_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log("WTf");

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: START_MATCH_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
