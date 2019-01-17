import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../_actions/UserActions';
import { NavBar } from '../components';

class NavBarContainer extends Component{

    componentWillMount(){
        this.props.getUserInfo();
    }

    render(){
        console.log(this.props.userInfo);
        return(
            <NavBar playlists={this.props.userInfo ? this.props.userInfo.playlists : []} />
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.user.userInfo
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => {
        dispatch(getUserInfo());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);