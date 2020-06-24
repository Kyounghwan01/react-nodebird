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
  const handler = useCallback(e => {
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
  debug: process.env.NODE_ENV === "devlopment"
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
    loginData: {}
  },
  post: {
    mainPosts: []
  }
};

export const loginAction = data => {
  return {
    type: "LOG_IN",
    data
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT"
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
          user: action.data
        }
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null
        }
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

### reducer 분리

### 서버사이드렌더링은 스타일드 컴포넌트가 안먹는다

- html 데이터와 합쳐서 렌더링하는데 서버에서는 스타일드 컴포넌트가 적용이 안된체로 렌더됨 -> 다른 페이지 갔다오면 됨

## redux-thunk

- 함수가 지연되었다
- 리덕스는 동기식만 가능하나 비동기로 가능하고
- 하나의 액션에서 여러가지 디스패치가 가능하다
- axio요청을 보낼래, 로딩 포스트 success -> 로딩 -> 포스트 -> false 3가지 동기액션을 디스패치 가능
- 구현이 어려운건 아닌데, thunk가 디스패치를 묶어서 지연시켜서 발동하는 게 전부, 나머지는 다 내가 ...

## redux saga

- sage
- saga는 몇초뒤에 액션 실행 같은 옵션을 더 준다
- 실수로 클릭을 여러번 한경우, tghunk에서는 요청이 다가나 - take latest로 가장 마지막꺼만 호출한다
- thuttle이라고 스크롤을 내릴때, 1초에 수백번 나오는 이벤트 리스너에 dos공격을 안하도록, 이것을 적용하고 1초에 몇번까지 액션 발생하는 것 방지(thuttle, debounce)

### 제너레이터

자기만의 패턴 만들고 그대로 한다.

- 함수

```js
const gen = function* () {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield;
  console.log(4)
}
const gener = gen()
// gener() - gener{<suspended>}
gener().next() -> 1
gener().next() -> 2
gener().next() -> 3
gener().next() -> 4
gener().next() -> undifined
```

gen안의 next를 실행해야한다.

- done이 true가 될때까지 실행됨
- value는 제너레이터 내부 변수가 들어감
- 함수를 실행하다 중간에 멈추고 싶을때

  - 제너레이터를 쓰고, yield를 중단점에 넣으면 next()호출 안하면 중단가능

- 절대 멈추지 않는 제너레이터

```js
let i = 0
const gen = function\*() {
while(true){
    yield i++;
  }
}
g.next() // 1
g.next() // 2
g.next() // 3
g.next() // 4
... 무한 가능
// 저 방법을 응용한게 saga 이펙트 takeEvery
```

### saga 이펙트 함수

- all은 배열을 받고, 받은 이펙트를 등록 (실행 아님, 등록임!!)
- fork는 함수를 실행
- call은 fork와 다른데 일단 보류 - call은 동기함수호출, fork은 비동기함수 호출
- call은 api가 리턴할때까지 기다림
- fork은 안기다리고 리턴 다음꺼 이동
- 중요! 통신할때는 무조건 call (yield가 await과 비슷)
- take -> 한번만 실행되고 이벤트 삭제됨
- takeEvery -> 한번 실행되도, 이벤트 계속 리슨
- takeLatest -> 클릭 실수로 2번 했을때, 앞 이벤트 무시 마지막 이벤트 실행(보통 이거 많이씀)
- 이미 완료됬다면 실행해줌 -> 둘다 팬딩이면 뒤에꺼만
- 주의! f -> b으로 2번 req를 보내긴함 -> 그러나 b->f로 res는 1번 보냄 (즉, 서버단에 저장 2번됬는지 확인 필요)
- 즉 : 새로고침하면 2개가 반영될수있음
- 위에꺼를 막기위해 throttle가 있음
- throttle: 초 이내에 req를 1번만 - 이거 많이써야겠네 - 스크롤 (마지막 함수가 호출된 후 일정 시간이 지나기전 재호출 안함)
- debounce: 검색 결과 - 초 이내에 req를 1번만 (연이어 호출되는 함수들 중 마지막 함수 or 가장 처음 함수만 호출)
- takeLeading -> 첫번째 이벤트만 실행, 뒤에꺼 무시

```

```

### reducer, saga 이벤트 동시 발생시 reducer가 먼저 실행
