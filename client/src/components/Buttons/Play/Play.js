import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Play extends Component{
    constructor(props){
        super(props);
        this.play=this.play.bind(this);
        this.pause=this.pause.bind(this);
        this.unpause=this.unpause.bind(this);
    }
    
    async play(){
        let { songList, songNumber, play, pause, src, setSrc } = this.props;
        if(!songList[songNumber]){
            return;
        }
        let currSrc = "http://localhost:5000" + songList[songNumber].file_url.split(" ").join("%20");
        if(src !== currSrc){
            this.props.audio.src = currSrc;
            setSrc(currSrc);
        }
        if(this.props.audio.paused){
            this.props.audio.play();
            this.unpause();
            await play(); // sets the state in redux
        }else{
            this.pause();
            await pause();
        }
    }

    async pause(){
        let interval = setInterval(()=>{
            if(this.props.audio.volume > 0.1){
                this.props.audio.volume -= 0.1;
            }else{
                clearInterval(interval);
                this.props.audio.pause();
            }
        }, 8);
    }

    async unpause(){
        let interval = setInterval(()=>{
            if(this.props.audio.volume < this.props.volume){
                this.props.audio.volume += 0.1;
            }else{
                clearInterval(interval);
            }
        }, 8);
    }

    render(){
        return(
            <button className="play" onClick={this.play}>{this.props.playing && !this.props.paused ? <Icon type="pause" /> :<Icon type="caret-right" />}</button>             
        );
    }
}

Play.propTypes={
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

export default Play;