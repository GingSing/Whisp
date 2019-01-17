import React, { Component } from 'react';
import { MusicFeedContainer } from '../../containers';

import './Songs.css';

class Songs extends Component{
    render(){
        return(
            <div className="songs">
                <MusicFeedContainer />
            </div>
        )
    }
}

export default Songs;