const initialState = {
    img: "",

  };
  
  export const setImage = (img) => {
    return {
      type: "SET_IMAGE",
      payload: img
    };
  };
  
  const img = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_IMAGE":
        return { img: payload };
  
      default:
        return state;
    }
  };
  
  export default img;