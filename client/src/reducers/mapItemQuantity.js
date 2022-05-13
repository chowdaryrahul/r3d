const initialState = [];

const mapItemQuantity = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "MAP_ITEM_QTY":
      return payload.itmQty;

    case "ITEM_QTY_EMPTY":
      return [];

    default:
      return state;
  }
};

export default mapItemQuantity;
