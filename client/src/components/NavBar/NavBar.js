import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';

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
        let { playlists } = this.props;
        console.log(playlists);
        return(
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
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
                            playlists && playlists.map((playlist,key) => {
                                return (
                                <Menu.Item key={key}>
                                    <Link to={`/playlists/${playlist.name}`}>
                                        <Icon type="book" />
                                        <span>{playlist.name}</span>
                                    </Link>
                                </Menu.Item>
                                );
                            })
                        }
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default NavBar;