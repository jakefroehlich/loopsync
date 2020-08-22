import React from "react";
import { connect } from "react-redux";
import { setSink, setCon, updateInput, toggleInput, clearAudio } from "../store/actions"

const Sink = ({
    sinkOneURL,
    sinkTwoURL,
    sinkThreeURL,
    sinkFourURL,
    sinkOneContext,
    sinkTwoContext,
    sinkThreeContext,
    sinkFourContext,
    sinkOneSource,
    sinkTwoSource,
    sinkThreeSource,
    sinkFourSource,
    setAudio,
    setLength,
    setContext,
    controls,
    sinkNum,
    handleDelete,
    dispatch
}) => {
    //Assigning the correct audio URL from state based on the Sink Number
    const soundURLgen = () => {
        switch (sinkNum) {
            case 1:
                return sinkOneURL;
            case 2:
                return sinkTwoURL;
            case 3:
                return sinkThreeURL;
            case 4:
                return sinkFourURL;
        }
    };

    const soundURL = soundURLgen();

    const soundContextgen = () => {
        switch (sinkNum) {
            case 1:
                return sinkOneContext;
            case 2:
                return sinkTwoContext;
            case 3:
                return sinkThreeContext;
            case 2:
                return sinkFourContext;
        }
    };

    const soundContext = soundContextgen();

    const soundSourcegen = () => {
        switch (sinkNum) {
            case 1:
                return sinkOneSource;
            case 2:
                return sinkTwoSource;
            case 3:
                return sinkThreeSource;
            case 4:
                return sinkFourSource;
        }
    };

    const soundSource = soundSourcegen();

    //Defining the pieces used by my Sink Component
    let audioContext;
    let source;
    let songLength;
    const recordButton = <button
        onClick={() => mediaRecorder.start()} 
        className={controls.recording ? "recbutton" : "button"}
        >Record
        </button>
    const stopRecButton = <button 
        onClick={() => mediaRecorder.stop()} 
        className="button"
        >Stop Rec
        </button>
    const stopButton = <button onClick={() => handleDelete(sinkNum)} className="delbutton">Delete</button>

    //Creating context for the Web Audio API, creating a buffer to insert the audio in, and creating a source for the buffer to play through
    const getData = (url) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        if (soundContext) {
            audioContext = soundContext;
        } else {
            audioContext = new AudioContext();
        }

        source = audioContext.createBufferSource();
        const request = new XMLHttpRequest();

        request.open("GET", url, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            const audioData = request.response;

            audioContext.decodeAudioData(audioData, (buffer) => {
                const myBuffer = buffer;
                songLength = buffer.duration;
                source.buffer = myBuffer;
                source.connect(audioContext.destination);
                source.loop = true;
                source.loopStart = 2;

                if (controls.length > 0) {
                    source.loopEnd = controls.length;
                } else {
                    setLength(songLength);
                }

                setContext(sinkNum, source, audioContext);
            },
            (e) => { console.log("Error connecting your buffer", e)});
        }

        request.send();
    }

    if (soundURL && !soundSource && !soundContext) {
        getData(soundURL);
    }

    //Defining the recorder and how it dispatches to state
    let mediaRecorder;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.enumerateDevices();
        let chunks = [];
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                }


                mediaRecorder.onstop = (e) => {
                    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    setAudio(audioURL, sinkNum);
                }

            })
            .catch((error) => console.log("Error getting user media:", error))
    }
    else {
        console.log("Get user media not supported :(.");
    }

    //Component
    return (
        <div className="sink">
            <div className="sinkimg"></div>
            {recordButton}
            {stopRecButton}
            {/* {startButton} */}
            <audio
                className="sinkaudio"
                src={soundURL}
                loop={true}
                controls />
            {stopButton}
        </div>)
}

const mapState = ({ audio, controls }) => {
    const { sinkOneURL,
        sinkTwoURL,
        sinkThreeURL,
        sinkFourURL,
        sinkOneContext,
        sinkTwoContext,
        sinkThreeContext,
        sinkFourContext,
        sinkOneSource,
        sinkTwoSource,
        sinkThreeSource,
        sinkFourSource } = audio;
    return {
        sinkOneURL,
        sinkTwoURL,
        sinkThreeURL,
        sinkFourURL,
        sinkOneContext,
        sinkTwoContext,
        sinkThreeContext,
        sinkFourContext,
        sinkOneSource,
        sinkTwoSource,
        sinkThreeSource,
        sinkFourSource,
        controls
    }
}

const mapDispatch = (dispatch) => {
    const setAudio = (url, sinkNum) => dispatch(setSink(url, sinkNum));
    const setContext = (sinkNum, source, context) => dispatch(setCon(sinkNum, source, context));
    const setLength = (length) => dispatch(updateInput("length", length));
    const togglePlay = () => dispatch(toggleInput("play"));
    const handleDelete = (sinkNum) => dispatch(clearAudio(sinkNum));
    return {
        setAudio,
        setLength,
        togglePlay,
        setContext,
        handleDelete, 
        dispatch
    }
}

export default connect(mapState, mapDispatch)(Sink);
