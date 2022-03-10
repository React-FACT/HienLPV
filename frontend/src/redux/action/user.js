import {
  FETCH_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../../constants/redux.constant';
import userAPI from '../../api/user';

export const fetchUsers = () => async (dispatch) => {
  const { errorCode, results } = await userAPI.fetchUsers();
  if (errorCode === 200) {
    dispatch({
      type: FETCH_USER,
      payload: results,
    });
  }
};

export const createUser = (body) => async (dispatch) => {
  const { errorCode } = await userAPI.createUser(body);
  const { results } = await userAPI.fetchUsers();
  if (errorCode === 200) {
    dispatch({
      type: FETCH_USER,
      payload: results,
    });
  }
};

export const updateUsers = (id, body) => async (dispatch) => {
  const { errorCode, results } = await userAPI.updateUser(id, body);
  if (errorCode === 200) {
    dispatch({
      type: UPDATE_USER,
      payload: results,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const { results } = await userAPI.deleteUser(id);
  if (results === 1) {
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  }
};
