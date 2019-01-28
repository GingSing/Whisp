import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loopSong, nextSong, play, prevSong } from '../../../_actions/MusicPlayerActions';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './Loop.css';

class Loop extends Component{
    constructor(props){
        super(props);
        this.loop=this.loop.bind(this);
        this.state={
            alreadyAdded: false
        }
    }

    async loop(){
        let { loopSong } = this.props;

        await loopSong();

        if(this.props.loop){
            if(this.state.alreadyAdded){
                this.props.audio.removeEventListener('ended', async () => {
                    await this.props.nextSong();
                    this.props.play();
                });
            }
            this.props.audio.addEventListener('ended', () => {
                this.props.play();
            });
        }else{
            if(this.state.alreadyAdded){
                this.props.audio.removeEventListener('ended', () => {
                    this.props.play();
                });
            }
            this.props.audio.addEventListener('ended', async() => {
                await this.props.nextSong();
                this.props.play();
            });
        }
        !this.state.alreadyAdded && this.setState({
            alreadyAdded: true
        });
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Loop);