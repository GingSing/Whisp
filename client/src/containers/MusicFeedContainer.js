import React, { Component } from 'react';
import { getSongList } from '../_actions/SongListActions';
import { setSong } from '../_actions/MusicPlayerActions';
import { connect } from 'react-redux';

import { MusicFeed } from '../components';

class MusicFeedContainer extends Component{
    componentWillMount(){
        this.props.getSongList();
    }

    handleClick(songNumber, songList){
        this.props.setSong(songNumber, songList);
    }

    render(){

        return(
            <React.Fragment>
                <MusicFeed songList={this.props.songList} handleClick={this.handleClick.bind(this)} />
            </React.Fragment>
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
    setSong: (songNumber, songList) => {
        dispatch(setSong(songNumber, songList));
    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(MusicFeedContainer);