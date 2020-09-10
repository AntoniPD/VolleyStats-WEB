import {
  REGISTER_PLAYER_SUCCESS,
  REGISTER_PLAYER_FAIL,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAIL,
  SET_MESSAGE,
} from "./types";
import PlayerService from "../services/player.service";

export const createPlayer = (
  name,
  number,
  position,
  height,
  weight,
  teamId,
  token
) => (dispatch) => {
  return PlayerService.createPlayer(
    name,
    number,
    position,
    height,
    weight,
    teamId,
    token
  ).then(
    (response) => {
      dispatch({
        type: REGISTER_PLAYER_SUCCESS,
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
        type: REGISTER_PLAYER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getPlayersByTeamId = (header) => (dispatch) => {
  console.log("ASDASDAS");
  return PlayerService.getPlayersByTeamId(header).then(
    (response) => {
      dispatch({
        type: FETCH_PLAYER_SUCCESS,
        payload: { players: [response.data] },
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
        type: FETCH_PLAYER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
