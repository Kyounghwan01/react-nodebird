import { all, fork, call, put, throttle, delay } from "redux-saga/effects";
import axios from "axios";

/** addpost */
function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi, action.data);
    yield delay(2000);
    // put은 디스패치
    yield put({ type: "ADD_POST_SUCCESS" });
    // yield put({ type: "ADD_POST_SUCCESS", data: result.data });
  } catch (err) {
    yield put({ type: "ADD_POST_FAILURE", data: err.response.data });
  }
}

function* watchAddPost() {
  yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* postSage() {
  yield all([fork(watchAddPost)]);
}
