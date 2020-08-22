import {createStore, combineReducers, applyMiddleware} from "redux";
import thunks from "redux-thunk";
import audioReducer from "./audioReducer";
import controlsReducer from "./controlsReducer";

const masterReducer = combineReducers({
    audio: audioReducer,
    controls: controlsReducer,
  });

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;