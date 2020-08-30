import React, {useEffect} from "react";
import { connect } from "react-redux";
import { toggleInput, setCon, updateMetInput } from "../store/actions";
// import Worker from "./metronome.worker.js";

const Metronome = ({ audio, controls, dispatch, handleClick }) => {
    useEffect(() => {
        audioContext = new AudioContext();
        dispatch(setCon("M", null, audioContext));
    }, [])

    console.log("controls.metronome", controls.metronome)
    
    let audioContext;
    let current16thNote;
    let tempo = controls.tempo;
    let lookahead = 25.0;
    let scheduleAheadTime = 0.1;
    let nextNoteTime = 0.0;
    let noteLength = 0.05;
    let notesInQueue = [];


    const nextNote = () => {
        let secondsPerBeat = 60 / tempo;
        nextNoteTime += 0.25 * secondsPerBeat;

        current16thNote++;
        if (current16thNote == 16) {
            current16thNote = 0;
        }
    }

    const scheduleNote = (beatNumber, time) => {
        notesInQueue.push({ note: beatNumber, time: time });

        let osc = audio.metronomeContext.createOscillator();
        osc.connect(audio.metronomeContext.destination);
        if (beatNumber % 16 === 0)
            osc.frequency.value = 880.0;
        else if (beatNumber % 4 === 0)
            osc.frequency.value = 440.0;
        else
            osc.frequency.value = 220.0;

        osc.start(time);
        osc.stop(time + noteLength);
    }

    const scheduler = () => {
        while (nextNoteTime < audio.metronomeContext.currentTime + scheduleAheadTime) {
            scheduleNote(current16thNote, nextNoteTime);
            nextNote();
        }
    }

    const play = () => {
        console.log('metro status', controls.metronome, "context", audio.metronomeContext);
        if (!controls.metronome && !controls.playing) {
            current16thNote = 0;
            nextNoteTime = audio.metronomeContext.currentTime;
            timerWorker.postMessage("start");
            audio.metronomeContext.resume();
            dispatch(toggleInput("metronome"));
        } else if (controls.playing){
            console.log('else')
            audio.metronomeContext.suspend();
        } else if (!controls.playing){
            console.log('else 2')
            audio.metronomeContext.resume();
        }
    }

    let timerWorker;
    if (typeof (Worker) !== "undefined") {
        if (typeof (timerWorker) == "undefined") {
            timerWorker = new Worker("./metronome.worker.js");
            // timerWorker = new Worker();
        }
    };

    timerWorker.onmessage = (e) => {
        if (e.data === "tick") {
            scheduler();
        }
        else
            console.log("message: ", e.data);
    };

    timerWorker.postMessage({ "interval": lookahead });

    return (<div>
        <button
            onClick={() => handleClick(play)}>{!controls.playing ? "On" : "Off"}
                </button>
        </div>)
}

const mapState = ({ audio, controls }) => {
    return {
        audio,
        controls
    };
}

const mapDispatch = (dispatch) => {
    const handleClick = (callback) => {
        dispatch(toggleInput("playing"));
        callback();
    }
    return {
        dispatch,
        handleClick
    };
}

export default connect(mapState, mapDispatch)(Metronome);