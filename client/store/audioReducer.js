import TYPES from "./types";

const audioReducer = (
    state = {
        metronomeContext: undefined,
        sinkOneURL: undefined,
        sinkOneContext: undefined,
        sinkOneSource: undefined,
        sinkOneVol: 1,
        sinkTwoURL: undefined,
        sinkTwoContext: undefined,
        sinkTwoSource: undefined,
        sinkTwoVol: 1,
        sinkThreeURL: undefined,
        sinkThreeContext: undefined,
        sinkThreeSource: undefined,
        sinkThreeVol: 1,
        sinkFourURL: undefined,
        sinkFourContext: undefined,
        sinkFourSource: undefined,
        sinkFourVol: 1,
    },
    action
) => {
    switch (action.type) {
        case TYPES.SET_SINK:
            switch (action.sinkNum) {
                case 1:
                    return {
                        ...state,
                        sinkOneURL: action.url,
                        sinkOneContext: action.context,
                        sinkOneSource: action.source
                    };
                case 2:
                    return {
                        ...state,
                        sinkTwoURL: action.url,
                        sinkTwoContext: action.context,
                        sinkTwoSource: action.source
                    }
                case 3:
                    return {
                        ...state,
                        sinkThreeURL: action.url,
                        sinkThreeContext: action.context,
                        sinkThreeSource: action.source
                    }
                case 4:
                    return {
                        ...state,
                        sinkFourURL: action.url,
                        sinkFourContext: action.context,
                        sinkFourSource: action.source
                    }
            }
        case TYPES.SET_CONTEXT:
            switch (action.sinkNum) {
                case 1:
                    return {
                        ...state,
                        sinkOneContext: action.context,
                        sinkOneSource: action.source
                    };
                case 2:
                    return {
                        ...state,
                        sinkTwoContext: action.context,
                        sinkTwoSource: action.source
                    };
                case 3:
                    return {
                        ...state,
                        sinkThreeContext: action.context,
                        sinkThreeSource: action.source
                    };
                case 4:
                    return {
                        ...state,
                        sinkFourContext: action.context,
                        sinkFourSource: action.source
                    };
                case "M":
                    return {
                        ...state,
                        metronomeContext: action.context,
                    };
            }
        case TYPES.SET_SINK_VOL:
            switch (action.sinkNum) {
                case 1:
                    return {
                        ...state,
                        sinkOneVol: action.value,
                    };
                case 2:
                    return {
                        ...state,
                        sinkTwoVol: action.value,
                    };
                case 3:
                    return {
                        ...state,
                        sinkThreeVol: action.value,
                    }
                case 4:
                    return {
                        ...state,
                        sinkFourVol: action.value,
                    }
            }
        case TYPES.CLEAR_AUDIO:
            switch (action.sinkNum) {
                case undefined:
                    return {
                        sinkOneURL: undefined,
                        sinkOneContext: undefined,
                        sinkOneSource: undefined,
                        sinkTwoURL: undefined,
                        sinkTwoContext: undefined,
                        sinkTwoSource: undefined,
                        sinkThreeURL: undefined,
                        sinkThreeContext: undefined,
                        sinkThreeSource: undefined,
                        sinkFourURL: undefined,
                        sinkFourContext: undefined,
                        sinkFourSource: undefined,
                    };
                case 1:
                    return {
                        ...state,
                        sinkOneURL: undefined,
                        sinkOneContext: undefined,
                        sinkOneSource: undefined
                    }
                case 2:
                    return {
                        ...state,
                        sinkTwoURL: undefined,
                        sinkTwoContext: undefined,
                        sinkTwoSource: undefined
                    }
                case 3:
                    return {
                        ...state,
                        sinkThreeURL: undefined,
                        sinkThreeContext: undefined,
                        sinkThreeSource: undefined
                    }
                case 4:
                    return {
                        ...state,
                        sinkFourURL: undefined,
                        sinkFourContext: undefined,
                        sinkFourSource: undefined
                    }
            }
        default:
            return state;
    }
};

export default audioReducer;