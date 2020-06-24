/** 사가 이펙트 */
import { all, fork } from "redux-saga/effects";

import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}

// reducer랑 비슷한 파일형태로 쪼갠다
