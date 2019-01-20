import React, { Component } from 'react';
import { downloadSong } from '../_actions/YoutubeActions';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { YoutubeInput } from '../components';

import 'antd/dist/antd.css';

class YoutubeInputContainer extends Component{
    constructor(props){
        super(props);
        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            visible: false,
            name: '',
            artist: '',
            url: '',
        }
    }

    showModal(input){
        this.setState({
            visible: true,
            url: input
        })
    }

    handleOk(){
        let { downloadSong } = this.props;
        this.setState({
            visible: false
        }, downloadSong(this.state));
    }

    handleCancel(){
        this.setState({
            visible: false,
            name: '',
            artist: '',
            url: ''
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <React.Fragment>
                <YoutubeInput showModal={this.showModal} />
                <Modal
                    title="Meta Data"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <span>Artist: </span>
                    <input name="artist" onChange={this.handleChange}/>
                    <span>Song Name: </span>
                    <input name="name" onChange={this.handleChange} />
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    downloadSong: (state) => {
        let { url, name, artist } = state;
        dispatch(downloadSong(url, name, artist));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeInputContainer);