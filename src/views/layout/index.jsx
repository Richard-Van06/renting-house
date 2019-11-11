import React, { Component } from 'react'

// 导入react-router-dom
import { Redirect, Route, Link } from 'react-router-dom'
// 导入子组件
import Home from '../home'
import My from '../my'
import Info from '../info'
import HouseList from '../houselist'

export default class Index extends Component {
  render() {
    return (
      <div>
        {/* 内容部分 */}
        <div>
          <Route path="/layout/home" component={Home} />
          <Route path="/layout/houselist" component={HouseList} />
          <Route path="/layout/info" component={Info} />
          <Route path="/layout/my" component={My} />
          <Redirect exact from="/layout" to="/layout/home" />
        </div>
        {/* 底部通栏 */}
        <div style={{position:'fixed',bottom:0,left:0,width:'100%'}}>
          <Link to='/layout/home'>首页</Link>
          <Link to='/layout/houselist'>找房子</Link>
          <Link to='/layout/info'>资讯</Link>
          <Link to='/layout/my'>我的</Link>
        </div>
      </div>
    )
  }
}
