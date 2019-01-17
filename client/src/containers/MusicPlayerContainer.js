import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause, nextSong } from '../_actions/MusicPlayerActions';

import { MusicPlayer } from '../components';

class MusicPlayerContainer extends Component{
    render(){
        return(
            <MusicPlayer {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    playing: state.music.playing,
    paused: state.music.paused,
    songList: state.music.songList,
    songNumber: state.music.songNumber,
    loop: state.music.loop
});

const mapDispatchToProps = dispatch => ({
    play:() => {
        dispatch(play());
    },
    pause:() => {
        dispatch(pause());
    },
    nextSong:() => {
        dispatch(nextSong());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer);