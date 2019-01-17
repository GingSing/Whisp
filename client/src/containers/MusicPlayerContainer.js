import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play } from '../_actions/MusicPlayerActions';

import { MusicPlayer } from '../components';

class MusicPlayerContainer extends Component{
    render(){
        return(
            <MusicPlayer />
        );
    }
}

const mapStateToProps = state => ({
    music: state.music
});

const mapDispatchToProps = dispatch => ({
    play:() => {
        dispatch(play());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer);