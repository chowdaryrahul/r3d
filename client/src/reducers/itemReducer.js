import { v4 as uuid } from 'uuid';

const initialState = [];

let copyState = null;
let index = 0;

const itemReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case 'CREATE_ITEM':
            return [...state, {id: uuid(), title:payload.title, description: payload.description}]

        default: 
            return state;
    }
}

export default itemReducer;
