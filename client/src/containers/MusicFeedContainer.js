import React, { Component } from 'react';
import { getSongList } from '../_actions/SongListActions';
import { setSong } from '../_actions/MusicPlayerActions';
import { connect } from 'react-redux';
import { MusicFeed } from '../components';
import { Icon } from 'antd'

import 'antd/dist/antd.css';

class MusicFeedContainer extends Component{
    componentWillMount(){
        this.props.getSongList();
    }

    handleClick(songNumber, songList){
        this.props.setSong(songNumber, songList);
    }

    render(){
        return(
            <div className="musicFeedContainer">
                {
                    this.props.gettingSongList ? <Icon style={{fontSize: 100}} type="loading" spin /> : <MusicFeed songList={this.props.songList} handleClick={this.handleClick.bind(this)} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    playing: state.music.playing,
    paused: state.music.paused,
    songList: state.songList.songList,
    songNumber: state.music.songNumber,
    gettingSongList: state.songList.gettingSongList
})

const mapDispatchtoProps = dispatch => ({
    getSongList: () => {
        dispatch(getSongList());
    },
    setSong: (songNumber, songList) => {
        dispatch(setSong(songNumber, songList));
    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(MusicFeedContainer);