import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextSong, setSrc, play, setAudio } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Next extends Component{
    constructor(props){
        super(props);
        this.next=this.next.bind(this);
    }

    //sets music player to play next song (required to play next song)
    //but is an extra eventlistener
    async componentDidMount(){ 
        await this.props.setAudio(new Audio());
        this.props.audio.addEventListener('ended', this.next);
    }

    async next(){
        let { nextSong, play, setSrc } = this.props;
        await nextSong();

        //sets the src if src is different
        let currSrc = "http://localhost:5000" + this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");
        if(this.props.src !== currSrc){
            await setSrc(currSrc);
        }
        play();
    }

    render(){
        return(
            <button className="next" onClick={this.next}>{<Icon type="step-forward" />}</button>
        );
    }
}

Next.propTypes={
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
    nextSong: () => {
        dispatch(nextSong());
    },
    play: () => {
        dispatch(play());
    },
    setSrc: (src) => {
        dispatch(setSrc(src));
    },
    setAudio: (audio) => {
        dispatch(setAudio(audio));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Next);