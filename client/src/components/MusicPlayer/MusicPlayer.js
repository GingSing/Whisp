import React, { Component } from 'react';
import {Avatar, Skeleton, Icon, Slider, Progress } from 'antd';
import { Play, Next, Prev } from '../Buttons';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './MusicPlayer.css';

//need to split up this file.
class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.setSrc=this.setSrc.bind(this);
        this.updateDuration=this.updateDuration.bind(this);
        this.timeFormatter=this.timeFormatter.bind(this);
        this.changeCurrentTime=this.changeCurrentTime.bind(this);
        this.changeSlidersChanging=this.changeSlidersChanging.bind(this);
        this.handleVolumeChange=this.handleVolumeChange.bind(this);
        this.state ={
            volume: 0.5,
            src: '',
            currDuration: 0,
            songCurrentTime: 0,
            songDuration: 0,
            slidersChanging: false,
            mouseValue: 0
        }
    }
    componentDidMount(){
        //play next song instead of playing same song
        this.props.audio.volume = 0.5;
        this.props.audio.addEventListener('ended', this.next);
    }

    // dropVolume(){
    //     this.setState({ volume: Math.round(this.props.audio.volume * 10)/10 });
    // }

    setSrc(currSrc){
        this.setState({
            src:currSrc
        });
    }

    handleVolumeChange(value){
        this.props.audio.volume = value/100;
    }

    updateDuration(){
        this.setState({
            songCurrentTime: this.props.audio.currentTime,
            songDuration: this.props.audio.duration,
            currDuration: (this.props.audio.currentTime/this.props.audio.duration) * 100,
            mouseValue: this.props.audio.currentTime
        });
    }

    timeFormatter(timeInSeconds){
        let minutes = Math.floor(timeInSeconds/60);
        let seconds = (timeInSeconds%60).toFixed(0);
        let secondsFixer = seconds > 10 ? seconds : "0" + seconds;
        return `${minutes}:${secondsFixer}`;
    }

    changeSlidersChanging(value){
        let { slidersChanging } = this.state;
        console.log(slidersChanging);
        if(slidersChanging){
            this.setState({
                mouseValue:value
            }, console.log(value));
        }else{
            this.setState({
                slidersChanging: true,
                mouseValue: value
            }, console.log("changing"));
        }
    }

    changeCurrentTime(){
        let { mouseValue } = this.state;
        console.log(mouseValue);
        this.setState({
            slidersChanging: false
        }, async() => {
            this.props.audio.currentTime=mouseValue;
            await this.setState({
                songCurrentTime: mouseValue,
                currDuration: (this.props.audio.currentTime/this.props.audio.duration) * 100
            })
        });
    }

    render(){
        let { songList, songNumber, play, nextSong, audio, prevSong } = this.props;
        let { currDuration, songDuration, songCurrentTime, slidersChanging, mouseValue, src, volume } = this.state;
        return(
            <div className="musicPlayer">
                {
                    songList[songNumber] ? <MusicInfo data={songList[songNumber]} timeFormatter={this.timeFormatter}/> : <Skeleton className="musicPlayerSkeleton" avatar paragraph={{ rows: 0 }} />
                }
                <div className="musicPlayerControls">
                    <div className="musicPlayerButtons">
                        <Prev play={play} audio={audio} prevSong={prevSong} setSrc={this.setSrc} songNumber={this.props.songNumber} songList={this.props.songList} src={src}/>
                        <Play {...this.props} src={src} volume={volume} setSrc={this.setSrc}/>
                        <Next play={play} audio={audio} nextSong={nextSong} setSrc={this.setSrc} songNumber={this.props.songNumber} songList={this.props.songList} src={src}/>
                        <button className="loopBtn">{<Icon type="retweet" />}</button>
                    </div>
                    <div className="musicPlayerProgress">
                        
                        <span>
                            {
                                //this prevents the NaN symbol from appearing
                                songCurrentTime ? `${this.timeFormatter(songCurrentTime)}` : `0:00`
                            }
                        </span>
                        <div className="musicPlayerSlider">
                            <Slider className="sliders" value={slidersChanging ? mouseValue : currDuration} min={0} max={songDuration} onChange={this.changeSlidersChanging} onAfterChange={this.changeCurrentTime}/>
                        </div>
                        <span>
                            {
                                songDuration ? `${this.timeFormatter(songDuration)}` : `0:00`
                            }
                        </span>
                    </div>
                </div>
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
            { thumbnail_url ? <img className="musicInfoImg" src={thumbnail_url} /> : <Avatar shape="square" size={64} icon="user" />}
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
    play: PropTypes.func,
    pause: PropTypes.func,
    songList: PropTypes.array,
    src: PropTypes.string,
    setSrc: PropTypes.func,
    songNumber: PropTypes.number,
    playing: PropTypes.bool,
    paused: PropTypes.bool
}

MusicInfo.propTypes = {
    data: PropTypes.object
}

export default MusicPlayer;