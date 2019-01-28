import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Next extends Component{
    constructor(props){
        super(props);
        this.next=this.next.bind(this);
    }

    async next(){
        let { nextSong, audio, play, setSrc } = this.props;
        await nextSong();

        let currSrc = "http://localhost:5000" + this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");
        if(this.props.src !== currSrc){
            this.props.audio.src = currSrc;
            await setSrc(currSrc);
        }
        play();
        audio.play();
    }

    render(){
        return(
            <button className="next" onClick={this.next}>{<Icon type="step-forward" />}</button>
        );
    }
}

Next.propTypes={
    nextSong: PropTypes.func,
    audio: PropTypes.object,
    play: PropTypes.func,
    setSrc: PropTypes.func,
    src: PropTypes.string,
    songList: PropTypes.array,
    songNumber: PropTypes.number
}

export default Next;