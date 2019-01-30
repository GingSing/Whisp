import React, { Component } from 'react';
import { Icon, Dropdown, Menu} from 'antd';
import PropTypes from 'prop-types';

import 'antd/lib/date-picker/style/css'; 
import './MusicFeed.css';

const SubMenu = Menu.SubMenu;

class MusicFeed extends Component{
    render(){
        //isNotSongs checks if it is not song page to limit remove functionality
        let { songList, 
            playlists, 
            isNotSongs,
            songNumber,
            handleClick, 
            playSong, 
            addSongToPlaylist, 
            addSongToFavorites, 
            removeSongFromPlaylist,
            removeSongFromFavorites
             } = this.props;
        return(
            <div className="musicFeed">
                <ul className="musicFeedList">
                    <li>
                        <div className="listTopics">
                            <span></span>
                            <div className="listTopicNames">
                                <span>Name</span>
                                <span>Artist</span>
                                <span>Length</span>
                            </div>
                            <span>Options</span>
                        </div>
                    </li>
                    {
                        songList && songList.map((data, key) => {
                            return (
                            <li key={key}>
                                <FeedCard 
                                    data={data} 
                                    handleClick={handleClick} 
                                    songNumber={key} 
                                    songList={songList} 
                                    playSong={playSong}
                                    addSongToPlaylist={addSongToPlaylist}
                                    addSongToFavorites={addSongToFavorites}
                                    playlists={playlists}
                                    isNotSongs={isNotSongs}
                                    removeSongFromFavorites={removeSongFromFavorites}
                                    removeSongFromPlaylist={removeSongFromPlaylist}
                                    playlistNumber={songNumber}/>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

const FeedCard = (props) => {

    let {data, 
        songNumber, 
        songList, 
        handleClick, 
        playSong, 
        addSongToPlaylist, 
        addSongToFavorites, 
        playlists, 
        removeSongFromFavorites, 
        removeSongFromPlaylist, 
        isNotSongs,
        playlistNumber } = props;

    let { _id, 
        name, 
        artist, 
        length_seconds } = data;

    function timeFormatter(timeInSeconds){
        let minutes = Math.floor(timeInSeconds/60);
        let seconds = (timeInSeconds%60).toFixed(0);
        let secondsFixer = seconds > 10 ? seconds : "0" + seconds;
        return `${minutes}:${secondsFixer}`;
    }

    return(
        <div className="feedCardContainer">
            <button className="feedCardPlay" onClick={() => {playSong(songNumber, songList)}}>{<Icon type="caret-right" />}</button>
            <div className="feedCard" onClick={() => {handleClick(songNumber, songList)}}>
                <span>{name} </span>
                <span>{artist} </span>
                <span>{timeFormatter(length_seconds)}</span>
            </div>
            <Dropdown trigger={["click"]} overlay={()=>FeedCardMenu(_id, addSongToPlaylist, addSongToFavorites, playlists, removeSongFromPlaylist, removeSongFromFavorites, isNotSongs, playlistNumber)} placement="bottomLeft"><span>...</span></Dropdown>
        </div>
    );
}

const FeedCardMenu = (songId, addSongToPlaylist, addSongToFavorites, playlists, removeSongFromPlaylist, removeSongFromFavorites, isNotSongs, playlistNumber) => {
    return (
        <Menu>
            { isNotSongs ? null :
                <Menu.Item>
                    <button className="feedCardMenuBtn" onClick={() => {addSongToFavorites(songId)}}>Add To Favorites</button>
                </Menu.Item>
            }
            { isNotSongs ? null :
                <SubMenu title="Add To Playlist">
                    {playlists && playlists.map((playlist, key) => {
                        return <Menu.Item key={key} onClick={() => {addSongToPlaylist(songId, playlist.name)}}>
                            {playlist.name}
                        </Menu.Item>
                    })}
                </SubMenu>
            }
            { isNotSongs ?
                <Menu.Item>
                    <button className="feedCardMenuBtn" onClick={() => {removeSongFromPlaylist(songId, playlists[playlistNumber].name)}}>Remove From List</button>
                </Menu.Item> : null
            }
        </Menu>
    );
}

MusicFeed.propTypes={
    songList: PropTypes.array,
    handleClick: PropTypes.func,
    playSong: PropTypes.func,
    paused: PropTypes.bool,
    playlists: PropTypes.array,
    addSongToPlaylist: PropTypes.func,
    addSongToFavorites: PropTypes.func
}

FeedCard.propTypes={
    songNumber: PropTypes.number,
    songList: PropTypes.array,
    handleClick: PropTypes.func,
    playSong: PropTypes.func,
    paused: PropTypes.bool,
    playlists: PropTypes.array,
    addSongToFavorites: PropTypes.func,
    addSongToPlaylist: PropTypes.func
}

export default MusicFeed;