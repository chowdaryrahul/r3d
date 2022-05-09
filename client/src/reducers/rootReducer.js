import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import orderIdReducer from "./orderIdReducer";

const rootReducer = combineReducers({
    cartItems: itemReducer,
    orderId: orderIdReducer
});

export default rootReducer;