/** 사가 이펙트 */
import { all, fork } from "redux-saga/effects";

import userSaga from "./user";
import postSage from "./post";

export default function* rootSaga() {
  yield all([fork(postSage), fork(userSaga)]);
}

// reducer랑 비슷한 파일형태로 쪼갠다
