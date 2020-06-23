# Next

## 라우터 생성

- react-router 라우팅 라이브러리 쓰지 않고, root레벨에 pages라는 폴더가 라우터가 된다.
- `pages/signup` - `https:.../signup`
- `pages/signup/test` - `https:.../signup/test`

- react-router의 `Link`도 next에서 자체적으로 해결 가능

```jsx
import Link from "next/link";
<Link href="/signup">
  <a>
    <Button>회원가입</Button>
  </a>
</Link>;
```

## 디자인 패턴

> hook이 나오기 전에는 container, presenter 디자인 패턴을 react에서 추천했는데, hook이 나온 후로 굳이 둘을 나눌 필요가 없다는 게 react 측 입장, 그러나 개발자 성향대로 디자인 하시오

## pages 전체 감싸는 파일

`_app.js`라는 파일은 pages에 전역으로 발동하는 파일이다. 이곳에 css 모듈을 넣거나, 프로젝트의 title, meta 데이터를 넣는다

### 프로젝트 타이틀 바꾸기

```js
// pages/_app.js
import Head from "next/head";

<Head>
  <meta charSet="utf-8" />
  <title>NodeBird</title>
</Head>;
```

위와 같은 방법으로 프로젝트 title 값을 바꿀 수 있다.

### antd - react 연결

```jsx
//pages/_app.js
import "antd/dist/antd.css";
```

### pages에 redux 연결

> 중요한 점은 react에서는 `Provider`로 전체를 감싼 후, store를 연결해줬는데, next에서는 next가 자체적으로 감싸줌으로 개발자가 임의로 `Provider`를 감싸면 오히려 에러가 난다.

```jsx
// pages/_app.js
import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";

import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    // next에서는 provider가 없다- 알아서 해줌
    <Component />
  );
};

export default wrapper.withRedux(App);
```

## custom hooks

> 동일한 로직의 `useState`, `useCallback`을 쓸 경우 custome hook을 만들어 중복 로직을 막는다. 파일명은 `useInput.jsx`처럼 use를 앞에 붙이는게 컨벤션

- 폼 데이터 입력 커스텀 훅

```jsx
// hooks/useInput
import { useState, useCallback } from "react";

export default (initalValue = null) => {
  const [value, setValue] = useState(initalValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
```

위 처럼 커스텀 훅을 정의하고, 사용은 아래와 같이 쓴다.

```jsx
// pages/LoginForm
import useInput from "../hooks/useInput";

export default function LoginForm() {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  render(
    <>
      <Input name="user-id" value={id} onChange={onChangeId} required />
      <Input
        name="user-password"
        type="password"
        value={password}
        onChange={onChangePassword}
        required
      />
    </>
  );
}
```

- 커스텀 훅을 정의 안하면, useState 2개, state를 바꾸는 함수 useCallback 2개가 만들어야 하나, 커스텀 훅을 정의하여 2줄로 줄인 예시다

## Form

- 현업에서는 react-form을 사용한다.
- antD에서는 Form안에 `onFinish`라는 속성이 있고, 그 속성에는 `onFinish={onSubmit}`같이 함수가 들어간다. 그 함수에는 `e.preventDefault()`가 기본으로 들어가 있다.
- antD에서 Form안의 Button에 `htmlType="submit"`이라는 속성을 넣고, 클릭하면 Form안에 정의한 `onFinish={onSubmit}` 함수 실행한다.

## next에 redux 넣기

### redux store 정의

```jsx
// store/configureStore.js
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const configureStore = () => {
  const middleware = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));
  // enhancer 넣어서 middleware 넣기
  const store = createStore(reducer, enhancer);
  return store;
};

// 디벨롭 모드에서 디버깅
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "devlopment",
});

export default wrapper;
```

### app에 redux 넣기

```jsx
// pages/_app.js
import wrapper from "../store/configureStore";
...
export default wrapper.withRedux(App);
```

### reducer 정의

- 간단한 로그인 예시

```jsx
// reducers/index.js
import { HYDRATE } from "next-redux-wrapper";

const initalState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

// async action creator (redux-thunk, saga) 작성 예정

const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    // error! - 맨처음 initalstate null인 경우 - reducer 초기화 될때 실행되는데 default가 없으면 null로 박힌다.
    default:
      return state;
  }
};

export default rootReducer;
```

### 사용!

```jsx
// components/LoginForm.jsx
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../reducers";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return <>{isLoggedIn ? <div>로그인됨</div> : <div>로그인 안됨</div>}</>
```
