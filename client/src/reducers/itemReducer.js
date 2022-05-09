
const initialState = [];

let copyState = null;
let index = 0;

const itemReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case 'ADD_CART_ITEM':
            state = payload;
            return state;
            
        case 'EMPTY_CART':
            return [];

        default: 
            return state;
    }
}

export default itemReducer;
