/* eslint-disable no-useless-constructor */import React, {Component} from "react"import {Router, Route, BrowserRouter, Switch, Redirect} from "react-router-dom"import CusLayout from "./../layout/CusLayout"import Login from "./../views/login/Login"import {connect} from "react-redux"class CusRouter extends Component {    constructor (props) {    	super(props)    }    render() {    	const {token} = this.props;        return (            <BrowserRouter>	            <Switch>		            <Route path={"/login"} component={Login} />		            <Route path={"/"} render={() => token ? <CusLayout />: <Redirect to={"/login"} />} />	            </Switch>            </BrowserRouter>        )    }}const routerIndexConnect = connect(	(state) => ({		token: state.user.token	}))export default routerIndexConnect(CusRouter)