import {createStore, combineReducers, applyMiddleware} from "redux";
import thunks from "redux-thunk";
import audioReducer from "./audioReducer";
import controlsReducer from "./controlsReducer";
import metronomeReducer from "./metronomeReducer";

const masterReducer = combineReducers({
    audio: audioReducer,
    controls: controlsReducer,
    metronome: metronomeReducer,
  });

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;