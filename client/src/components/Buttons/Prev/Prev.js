import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Prev extends Component{
    constructor(props){
        super(props);
        this.prev=this.prev.bind(this);
    }

    async prev(){
        let { audio, setSrc, play, prevSong } = this.props;
        //if audio timer is over 5%
        if(audio.currentTime/audio.duration >= 0.05){
            audio.play();
        }else{
            await prevSong();
            let currSrc = "http://localhost:5000" + this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");    
            console.log(currSrc);
            if(this.props.src !== currSrc){
                this.props.audio.src = currSrc;
                await setSrc(currSrc);
            }
            play();
            audio.play();
        }
    }

    render(){
        return(
            <button className="prevBtn" onClick={this.prev}>{<Icon type="step-backward" />}</button>
        );
    }
}

export default Prev;