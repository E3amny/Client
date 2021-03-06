const initialState = {
    token: "",
  };
  
  export const setToken = (token) => {
    return {
      type: "SET_TOKEN",
      payload: token,
    };
  };
  
  const token = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_TOKEN":
        return { token: payload };
  
      default:
        return state;
    }
  };
  
  export default token;