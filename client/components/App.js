import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import {storage} from "./Firebase"
import Sink from "./Sink"
import Metronome from "./Metronome";

const App = ({audio, controls}) => {
    const load = (file) => {
        const uploadTask = storage.ref(`audio/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log("Error uploading!", error);
            },
            () => {
                storage
                    .ref("audio")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => console.log('Data URL!', url))
            }
        )
    }
    return (
        <div className="background">
                <Sink sinkNum={1}/>
                <Sink sinkNum={2}/>
                <Sink sinkNum={3}/>
                <Sink sinkNum={4}/>
            <Switch>
                <Route to="/home"></Route>
                <Route to="/record"></Route>
                <Redirect to="/home"></Redirect>
            </Switch>
        </div>)
};

const mapStateToProps = ({audio, controls}) => {
    return {
        audio,
        controls
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);