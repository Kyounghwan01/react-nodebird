// 서버사이드 렌더링 위함
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

// async action creator

// 리듀서 분리
const rootReducer = combineReducers({
  // 서버사이드렌더링 위해 hydrate가 필요하고,index 부분추가
  index: (state = {}, action) => {
    switch (action.type) {
      case "HYDRATE":
        console.log("HYDRATE");
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post
});

export default rootReducer;
