import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import './NavBar.css';

class NavBar extends Component{
    constructor(props){
        super(props);
        this.onCollapse=this.onCollapse.bind(this);
        this.state={
            collapsed: false
        }
    }

    onCollapse=(collapsed) => {
        this.setState({collapsed});
    }

    render(){
        const { Sider } = Layout;
        const SubMenu = Menu.SubMenu;
        let { collapsed } = this.state;
        let { playlists, showModal } = this.props;
        return(
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={['-1']} mode="inline">
                    <Menu.Item key="-1">
                        <Link to="/">
                            <Icon type="home" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/songs">
                            <Icon type="customer-service" />
                            <span>Songs</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu title={
                        <span>
                            <Icon type="read" />
                            <span>Playlists</span>
                        </span>}>
                        {
                            playlists && playlists.map((playlist, key) => {
                                return (
                                <Menu.Item key={key}>
                                    <Link to={`/playlists/${key}`}>
                                        <Icon type="book" />
                                        <span>{playlist.name}</span>
                                    </Link>
                                </Menu.Item>
                                );
                            })
                        }
                        <Menu.Item onClick={showModal}>
                            <Icon type="plus-square" />
                            <span className="addPlaylist">Add Playlist</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

NavBar.propTypes = {
    playlists: PropTypes.array
}

export default NavBar;