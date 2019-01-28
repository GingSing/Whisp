import React, { Component } from 'react';
import {Avatar, Skeleton, Icon, Slider, } from 'antd';
import { setVolume } from '../../_actions/MusicPlayerActions';
import { connect } from 'react-redux';
import { Play, Next, Prev, Loop } from '../Buttons';
import ProgressBar from '../ProgressBar';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './MusicPlayer.css';

//need to split up this file.
class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.timeFormatter=this.timeFormatter.bind(this);
        this.handleVolumeChange=this.handleVolumeChange.bind(this);
    }
    componentDidMount(){
        //auto sets the volume to 50%
        this.props.setVolume(0.5);
    }

    handleVolumeChange(value){
        this.props.setVolume(value/100);
    }

    timeFormatter(timeInSeconds){
        let minutes = Math.floor(timeInSeconds/60);
        let seconds = (timeInSeconds%60).toFixed(0);
        let secondsFixer = seconds > 10 ? seconds : "0" + seconds;
        return `${minutes}:${secondsFixer}`;
    }


    render(){
        let { songList, songNumber } = this.props;
        return(
            <div className="musicPlayer">
                {
                    songList[songNumber] ? <MusicInfo data={songList[songNumber]} timeFormatter={this.timeFormatter}/> : <Skeleton className="musicPlayerSkeleton" avatar paragraph={{ rows: 0 }} />
                }
                <div className="musicPlayerControls">
                    <div className="musicPlayerButtons">
                        <Prev />
                        <Play />
                        <Next />
                        <Loop />
                    </div>
                </div>
                <ProgressBar />
                <div className="musicPlayerVolume">
                    <Slider className="volumeSlider" defaultValue={50} onChange={this.handleVolumeChange}/>
                </div>
            </div>
        );
    }
}

const MusicInfo = ({data, timeFormatter}) => {
    let { thumbnail_url, name, artist, length_seconds } = data;
    //fixes the seconds because it gives a single number instead of 2
    return(
        <div className="musicInfo">
            { thumbnail_url ? <img className="musicInfoImg" src={thumbnail_url} alt=""/> : <Avatar shape="square" size={64} icon="user" />}
            <div className="musicInfoCard">
                <span className="musicName">{name}</span>
                <span className="musicArtist">{artist}</span>
                <span className="musicLength">{timeFormatter(length_seconds)}</span>
            </div>
        </div>
    );
}

MusicPlayer.propTypes = {
    audio: PropTypes.object,
    songList: PropTypes.array,
    songNumber: PropTypes.number,
    playing: PropTypes.bool,
    paused: PropTypes.bool
}

MusicInfo.propTypes = {
    data: PropTypes.object
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    playing: state.music.playing,
    paused: state.music.paused,
    songList: state.music.songList,
    songNumber: state.music.songNumber
});

const mapDispatchToProps = dispatch => ({
    setVolume: (volume) => {
        dispatch(setVolume(volume));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);