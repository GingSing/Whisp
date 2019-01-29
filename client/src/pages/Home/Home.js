import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YoutubeInputContainer } from '../../containers';

import './Home.css';

class Home extends Component{
    render(){
        let { metaData } = this.props;
        return(
            <div className="home">
                <div className="homeContent">
                    <h1 className="homeTitle">Whisp</h1>
                    <YoutubeInputContainer />
                    {/* make this into a list so that it can show multiple */}
                    { metaData ? 
                    <div className="downloading">
                        <span>Title: {metaData.title}</span>
                        <span>Author: {metaData.author_name}</span>
                        <span>url: {metaData.url}</span>
                        <img src={metaData.thumbnail_url} alt=""/>
                    </div> : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    metaData: state.youtube.metaData
});

export default connect(mapStateToProps)(Home);