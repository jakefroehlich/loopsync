import React, { component, useEffect } from "react";
import { connect } from "react-redux";
import {
    updateInput,
    clearInput,
    toggleInput,
    clearAudio
} from "../store/actions";
import Metronome from "./Metronome";

const Header = ({ audio, controls, togglePlay, handleChange }) => {
    useEffect(() => {
        console.log("play: ", controls.play);
    });
    return (<div className="header">
        <img
            src="https://i.ibb.co/q12LJhK/Loop-Sync-Logo.png"
            className="headerimg"
        />
        <div className="tempoWord">
            Tempo:
        </div>
        <div>
            <input 
                type="range" 
                min={40} 
                max={140}
                onChange={(e) => handleChange(e)}></input>
                <div>
                    {controls.tempo}
                </div>
        </div>
        <div className="met">
            Met :
                </div>
            <Metronome />
        <div className="playButtonContainer">
            <button
                className="playButton"
                onClick={() => togglePlay(controls, audio)}>
                {!controls.play ?
                    <p>Play Together</p> : <p>Stop</p>}
            </button>
            <button
                className="clearButton"
                onClick={() => clearAudio(undefined)}>
                <p>Clear Tracks</p>
            </button>
        </div>
    </div>)
}

const mapStateToProps = ({ audio, controls }) => {
    return {
        audio,
        controls,
    };
};

const mapDispatchToProps = (dispatch) => {
    const togglePlay = (controls, audio) => {
        if (controls.play) {
            if (audio.sinkOneContext) {
                audio.sinkOneContext.suspend();
            }
            if (audio.sinkTwoContext) {
                audio.sinkTwoContext.suspend();
            }
            if (audio.sinkThreeContext) {
                audio.sinkThreeContext.suspend();
            }
            if (audio.sinkFourContext) {
                audio.sinkFourContext.suspend();
            }
        } else {
            if (audio.sinkOneContext) {
                if (audio.sinkOneContext.state == "suspended") {
                    audio.sinkOneContext.resume();
                } else {
                    audio.sinkOneSource.start();
                }
            }
            if (audio.sinkTwoContext) {
                if (audio.sinkTwoContext.state == "suspended") {
                    audio.sinkTwoContext.resume();
                } else {
                    audio.sinkTwoSource.start();
                }
            }
            if (audio.sinkThreeContext) {
                if (audio.sinkThreeContext.state == "suspended") {
                    audio.sinkThreeContext.resume();
                } else {
                    audio.sinkThreeSource.start();
                }
            }
            if (audio.sinkFourContext) {
                if (audio.sinkFourContext.state == "suspended") {
                    audio.sinkFourContext.resume();
                } else {
                    audio.sinkFourSource.start();
                }
            }
        }
        dispatch(toggleInput("play"))
    }

    const handleChange = (e) => {
        dispatch(updateInput("tempo", e.target.value));
    }

    return {
        dispatch,
        togglePlay,
        handleChange
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);