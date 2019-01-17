import React, { Component } from 'react';
import { Input, Icon } from 'antd';

import 'antd/dist/antd.css';
import './YoutubeInput.css';

class YoutubeInput extends Component{
    render(){
        let { showModal } = this.props;
        return(
            <Input.Search className="youtubeInput" placeholder="Input Youtube Link" onSearch={input => {showModal(input)}} enterButton={<Icon type="cloud-download" />}/>
        );
    }
}

export default YoutubeInput;