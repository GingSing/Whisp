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
        const { Header, Content, Footer, Sider } = Layout;
        const SubMenu = Menu.SubMenu;
        let { collapsed } = this.state;
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
                    <Menu.Item>
                        <Link to ="/playlists/:name">
                            <Icon type="read" />
                            <span>Playlists</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default NavBar;