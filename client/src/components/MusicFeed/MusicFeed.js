import React, { Component } from 'react';
import { Icon, Dropdown, Button, Menu } from 'antd';
import PropTypes from 'prop-types';

import 'antd/lib/date-picker/style/css'; 
import './MusicFeed.css';

class MusicFeed extends Component{

    render(){
        let { songList, handleClick, playSong } = this.props;
        return(
            <div className="musicFeed">
                <ul className="musicFeedList">
                    <li>
                        <div className="listTopics">
                            <span></span>
                            <span>Name</span>
                            <span>Artist</span>
                            <span>Length</span>
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
                                    playSong={playSong}/>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

const FeedCard = ({data, songNumber, songList, handleClick, playSong}) => {
    let { name, artist, length_seconds } = data;
    return(
        <div className="feedCardContainer">
            <button className="feedCardPlay" onClick={() => {playSong(songNumber, songList)}}>{<Icon type="caret-right" />}</button>
            <div className="feedCard" onClick={() => {handleClick(songNumber, songList)}}>
                <span>{name} </span>
                <span>{artist} </span>
                <span>{length_seconds}</span>
            </div>
            <Dropdown overlay={FeedCardMenu} placement="topLeft"><Button>...</Button></Dropdown>
        </div>
    );
}

const FeedCardMenu = (
    <Menu>
        <Menu.Item>
            Add To Favorites
        </Menu.Item>
        <Menu.Item>
            Add To Playlist 
        </Menu.Item>
    </Menu>
)

MusicFeed.propTypes={
    songList: PropTypes.array,
    handleClick: PropTypes.func,
    playSong: PropTypes.func,
    paused: PropTypes.bool
}

FeedCard.propTypes={
    data: PropTypes.object,
    songNumber: PropTypes.number,
    songList: PropTypes.array,
    handleClick: PropTypes.func,
    playSong: PropTypes.func,
    paused: PropTypes.bool
}

export default MusicFeed;