// import * as actionTypes from "./config/actionTypes"import initStore from "./initStore"export default function (type, ...arg) {	// debugger	if(type && initStore.actions[type]){		return async (dispatch, getState) => {			initStore.actions[type]({dispatch, getState}, ...arg);		}	}	//其必须要返回一个异步函数	return async () => {};}