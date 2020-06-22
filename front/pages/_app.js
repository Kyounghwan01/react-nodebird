import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

App.PropTypes = {
  children: PropTypes.elementType.isRequired,
};

export default App;

//  index.js의 리턴 컴포넌트가 _app.js의 Component에 들어가서
// 이파일은 공통 적으로 적용할때 사용

// 문서에서 head를 바꾸고 싶으면
