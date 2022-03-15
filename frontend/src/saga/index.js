import { call, put, takeEvery } from 'redux-saga/effects';

import userAPI from '../api/user';
import userActions from '../redux/action/user';
import { statusCode } from '../constants/api.constant';
import { userConstants } from '../constants/redux.constant';

function* fetchUser() {
  const { errorCode, results } = yield call(userAPI.fetchUsers);
  if (errorCode === statusCode.success) {
    yield put(userActions.fetchUsersSucceeded(results));
  }
}

function* createUser({ user }) {
  const { errorCode, results } = yield call(userAPI.createUser, user);
  if (errorCode === statusCode.success) {
    yield put(userActions.createUserSucceeded(results));
  }
}

function* updateUser({ id, user }) {
  const { errorCode, results } = yield call(userAPI.updateUser, id, user);
  if (errorCode === statusCode.success) {
    yield put(userActions.updateUsersSucceeded(results));
  }
}

function* deleteUser({ id }) {
  yield call(userAPI.deleteUser, id);
  yield put(userActions.deleteUserSucceeded(id));
}

export function* mySaga() {
  yield takeEvery(userConstants.FETCH_USER, fetchUser);
  yield takeEvery(userConstants.CREATE_USER, createUser);
  yield takeEvery(userConstants.UPDATE_USER, updateUser);
  yield takeEvery(userConstants.DELETE_USER, deleteUser);
}
