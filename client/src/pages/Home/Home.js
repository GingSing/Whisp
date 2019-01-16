import React, { Component } from 'react';
import { Input, Icon } from 'antd';

import 'antd/dist/antd.css';
import './Home.css';

class Home extends Component{
    render(){
        return(
            <div className="home">
                <div className="homeContent">
                    <h1>Whisp</h1>
                    <Input.Search className="homeInput" placeholder="Input Youtube Link" enterButton={<Icon type="cloud-download" />}/>
                </div>
            </div>
        );
    }
}

export default Home;