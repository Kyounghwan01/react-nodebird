import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";

export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

/** addpost */
function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost() {
  try {
    // const result = yield call(addPostApi, action.data);
    yield delay(2000);
    // put은 디스패치
    yield put({ type: ADD_POST_SUCCESS });
    // yield put({ type: ADD_POST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, data: err.response.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
