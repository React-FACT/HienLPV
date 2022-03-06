import { FETCH_USER, CREATE_USER } from '../constant';
import userAPI from '../../api/user';

export const fetchUsers = () => async (dispatch) => {
  const payload = await userAPI.fetchUsers();
  dispatch({
    type: FETCH_USER,
    payload,
  });
};

export const createUser = (data) => async (dispatch) => {
  await userAPI.createUser(data);
  const payload = await userAPI.fetchUsers();
  dispatch({
    type: CREATE_USER,
    payload,
  });
};
