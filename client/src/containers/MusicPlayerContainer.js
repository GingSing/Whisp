import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAudio } from '../_actions/MusicPlayerActions';

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
    setAudio: (audio) => {
        dispatch(setAudio(audio));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer);