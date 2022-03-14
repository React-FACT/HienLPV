import {
  FETCH_USER,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../../constants/redux.constant';

export const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER,
  });
};

export const createUser = (body) => async (dispatch) => {
  dispatch({
    type: CREATE_USER,
    payload: body,
  });
};

export const updateUsers = (id, body) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: { id, body },
  });
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};
