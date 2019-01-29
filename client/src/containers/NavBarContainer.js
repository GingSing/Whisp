import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { getUserInfo, addPlaylist } from '../_actions/UserActions';
import { NavBar } from '../components';

class NavBarContainer extends Component{
    constructor(props){
        super(props);
        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            playlistName:''
        }
    }

    componentWillMount(){
        this.props.getUserInfo();
    }

    showModal(playlistName){
        this.setState({
            visible: true,
            playlistName: playlistName
        });
    }

    async handleOk(){
        let { addPlaylist } = this.props;
        this.setState({
            visible: false
        }, addPlaylist(this.state));
    }

    handleCancel(){
        this.setState({
            visible: false,
            playlistName: ''
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render(){
        let style = {
            display: "flex",
            justifyContent: "center"
        }
        return(
            <React.Fragment>
                <NavBar showModal={this.showModal} addPlaylist={this.props.addPlaylist} playlists={this.props.playlists ? this.props.playlists : []} />
                <Modal
                style={style}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                    <span>Playlist Name:</span>
                    <br/>
                    <input name="playlistName"  onChange={this.handleChange}/>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    playlists: state.user.playlists,
    addingPlaylist: state.user.addingPlaylist
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => {
        dispatch(getUserInfo());
    },
    addPlaylist: (state) => {
        let {playlistName} = state;
        dispatch(addPlaylist(playlistName));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);