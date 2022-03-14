import { call, put, takeEvery } from 'redux-saga/effects';
import userAPI from '../api/user';
import { statusCode } from '../constants/api.constant';
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
} from '../constants/redux.constant';

function* fetchUser() {
  const { errorCode, results } = yield call(userAPI.fetchUsers);
  errorCode === statusCode.success
    ? yield put({ type: USER_FETCH_SUCCEEDED, payload: results })
    : yield put({ type: USER_FETCH_FAILED });
}

function* createUser({ payload }) {
  const { errorCode, results } = yield call(userAPI.createUser, payload);
  errorCode === statusCode.success
    ? yield put({ type: USER_CREATE_SUCCEEDED, payload: results })
    : yield put({ type: USER_CREATE_FAILED });
}

function* updateUser({ payload }) {
  const { errorCode, results } = yield call(
    userAPI.updateUser,
    payload.id,
    payload.body
  );
  errorCode === statusCode.success
    ? yield put({ type: USER_UPDATE_SUCCEEDED, payload: results })
    : yield put({ type: USER_UPDATE_FAILED });
}

function* deleteUser({ payload }) {
  yield call(userAPI.deleteUser, payload);
}

export function* mySaga() {
  yield takeEvery(FETCH_USER, fetchUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(DELETE_USER, deleteUser);
}
