import React, { Component } from 'react';

import { Avatar, Skeleton, Icon, Slider, Progress } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './MusicPlayer.css';

//need to split up this file.
class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.play=this.play.bind(this);
        this.next=this.next.bind(this);
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
        this.audio.volume = 0.5;
        this.audio.addEventListener('ended', this.next);
    }

    async play(){
        let { songList, songNumber, play, pause } = this.props;
        if(!songList[songNumber]){
            return;
        }
        let currSrc = "http://localhost:5000" + songList[songNumber].file_url.split(" ").join("%20");
        if(this.state.src !== currSrc){
            this.audio.src = currSrc;
            this.setState({
                src: currSrc
            });
        }

        if(this.audio.paused){
            this.audio.play();
            this.unpause();
            await play(); // sets the state in redux
        }else{
            this.pause();
            await pause();
        }
    }

    async pause(){
        await this.setState({ volume: Math.round(this.audio.volume * 10)/10 });
        
        let interval = setInterval(()=>{
            if(this.audio.volume > 0.1){
                this.audio.volume -= 0.1;
            }else{
                clearInterval(interval);
                this.audio.pause();
            }
        }, 8);
    }

    async unpause(){
        let interval = setInterval(()=>{
            if(this.audio.volume < this.state.volume){
                this.audio.volume += 0.1;
            }else{
                clearInterval(interval);
            }
        }, 8);
    }

    async next(){
        let { nextSong } = this.props;
        await nextSong();
        this.play();
    }

    handleVolumeChange(value){
        this.audio.volume = value/100;
    }

    updateDuration(){
        this.setState({
            songCurrentTime: this.audio.currentTime,
            songDuration: this.audio.duration,
            currDuration: (this.audio.currentTime/this.audio.duration) * 100,
            mouseValue: this.audio.currentTime
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
            this.audio.currentTime=mouseValue;
            await this.setState({
                songCurrentTime: mouseValue,
                currDuration: (this.audio.currentTime/this.audio.duration) * 100
            })
        });
    }

    render(){
        let { songList, songNumber } = this.props;
        let { currDuration, songDuration, songCurrentTime, slidersChanging, mouseValue } = this.state;
        console.log(songDuration/600);
        return(
            <div className="musicPlayer">
                {
                    songList[songNumber] ? <MusicInfo data={songList[songNumber]} timeFormatter={this.timeFormatter}/> : <Skeleton className="musicPlayerSkeleton" avatar paragraph={{ rows: 0 }} />
                }
                <div className="musicPlayerControls">
                    <div className="musicPlayerButtons">
                        <button className="prevBtn">{<Icon type="step-backward" />}</button>
                        <button className="playBtn" onClick={this.play}>{this.props.playing && !this.props.paused ? <Icon type="pause" /> :<Icon type="caret-right" />}</button>
                        <button className="nextBtn" onClick={this.next}>{<Icon type="step-forward" />}</button>
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

                <audio id="musicPlayerAudio" ref={elem => this.audio = elem} onTimeUpdate={this.updateDuration}>
                    <source src="" type="audio/mp3" />
                </audio>
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
    songList: PropTypes.array,
    songNumber: PropTypes.number
}

MusicInfo.propTypes = {
    data: PropTypes.object
}

export default MusicPlayer;