import {
  REGISTER_TEAM_SUCCESS,
  REGISTER_TEAM_FAIL,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAIL,
  SET_MESSAGE,
} from "./types";
import TeamService from "../services/team.service";

export const createTeam = (name, token) => (dispatch) => {
  console.log(token);
  return TeamService.createTeam(name, token).then(
    (response) => {
      dispatch({
        type: REGISTER_TEAM_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_TEAM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getTeamsById = (header) => (dispatch) => {
  console.log("ASDASDAS");
  return TeamService.getTeamByUserId(header).then(
    (response) => {
      dispatch({
        type: FETCH_TEAM_SUCCESS,
        payload: { teams: [response.data] },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TEAM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
