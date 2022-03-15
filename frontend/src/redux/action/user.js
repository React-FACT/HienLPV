import { userConstants } from '../../constants/redux.constant';

const userActions = {
  fetchUsers() {
    return {
      type: userConstants.FETCH_USER,
    };
  },

  createUser(user) {
    return {
      type: userConstants.CREATE_USER,
      user,
    };
  },

  updateUsers(id, user) {
    return {
      type: userConstants.UPDATE_USER,
      id,
      user,
    };
  },

  deleteUser(id) {
    return {
      type: userConstants.DELETE_USER,
      id,
    };
  },

  fetchUsersSucceeded(payload) {
    return {
      type: userConstants.FETCH_USER_SUCCEEDED,
      payload,
    };
  },

  createUserSucceeded(payload) {
    return {
      type: userConstants.CREATE_USER_SUCCEEDED,
      payload,
    };
  },

  updateUsersSucceeded(payload) {
    return {
      type: userConstants.UPDATE_USER_SUCCEEDED,
      payload,
    };
  },

  deleteUserSucceeded(payload) {
    return {
      type: userConstants.DELETE_USER_SUCCEEDED,
      payload,
    };
  },
};

export default userActions;
