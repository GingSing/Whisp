import React, { Component } from 'react';
import { Home, Playlist, Songs } from '../../pages';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from '../../components';
import './Page.css';

class Page extends Component{
    render(){
        return(
            <div className="page">
                <NavBar className="pageNav"/>
                <div className="pageChildren">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/songs" component={Songs} />
                        <Route path="/Playlist/:name" component={Playlist} />
                    </Switch>
                </div>
            </div>    
        );
    }
}

export default Page;