import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import orderIdReducer from "./orderIdReducer";
import mapItemQuantity from "./mapItemQuantity";

const rootReducer = combineReducers({
    cartItems: itemReducer,
    orderId: orderIdReducer,
    itemQuantity: mapItemQuantity
});

export default rootReducer;
