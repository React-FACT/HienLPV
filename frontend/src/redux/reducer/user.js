import { FETCH_USER, CREATE_USER } from '../../constants/redux.constant';

const initialState = [];

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return payload;
    case CREATE_USER:
      return [...initialState, payload];
    default:
      break;
  }
  return state;
};

export default user;
