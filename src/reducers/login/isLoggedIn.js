const initialState = {
    isLoggedIn: false,
  };
  
  export const setIsLoggedIn = (isLoggedIn) => {
    return {
      type: "SET_ISLOGGEDIN",
      payload: isLoggedIn,
    };
  };
  
  const isLoggedIn = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_ISLOGGEDIN":
        return { isLoggedIn: payload };
  
      default:
        return state;
    }
  };
  
  export default isLoggedIn;