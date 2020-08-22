import TYPES from "./types";

const controlsReducer = (
    state = {
        play: false,
        length: 0,
        tempo: 60,
        recording: false,
        metronome: true,
    },
    action
) => {
    switch (action.type) {
        case TYPES.UPDATE_INPUT:
            return {
                ...state,
                [action.name]: action.value,
            };
        case TYPES.TOGGLE_INPUT:
            return {
                ...state,
                [action.name]: !state[action.name]
            }
        case TYPES.CLEAR_INPUT:
            return {
                status: "pause",
            };
        default:
            return state;
    }
};

export default controlsReducer;