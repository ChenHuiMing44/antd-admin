/* eslint-disable no-useless-constructor */
import React, {Component} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import * as ActionTypes from "./../../store/config/actionTypes"
import thunk from "./../../store/thunk"
import { withRouter } from "react-router"
import path from "path"

function getRouteWithPath(routes, basePath ="/" , routePath) {
  for(let i in routes){
    let route = routes[i];
    const tagPath = path.resolve(basePath, route.path)
    if (tagPath === routePath && (!route.meta || !route.meta.noCache) && route.name) {
      return {
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      }
    }
    if (route.children) {
      let childRoute = getRouteWithPath(route.children, route.path, routePath);
      if(childRoute){
        return childRoute
      }
    }
  }
  return ""
}

class TagsBar extends Component{
    constructor (props) {
      super(props);
    }
    isActive(route) {
      return route.path === this.props.location.pathname
    }
    componentDidMount(){
      this.initTags()
      this.props.history.listen(() => {
        console.log(2222222);
        setTimeout(() => {
          let {routes,location, addTag} = this.props;
          let tag = getRouteWithPath(routes, "/", location.pathname);
          if(tag){
            addTag(tag)
            this.forceUpdate();
          }
        })
      })
    }


    componentDidUpdate(){

    }
    closeSelectedTag(tag){

    }
    // addTags
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.fixTag) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }

    initTags(){
      const fixTags = this.filterAffixTags(this.props.routes);
      for(const tag of fixTags){
        if(tag.name){
          this.props.addTag(tag)
        }
      }
    }
    render(){
        const {visitedViews} = this.props;
        return(
          <div className={"tag-container"}>
            <div className={"scroll-out"}>
              <div className={"scroll-in"}>
                {
                  visitedViews.map(
                    tag => (
                      <Link
                          key={tag.path}
                          className={'tags-view-item ' + (this.isActive(tag) ? 'active' : '')}
                          to={{ path: tag.path, query: tag.query}}
                          onClick={this.closeSelectedTag(tag)}
                      >
                        {tag.name}
                        { (tag.meta && !tag.meta.fixTag) &&
                        (<span className={"icon-close"} onClick={this.closeSelectedTag(tag)}/>)
                        }
                      </Link>
                    )
                  )
                }
              </div>
            </div>
          </div>
        )
    }
}
const TagBarConnect = connect(
  state => ({
    visitedViews: state.tag.visitedViews,
    routes: state.permission.routes
  }),
  (dispatch, props) => {
    return {
      deleteTag: (...arg) => dispatch(thunk(ActionTypes.DEL_TAG_VIEW, ...arg)),
      addTag: (...arg) => {dispatch(thunk(ActionTypes.ADD_TAG_VIEW, ...arg))},
    }
  }
)

export default withRouter(TagBarConnect(TagsBar))