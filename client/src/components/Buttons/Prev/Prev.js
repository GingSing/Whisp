import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, prevSong, setSrc, stop } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Prev extends Component{
    constructor(props){
        super(props);
        this.prev=this.prev.bind(this);
    }

    async prev(){
        let { audio, setSrc, play, prevSong, stop } = this.props;
        //if audio timer is over 5%
        if(audio.currentTime/audio.duration >= 0.05){
            stop();
            play();
        }else{
            await prevSong();
            let currSrc = "http://localhost:5000" + this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");
            if(this.props.src !== currSrc){
                await setSrc(currSrc);
            }
            play();
        }
    }

    render(){
        return(
            <button className="prevBtn" onClick={this.prev}>{<Icon type="step-backward" />}</button>
        );
    }
}

Prev.propTypes={
    audio: PropTypes.object,
    src: PropTypes.string,
    songList: PropTypes.array,
    songNumber: PropTypes.number
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    src: state.music.src,
    songList: state.music.songList,
    songNumber: state.music.songNumber
});

const mapDispatchToProps = dispatch => ({
    play: () => {
        dispatch(play());
    },
    prevSong: () => {
        dispatch(prevSong());
    },
    setSrc: (src) => {
        dispatch(setSrc(src));
    },
    stop: () => {
        dispatch(stop());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Prev);