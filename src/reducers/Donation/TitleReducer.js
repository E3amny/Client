const initialState = {
    title: "",

  };
  
  export const setTitle = (title) => {
    return {
      type: "SET_TITLE",
      payload: title
    };
  };
  
  const title  = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_TITLE":
        return { title : payload };
  
      default:
        return state;
    }
  };
  
  export default title;