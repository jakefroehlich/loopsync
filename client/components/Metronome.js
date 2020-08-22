import React from "react";
import { connect } from "react-redux";
import { toggleInput } from "../store/actions";
// import Worker from "./metronome.worker.js";

const Metronome = ({ audio, controls, dispatch }) => {
    let audioContext = audio.sinkOneContext ? audio.sinkOneContext : new AudioContext();
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

        var osc = audioContext.createOscillator();
        osc.connect(audioContext.destination);
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
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(current16thNote, nextNoteTime);
            nextNote();
        }
    }

    const play = () => {
        dispatch(toggleInput("metronome"))
        console.log('metro status', controls.metronome, "@ tempo", controls.tempo)
        if (controls.metronome) {
            current16thNote = 0;
            nextNoteTime = audioContext.currentTime;
            timerWorker.postMessage("start");
            return "stop";
        } else {
            timerWorker.postMessage("stop");
            return "play";
        }
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./components/metronome.worker.js')
            .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, (err) => {
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }

    let timerWorker;
    if (typeof (Worker) !== "undefined") {
        if (typeof (timerWorker) == "undefined") {
            timerWorker = new Worker("./metronome.worker.js", {type: "module" });
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
            onClick={() => play()}>{controls.metronome ? "On" : "Off"}</button>
    </div>)
}

const mapState = ({ audio, controls }) => {
    return {
        audio,
        controls
    };
}

const mapDispatch = (dispatch) => {
    return {
        dispatch
    };
}

export default connect(mapState, mapDispatch)(Metronome);