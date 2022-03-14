import {
  FETCH_USER,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED,
  CREATE_USER,
  USER_CREATE_SUCCEEDED,
  USER_CREATE_FAILED,
  UPDATE_USER,
  USER_UPDATE_SUCCEEDED,
  USER_UPDATE_FAILED,
  DELETE_USER,
} from '../../constants/redux.constant';

const initialState = {
  isLoading: false,
  data: [],
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return { ...state, isLoading: true };
    case USER_FETCH_SUCCEEDED:
      return { ...state, isLoading: false, data: payload };
    case USER_FETCH_FAILED:
      return { ...state, isLoading: false };
    case CREATE_USER:
      return { ...state, isLoading: true };
    case USER_CREATE_SUCCEEDED:
      return { ...state, isLoading: false, data: [...state.data, payload] };
    case USER_CREATE_FAILED:
      return { ...state, isLoading: false };
    case UPDATE_USER:
      return { ...state, isLoading: true };
    case USER_UPDATE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    case USER_UPDATE_FAILED:
      return { ...state, isLoading: false };
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter((user) => user.id !== payload),
      };
    default:
      break;
  }
  return state;
};

export default user;
