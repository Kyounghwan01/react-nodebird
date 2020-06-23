// inital state 분리되는 항목으로 만든다

export const initalState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {}
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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null
      };
    default:
      return state;
  }
};

export default reducer;
