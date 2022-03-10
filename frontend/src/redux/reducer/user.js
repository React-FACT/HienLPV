import {
  FETCH_USER,
  CREATE_USER,
  DELETE_USER,
} from '../../constants/redux.constant';

const initialState = [];

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return payload;
    case CREATE_USER:
      return [...state, { ...payload, id: state.slice(-1).pop().id + 1 }];
    case DELETE_USER:
      return state.filter((user) => user.id !== payload);
    default:
      break;
  }
  return state;
};

export default user;
