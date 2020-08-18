import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";

const App = () => {
    useEffect(() => {
        console.log('App effect Used!');
    });
    return (
        <div className="background">
            <audio
                src="./116052__xserra__enprovaze-2.wav"
                controls
                />
            <ReactAudioPlayer
                src="./116052__xserra__enprovaze-2.wav"
                autoPlay
                controls
                />
            <Switch>
                <Route to="/home"></Route>
                <Redirect to="/home"></Redirect>
            </Switch>
        </div>)
};

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

export default connect(mapStateToProps, mapDispatchToProps)(App);