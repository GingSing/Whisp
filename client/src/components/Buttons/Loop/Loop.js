import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loopSong, nextSong, play, prevSong, setSrc } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './Loop.css';

//TODO: FIX
class Loop extends Component{
    constructor(props){
        super(props);
        this.loop=this.loop.bind(this);
        this.playNext=this.playNext.bind(this);
        this.state={
            alreadyAdded: false
        }
    }

    async loop(){
        let { loopSong } = this.props;

        await loopSong();

        if(this.props.loop){
            if(this.props.alreadyAdded){
                this.props.audio.removeEventListener('ended', this.playNext);
            }
        }else{
            this.props.audio.addEventListener('ended', this.playNext);
            this.setState({
                alreadyAdded: true
            });
        }
    }

    async playNext(){
        await this.props.nextSong();

        let currSrc = this.props.songList[this.props.songNumber].file_url.split(" ").join("%20");
        if(this.props.src !== currSrc){
            await this.props.setSrc(currSrc);
        }

        this.props.play();
    }

    render(){
        return(
            <button className="loop" onClick={this.loop}>{this.props.loop ? <Icon className="active" type="retweet" /> : <Icon type="retweet" />}</button>
        );
    }
}

Loop.propTypes={
    audio: PropTypes.object,
    loop: PropTypes.bool,
    src: PropTypes.string,
    songList: PropTypes.array,
    songNumber: PropTypes.number
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    loop: state.music.loop,
    src: state.music.src,
    songList: state.music.songList,
    songNumber: state.music.songNumber
});

const mapDispatchToProps = dispatch => ({
    loopSong: () => {
        dispatch(loopSong());
    },
    play: () => {
        dispatch(play());
    },
    nextSong: () => {
        dispatch(nextSong());
    },
    prevSong: () => {
        dispatch(prevSong());
    },
    setSrc: (src) => {
        dispatch(setSrc(src));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Loop);