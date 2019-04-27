/* eslint-disable no-useless-constructor */
import React, {Component} from "react"
import {connect} from "react-redux"
import * as ActionTypes from "./../../store/config/actionTypes"
import thunk from "./../../store/thunk"
import { Menu, Dropdown } from 'antd';
import {Link} from "react-router-dom"

class HeadBar extends Component{
    constructor (props) {
        super(props);
    }
    initRightMenu(){
      const {logout} = this.props
      return (
        <Menu className={"head-dropdown"}>
          <Menu.Item>
            <Link to={"/"}>首页</Link>
          </Menu.Item>
          <Menu.Item onClick={logout}>退出登录</Menu.Item>
        </Menu>
      )
    }
    render(){
      const {sidebarOpen, toggleSide, username, appName,avatar} = this.props
      return(
        <div className="head-tool">
          <div className={"side-switch " + (sidebarOpen ? 'trans-rotate' : '')} onClick={toggleSide} >
            <i className={"iconfont icon-bars"} />
          </div>
          <div className={"app-name"}>{appName}</div>
          <div className={"right-menu"}>
            <div className={"right-menu-item blod"}>欢迎您: {username}</div>
            <Dropdown
                overlay={this.initRightMenu()}
                trigger={["click"]}
                className={"right-menu-item hover-effect avatar-container"}>
              <div className="avatar-wrapper">
                <img src={avatar || '/imgs/base_avatar.png' } className="user-avatar"/>
                <i className="iconfont icon-xialaxuanze"/>
              </div>

            </Dropdown>
          </div>
        </div>
      )
    }
}

const headBarConnect = connect(
  (state) => ({
    sidebarOpen: state.app.sidebarOpen,
    theme: state.app.theme,
    appName: state.app.appName,
    username: state.user.name,
    avatar: state.user.avatar
  }),
  (dispatch, props) => {
    return {
      toggleSide: (...arg) => dispatch(thunk(ActionTypes.ToggleSidebar, ...arg)),
      logout: (...arg) => dispatch(thunk(ActionTypes.InvalidToken, ...arg))
    }
  }
)

export default headBarConnect(HeadBar)