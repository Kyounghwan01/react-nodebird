export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const initalState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초"
      },
      content: "첫번째 게시글 #해시태그",
      Images: [
        {
          src:
            "https://t1.kakaocdn.net/friends/kfo-common/mo/m640/brand/brand_wearefriends1_171130.png"
        },
        {
          src:
            "https://t1.kakaocdn.net/friends/kfo-common/mo/m640/brand/brand_wearefriends1_171130.png"
        },
        {
          src:
            "https://t1.kakaocdn.net/friends/kfo-common/mo/m640/brand/brand_wearefriends1_171130.png"
        }
      ],
      // 시퀄라이즈에서 관계가 있으면 합쳐주는애들은 대문자로 나옴
      // 소문자는 post에만 관한 내용
      Comments: [
        {
          User: {
            nickname: "hero"
          },
          content: "ㅎㅎㅎ"
        },
        {
          User: {
            nickname: "ㅋㅌㅊ"
          },
          content: "ㅎㅎㅎ"
        }
      ]
    }
  ],
  // 이미지 경로
  imagePaths: [],
  // 게시글 추가가 완료되면 true
  postAdded: false
};

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data
});

const dummyPost = {
  id: 2,
  content: "더미",
  User: {
    id: 1,
    nickname: "wewe"
  },
  Images: [],
  Comments: []
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {};
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      };
    case ADD_POST_FAILURE:
      return {};
    default:
      return state;
  }
};

export default reducer;
