/* eslint-disable no-useless-constructor */import React, {Component} from "react"import {Layout} from "antd"import Sidebar from "./Sidebar"import RouterMain from "./../router/RouterMain"import HeaderMain from "./Header"import "./layout.css"const {	Header, Sider, Content,} = Layout;class CusLayout extends Component {    constructor (props) {    	super(props)    }    render() {        return (	        <Layout>		        <Sider className={'side-box'}>			        <Sidebar/>		        </Sider>		        <Layout>			        <Header className={'layout-header'}>                <HeaderMain/>              </Header>			        <Content>				        <RouterMain/>			        </Content>		        </Layout>	        </Layout>        )    }}export default CusLayout