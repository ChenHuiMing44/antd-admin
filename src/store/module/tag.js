import {ADD_TAG_VIEW, DEL_TAG_VIEW} from "../config/actionTypes"

export default {
  state: {
    visitedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, {view}) => {
      if (state.visitedViews.some(v => v.path === view.path)) return state
      state.visitedViews.push(
        Object.assign({}, view, {
          name: view.name || 'no-name'
        })
      )
      return state
    },
    DEL_VISITED_VIEW: (state, {view}) => {
	    for (const [i, v] of state.visitedViews.entries()) {
		    if (v.path === view.path) {
			    state.visitedViews.splice(i, 1)
			    break
		    }
	    }
      //react 没有深层次的监听，故而这里如果不这样写
      //删除页面会导致指针不变从而导致页面不刷新
      state.visitedViews = [...state.visitedViews]
      return state
    }
  },
  actions: {
    [ADD_TAG_VIEW]: ({dispatch}, view) =>{
      dispatch({
        type: "ADD_VISITED_VIEW",
        view
      })
    },
    [DEL_TAG_VIEW]: ({dispatch}, view) => {
      dispatch({
        type: "DEL_VISITED_VIEW",
        view
      })
    }
  }

}