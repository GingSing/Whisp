import React, { Component } from 'react';
import { Home, Playlist, Songs } from '../../pages';
import { Switch, Route } from 'react-router-dom';
import { MusicPlayerContainer, NavBarContainer } from '../../containers';
import './Page.css';

class Page extends Component{
    render(){
        return(
            <div className="page">
                <NavBarContainer className="pageNav"/>
                <div className="pageChildrenWrapper">
                    <div className="pageChildren">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/songs" component={Songs} />
                            <Route path="/playlists/:key" component={Playlist} />
                        </Switch>
                        
                        <MusicPlayerContainer className="musicPlayer" />
                    </div>
                </div>
            </div>    
        );
    }
}

export default Page;