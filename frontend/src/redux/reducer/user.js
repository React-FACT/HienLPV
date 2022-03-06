import { FETCH_USER, CREATE_USER } from '../constant';

const user = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return payload;
    case CREATE_USER:
      return payload;
    default:
      break;
  }
  return state;
};

export default user;
