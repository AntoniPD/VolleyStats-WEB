import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (msg) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: { message: msg },
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};
