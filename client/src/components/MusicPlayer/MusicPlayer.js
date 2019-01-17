import React, { Component } from 'react';

import { Avatar, Skeleton, Icon } from 'antd';

import 'antd/dist/antd.css';
import './MusicPlayer.css';

class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.play=this.play.bind(this);
        this.state ={
            volume: 1,
            src: ''
        }
    }

    componentDidMount(){
        let audio = document.getElementById("musicPlayerAudio");
        //play next song instead of playing same song
        audio.addEventListener('ended', function(e){
            audio.play();
        })
    }

    async play(){
        let { songList, songNumber, play, pause } = this.props;
        if(!songList[songNumber]){
            return;
        }
        let audio = document.getElementById("musicPlayerAudio");
        let currSrc = "http://localhost:5000" + songList[songNumber].file_url.split(" ").join("%20");
        if(this.state.src !== currSrc){
            audio.src = currSrc;
            this.setState({
                src: currSrc
            });
        }

        if(audio.paused){
            audio.play();
            this.unpause(audio);
            await play(); // sets the state in redux
        }else{
            this.pause(audio);
            await pause();
        }
    }

    async pause(audio){
        await this.setState({ volume: Math.round(audio.volume * 10)/10 });
        
        let interval = setInterval(()=>{
            if(audio.volume > 0.1){
                audio.volume -= 0.1;
            }else{
                clearInterval(interval);
                document.getElementById("musicPlayerAudio").pause();
            }
        }, 8);
    }

    async unpause(audio){
        let interval = setInterval(()=>{
            if(audio.volume < this.state.volume){
                audio.volume += 0.1;
            }else{
                clearInterval(interval);
            }
        }, 8);
    }

    render(){

        let { songList, songNumber } = this.props;

        return(
            <div className="musicPlayer">
                {
                    songList[songNumber] ? <MusicInfo data={songList[songNumber]}/> : <Skeleton className="musicPlayerSkeleton" avatar paragraph={{ rows: 0 }} />
                }
                <div className="musicPlayerControls">
            <button className="playBtn" onClick={this.play}>{this.props.playing && !this.props.paused ? <Icon type="pause" /> :<Icon type="caret-right" />}</button>
                </div>

                <audio id="musicPlayerAudio">
                    <source src="" type="audio/mp3" />
                </audio>
            </div>
        );
    }
}

const MusicInfo = ({data}) => {
    return(
        <div className="musicInfo">
            <Avatar shape="square" size={64} icon="user" />
            <div className="musicInfoCard">
                <span className="musicName">{data.name}</span>
                <span className="musicArtist">{data.artist}</span>
                <span className="musicLength">{data.length_seconds}</span>
            </div>
        </div>
    );
}

export default MusicPlayer;