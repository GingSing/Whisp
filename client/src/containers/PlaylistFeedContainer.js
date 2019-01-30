import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSong } from '../_actions/MusicPlayerActions';
import { removeSongFromPlaylist } from '../_actions/UserActions';
import { MusicFeed } from '../components';

class PlaylistFeedContainer extends Component{

    handleClick(songNumber, songList){
        this.props.setSong(songNumber, songList);
    }

    render(){
        let { playlists, songNumber} = this.props;
        return(
            <React.Fragment>
                <MusicFeed songList={playlists ? playlists[songNumber].songs : null} handleClick={this.handleClick.bind(this)} {...this.props}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    playlists: state.user.playlists
});

const mapDispatchToProps = dispatch => ({
    setSong: (songNumber, songList) => {
        dispatch(setSong(songNumber, songList));
    },
    removeSongFromPlaylist: (songId, playlistName) => {
        dispatch(removeSongFromPlaylist(songId, playlistName));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistFeedContainer);