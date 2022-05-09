const initialState = "";

const orderIdReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "STORE_ORDER_IDS":
        console.log("store id in reducer: ",payload);
        return payload

    default:
      return state;
  }
};

export default orderIdReducer;
