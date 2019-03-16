import React, { Component } from 'react';
import { getSongList } from '../_actions/SongListActions';
import { setSong, setSrc, play, pause, setVolume } from '../_actions/MusicPlayerActions';
import { addSongToFavorites, addSongToPlaylist } from '../_actions/UserActions';
import { connect } from 'react-redux';
import { MusicFeed } from '../components';
import { Icon } from 'antd'

import 'antd/dist/antd.css';

class MusicFeedContainer extends Component{
    constructor(props){
        super(props);
        this.playSong=this.playSong.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    componentWillMount(){
        this.props.getSongList();
    }

    handleClick(songNumber, songList){
        this.props.setSong(songNumber, songList);
    }

    async playSong(songNumber, songList){
        let { audio, setVolume, play, setSong, setSrc } = this.props;
        await setSong(songNumber, songList);
        let currSrc = "/" + songList[songNumber].file_url.split(" ").join("%20");
        if(audio.src !== currSrc){
            await setSrc(currSrc);
        }
        play();
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
            <div className="musicFeedContainer" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                {
                    this.props.gettingSongList ? 
                    <Icon 
                        style={{fontSize: 100, marginTop: '30vh'}} 
                        type="loading" 
                        spin 
                    /> 
                    : 
                    <MusicFeed 
                        songList={this.props.songList} 
                        handleClick={this.handleClick} 
                        playSong={this.playSong}
                        playlists={this.props.playlists}
                        addSongToFavorites={this.props.addSongToFavorites}
                        addSongToPlaylist={this.props.addSongToPlaylist}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    currentSongList: state.music.songList,
    songList: state.songList.songList,
    songNumber: state.music.songNumber,
    gettingSongList: state.songList.gettingSongList,
    userVolume: state.music.userVolume,
    playlists: state.user.playlists
})

const mapDispatchtoProps = dispatch => ({
    play: () => {
        dispatch(play());
    },
    pause: () => {
        dispatch(pause());
    },
    getSongList: () => {
        dispatch(getSongList());
    },
    setSong: (songNumber, songList) => {
        dispatch(setSong(songNumber, songList));
    },
    setSrc: (src) => {
        dispatch(setSrc(src));
    },
    setVolume: (volume) => {
        dispatch(setVolume(volume));
    },
    addSongToFavorites: (songId) => {
        dispatch(addSongToFavorites(songId));
    },
    addSongToPlaylist: (songId, playlistName) =>{
        dispatch(addSongToPlaylist(songId, playlistName));
    }

})

export default connect(mapStateToProps, mapDispatchtoProps)(MusicFeedContainer);