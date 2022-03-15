import { userConstants } from '../../constants/redux.constant';

const initialState = [];

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case userConstants.FETCH_USER_SUCCEEDED:
      return payload;
    case userConstants.CREATE_USER_SUCCEEDED:
      return [...state, payload];
    case userConstants.UPDATE_USER_SUCCEEDED:
      return state.map((user) => (user.id === payload.id ? payload : user));
    case userConstants.DELETE_USER_SUCCEEDED:
      return state.filter((user) => user.id !== payload);
    default:
      break;
  }
  return state;
};

export default user;
