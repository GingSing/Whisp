import React, { Component } from 'react';
import { PlaylistFeedContainer } from '../../containers';
import './Playlist.css';

class Playlist extends Component{
    render(){
        let { key } = this.props.match.params;
        return(
            <div className="playlist"> 
                <PlaylistFeedContainer songNumber={key}/>
            </div>
        );
    }
}

export default Playlist;