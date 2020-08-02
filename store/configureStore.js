import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = () => {
  // 1
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));
  // enhancer 넣어서 middleware 넣기
  const store = createStore(reducer, enhancer);
  // 2
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "devlopment"
});

export default wrapper;
