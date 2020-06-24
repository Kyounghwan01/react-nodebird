import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";
/** login */
// 일반 함수
function logInApi(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    // action type - LOG_IN_REQUEST
    // action data - {}
    yield delay(2000);
    // const result = yield call(logInApi, action.data);
    // put은 디스패치
    // yield put({ type: "LOG_IN_SUCCESS", data: result.data });
    yield put({ type: "LOG_IN_SUCCESS" });
  } catch (err) {
    yield put({ type: "LOG_IN_FAILURE", data: err.response.data });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

/** logout */
function logOutApi() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    // const result = yield call(logOutApi);
    yield delay(2000);
    // put은 디스패치
    // yield put({ type: "LOG_OUT_SUCCESS", data: result.data });
    yield put({ type: "LOG_OUT_SUCCESS" });
  } catch (err) {
    yield put({ type: "LOG_OUT_FAILURE", data: err.response.data });
  }
}

function* watchLogOut() {
  // login액션 끝날때까지 기다린다
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSage() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
