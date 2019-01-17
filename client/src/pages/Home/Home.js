import React, { Component } from 'react';
import { YoutubeInputContainer } from '../../containers';

import './Home.css';

class Home extends Component{
    render(){
        return(
            <div className="home">
                <div className="homeContent">
                    <h1 className="homeTitle">Whisp</h1>
                    <YoutubeInputContainer />
                </div>
            </div>
        );
    }
}

export default Home;