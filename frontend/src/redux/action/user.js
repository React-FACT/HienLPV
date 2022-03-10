import {
  FETCH_USER,
  CREATE_USER,
  DELETE_USER,
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

export const createUser = (data) => async (dispatch) => {
  const { errorCode, results } = await userAPI.createUser(data);
  if (errorCode === 200) {
    dispatch({
      type: CREATE_USER,
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
