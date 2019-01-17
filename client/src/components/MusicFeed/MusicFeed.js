import React, { Component } from 'react';
import './MusicFeed.css';

class MusicFeed extends Component{
    render(){
        let { songList, handleClick } = this.props;
        return(
            <div className="musicFeed">
                <ul className="musicFeedList">
                    <li>
                        <div className="listTopics">
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
    return(
        <div className="feedCard" onClick={() => {handleClick(songNumber, songList)}}>
            <span>{data.name} </span>
            <span>{data.artist} </span>
            <span>{data.length_seconds}</span>
        </div>
    );
}

export default MusicFeed;