import {
  FETCH_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../../constants/redux.constant';

const initialState = [];

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return payload;
    case DELETE_USER:
      return state.filter((user) => user.id !== payload);
    case UPDATE_USER:
      return state.map((user) => (user.id === payload.id ? payload : user));
    default:
      break;
  }
  return state;
};

export default user;
