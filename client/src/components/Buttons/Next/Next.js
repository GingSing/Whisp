import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextSong, setSrc, play, setAudio, setVolume } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

class Next extends Component{
    constructor(props){
        super(props);
        this.next=this.next.bind(this);
        this.state={
            removed: false
        }
    }

    //sets music player to play next song (required to play next song)
    //but is an extra eventlistener
    async componentDidMount(){ 
        await this.props.setAudio(new Audio());
        this.props.audio.addEventListener('ended', this.next);
    }

    async shouldComponentUpdate(newProps){
        if(newProps.loop === true && this.state.removed === false){
            await this.props.audio.removeEventListener('ended', this.next);
            this.setState({
                removed: true
            });
        }
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
        let { audio, setVolume } = this.props;
        let interval = setInterval(()=>{
            if(audio.volume < this.props.userVolume){
                setVolume(audio.volume + 0.05);
            }else{
                clearInterval(interval);
            }
        }, 11);
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
    songNumber: PropTypes.number,
    userVolume: PropTypes.number,
    loop: PropTypes.bool
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    src: state.music.src,
    songList: state.music.songList,
    songNumber: state.music.songNumber,
    userVolume: state.music.userVolume,
    loop: state.music.loop
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
    },
    setVolume: (volume) => {
        dispatch(setVolume(volume));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Next);