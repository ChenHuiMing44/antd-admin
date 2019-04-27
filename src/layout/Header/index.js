/* eslint-disable no-useless-constructor */
import React, {Component} from "react"
import HeadBar from "./HeadBar"
import TagsBar from "./TagsBar"


class Header extends Component{
    constructor (props) {
        super(props);
    }
    render(){
        return(
          <div className={"app-head"}>
            <div className={"nav-bar"}>
              <HeadBar/>
            </div>
            <div className={"tags-bar"}>
              <TagsBar/>
            </div>
          </div>
        )
    }
}
export default Header