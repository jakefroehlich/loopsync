import React, { component, useEffect } from "react";
import { connect } from "react-redux";

const Header = () => {
    useEffect(() => {
        console.log("Header effect used!");
    });
    let tempo = 100;
    let metronome = {};
    let play = "play";
    metronome.status = "On";
    return (<div className="header">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Facebook_New_Logo_%282015%29.svg/800px-Facebook_New_Logo_%282015%29.svg.png"
            className="headerimg"
        />
        <div className="tempoWord">
            Tempo:
                </div>
        <div className="tempoNum">
            {tempo}
        </div>
        <div className="met">
            Met :
                </div>
        <div className="metButton">
            {metronome.status === "On" ?
                <p>On</p> : <p>Off</p>}
        </div>
        <div className="playButtonContainer">
            <div className="playButton">
                {play === "play" ?
                    <p>Play</p> : <p>Pause</p>}
            </div>
        </div>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);