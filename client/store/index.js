import {createStore, combineReducers, applyMiddleware} from "redux";
import thunks from "redux-thunk";

const masterReducer = (state = {}, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;