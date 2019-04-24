import {getToken} from "../../utils/auth"// import ajax from "./../../script/ajax"import {GetUserInfo} from "../../config/requireUrls"import Utils from "./../../utils"import * as ActionTypes from "./../config/actionTypes"import thunk from "./../thunk"export default {	state: {		token: getToken(),		roles: [],		name: "1",		avatar: "1"	},	mutations: {		SET_TOKEN: (state, {token}) => {			state.token = token			return state		},		SET_ROLES: (state,{roles}) => {			// console.log(action);			// debugger			state.roles = roles			return state		},		SET_NAME: (state, {name}) => {			state.name = name			return state		},		SET_AVATAR: (state, {avatar}) => {			console.log(state);			debugger			state.avatar = avatar			return state		}	},	actions: {		[ActionTypes.LogBackByToken]: function ({dispatch}, token) {			Utils.storage().setItem("token", token);			dispatch({type: "SET_TOKEN", token});		},		/**		 * @2019/4/24		 * @author: huiming		 * desc:  请求用户信息		 */		[ActionTypes.RequireUserInfo]: function ({dispatch, getState}) {			// return new Promise((resolve, reject) => {			// 	ajax({urlInfo: GetUserInfo}).then(res => {			// 		if (res.ret.roles && res.ret.roles.length > 0) { // 验证返回的roles是否是一个非空数组			// 			dispatch({type: 'SET_ROLES', roles: res.ret.roles})			// 		} else {			// 			reject('getInfo: roles must be a non-null array!')			// 		}			// 		dispatch({type: 'SET_NAME', name: res.ret.name})			// 		dispatch({type: 'SET_AVATAR', avatar: res.ret.avatar})			// 		resolve(res.ret);			// 	}).catch(err => {			// 		reject(err)			// 	})			// }				let role = getState().token === "admin" ? "ADMIN" : "EDITOR";				setTimeout(() => {					dispatch({type: 'SET_ROLES', roles: [role]})					dispatch({type: 'SET_AVATAR', avatar: ""})					dispatch({type:'SET_NAME', name: "陈惠敏"})					// resolve({name: "陈惠敏", roles: [role], avatar: ""})					dispatch(thunk(ActionTypes.GenerateRoutes, [role]))				} ,500)		},		/**		 * @2019/4/24		 * @author: huiming		 * desc:  退出登录 或者token过期调用		 */		[ActionTypes.InvalidToken]: function ({dispatch}) {			//token过期 清除用户信息进入 login			dispatch({type: "SET_TOKEN", token: ""});			Utils.storage().removeItem("token");			window.location.reload();		}	}}