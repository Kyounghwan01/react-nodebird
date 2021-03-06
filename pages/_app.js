import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";

import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    // next에서는 provider가 없다- 알아서 해줌
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired
};

App.defaultProps = {
  Component: {}
};

// 4. saga
export default wrapper.withRedux(withReduxSaga(App));

//  index.js의 리턴 컴포넌트가 _app.js의 Component에 들어가서
// 이파일은 공통 적으로 적용할때 사용
