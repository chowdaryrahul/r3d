import { combineReducers } from "redux";
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
    item: itemReducer
});

export default rootReducer;