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

// async action creator

// 액션 만들고 디스패치하면 리듀서에 의해 이전상태, 다음상태가 만들어지고, 바뀐 것을 확인하면 연결된 컴포넌트가 다 바뀜

export const changeNickName = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};

const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case "HYDRATE":
      console.log("HYDRATE");
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
    // 맨처음 initalstate 반영안했을때 - reducer 초기화 될때 실행되는데 default가 없으면 null로 박힌다.
    default:
      return state;
  }
};

export default rootReducer;
