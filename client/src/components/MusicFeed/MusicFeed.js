import React, { Component } from 'react';
import { Icon } from 'antd';

import 'antd/lib/date-picker/style/css'; 
import './MusicFeed.css';

class MusicFeed extends Component{
    render(){
        let { songList, handleClick } = this.props;
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
                                <FeedCard data={data} handleClick={handleClick} songNumber={key} songList={songList}/>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

const FeedCard = ({data, songNumber, songList, handleClick}) => {
    let { name, artist, length_seconds } = data;
    return(
        <div className="feedCard" onClick={() => {handleClick(songNumber, songList)}}>
            <button><Icon type="caret-right" /></button>
            <span>{name} </span>
            <span>{artist} </span>
            <span>{length_seconds}</span>
        </div>
    );
}

export default MusicFeed;