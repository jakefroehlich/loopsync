import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";

const Sink = () => {
    useEffect(() => {
        console.log("Sink effect Used!");
    });
    return (
        <div className="Sink">
            <div className="Sinkimg"></div>
        </div>)
}