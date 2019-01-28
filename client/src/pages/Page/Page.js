import React, { Component } from 'react';
import { Home, Playlist, Songs, Favourites } from '../../pages';
import { Switch, Route } from 'react-router-dom';
import { MusicPlayerContainer, NavBarContainer } from '../../containers';
import './Page.css';

class Page extends Component{
    constructor(){
        super();
        this.audio = new Audio();
    }
    render(){
        return(
            <div className="page">
                <NavBarContainer className="pageNav"/>
                <div className="pageChildrenWrapper">
                    <div className="pageChildren">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/songs" component={Songs} />
                            <Route path="/favourites" component={Favourites} />
                            <Route path="/playlists/:key" component={Playlist} />
                        </Switch>
                        
                        <MusicPlayerContainer audio={this.audio} className="musicPlayer" />
                    </div>
                </div>
            </div>    
        );
    }
}

export default Page;