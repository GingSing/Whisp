import React, { Component } from 'react';
import { Icon, Dropdown, Menu} from 'antd';
import PropTypes from 'prop-types';

import 'antd/lib/date-picker/style/css'; 
import './MusicFeed.css';

const SubMenu = Menu.SubMenu;

class MusicFeed extends Component{

    render(){
        let { songList, handleClick, playSong, addSongToPlaylist, addSongToFavorites, playlists } = this.props;
        return(
            <div className="musicFeed">
                <ul className="musicFeedList">
                    <li>
                        <div className="listTopics">
                            <span></span>
                            <div className="listTopicNames">
                                <span>Name</span>
                                <span>Artist</span>
                                <span>Length(s)</span>
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
                                    playlists={playlists}/>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

const FeedCard = ({data, songNumber, songList, handleClick, playSong, addSongToPlaylist, addSongToFavorites, playlists}) => {
    let { _id, name, artist, length_seconds } = data;
    return(
        <div className="feedCardContainer">
            <button className="feedCardPlay" onClick={() => {playSong(songNumber, songList)}}>{<Icon type="caret-right" />}</button>
            <div className="feedCard" onClick={() => {handleClick(songNumber, songList)}}>
                <span>{name} </span>
                <span>{artist} </span>
                <span>{length_seconds}</span>
            </div>
            <Dropdown trigger={["click"]} overlay={()=>FeedCardMenu(_id, addSongToPlaylist, addSongToFavorites, playlists)} placement="bottomLeft"><span>...</span></Dropdown>
        </div>
    );
}

const FeedCardMenu = (songId, addSongToPlaylist, addSongToFavorites, playlists) => {
    return (
        <Menu>
            <Menu.Item>
                <button className="favoritesBtn" onClick={() => {addSongToFavorites(songId)}}>Add To Favorites</button>
            </Menu.Item>
            <SubMenu title="Add To Playlist">
                {playlists && playlists.map((playlist, key) => {
                    return <Menu.Item key={key} onClick={() => {addSongToPlaylist(songId, playlist.name)}}>
                        {playlist.name}
                    </Menu.Item>
                })}
            </SubMenu>
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
    data: PropTypes.object,
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