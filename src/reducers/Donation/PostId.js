const initialState = {
    postId: 0
  };
  
  export const setPostId = (postId) => {
    return {
      type: "SET_POSTID",
      payload: postId
    };
  };
  
  const postId = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_POSTID":
        return { postId: payload };
  
      default:
        return state;
    }
  };
  
  export default postId;