import TYPES from "./types";

const metronomeReducer = (
    state = {    
        audioContext: undefined,
        current16thNote: undefined,
        lookahead: 25.0,
        scheduleAheadTime: 0.1,
        nextNoteTime: 0.0,
        noteLength: 0.05,
        notesInQueue: [],
        playing: false,
    },
    action
) => {
    switch (action.type) {
        case TYPES.UPDATE_MET_INPUT:
            return {
                ...state,
                [action.name]: action.value,
            };
        case TYPES.CLEAR_MET_INPUT:
            return {
                audioContext: undefined,
                current16thNote: undefined,
                lookahead: 25.0,
                scheduleAheadTime: 0.1,
                nextNoteTime: 0.0,
                noteLength: 0.05,
                notesInQueue: []
            };
        default:
            return state;
    }
};

export default metronomeReducer;