import React, { Component } from 'react';
import './MusicFeed.css';

class MusicFeed extends Component{
    render(){
        let { songList, handleClick } = this.props;
        return(
            <div className="musicFeed">
                <ul className="musicFeedList">
                    {
                        songList && songList.map((data, key) => {
                            return (
                            <li key={key}>
                                <FeedCard data={data} handleClick={handleClick}/>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

const FeedCard = ({data, handleClick}) => {
    return(
        <div className="feedCard" onClick={() => {handleClick(data._id)}}>
            <span>Name: {data.name} </span>
            <span>Artist: {data.artist} </span>
            <span>Length: {data.length_seconds}</span>
        </div>
    );
}

export default MusicFeed;