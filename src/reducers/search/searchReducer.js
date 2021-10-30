const initialState = {
    text1: "",
  };
  
  export const setText1 = (text1) => {
    return {
      type: "SET_TEXT",
      payload: text1,
    };
  };
  
  const text1 = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_TEXT":
        return { text1: payload };
  
      default:
        return state;
    }
  };
  
  export default text1;