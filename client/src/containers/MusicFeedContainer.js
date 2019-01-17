import React, { Component } from 'react';
import { getSongList } from '../_actions/SongListActions';
import { setSong } from '../_actions/MusicPlayerActions';
import { connect } from 'react-redux';

import { MusicFeed } from '../components';

class MusicFeedContainer extends Component{
    componentWillMount(){
        this.props.getSongList();
    }

    handleClick(songId){
        this.props.setSong(songId);
    }

    render(){

        let style = {
            width: "100%",
        }

        return(
            <div className="musicFeedContainer" style={style}>
                <MusicFeed songList={this.props.songList} handleClick={this.handleClick.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    songList: state.songList.songList
})

const mapDispatchtoProps = dispatch => ({
    getSongList: () => {
        dispatch(getSongList());
    },
    setSong: (songId) => {
        dispatch(setSong(songId));
    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(MusicFeedContainer);