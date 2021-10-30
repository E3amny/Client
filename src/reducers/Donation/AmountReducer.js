const initialState = {
    amount: 0
  };
  
  export const setAmount = (amount) => {
    return {
      type: "SET_AMOUNT",
      payload: amount
    };
  };
  
  const amount = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_AMOUNT":
        return { amount: payload };
  
      default:
        return state;
    }
  };
  
  export default amount;