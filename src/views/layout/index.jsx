import React, { Component } from "react";

// 导入react-router-dom
import { Redirect, Route } from "react-router-dom";
// 导入子组件
import Home from "../home";
import My from "../my";
import Info from "../info";
import HouseList from "../houselist";

// 导入样式
import styles from "./index.module.scss";

// 导入ui
import { TabBar } from "antd-mobile";

export default class Index extends Component {
  state = {
    selectedTab: "/layout/home"
  };

  // tabs数组
  TABS = [
    {
      title: "首页",
      icon: "icon-index",
      path: "/layout/home"
    },
    {
      title: "找房",
      icon: "icon-findHouse",
      path: "/layout/houselist"
    },
    {
      title: "资讯",
      icon: "icon-info",
      path: "/layout/info"
    },
    {
      title: "我的",
      icon: "icon-my",
      path: "/layout/my"
    }
  ];
  /**
   * 如果是直接输入path  内容变了, 底下的tabs 也要变动
   * @param {*} prevProps 
   */
  componentDidUpdate(prevProps){
    // console.log(prevProps);
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  // 渲染下面的tabbar--底部通栏
  renderTabBar = () => {
    return (
      <TabBar tintColor="#0094ff" noRenderContent>
        {this.TABS.map(item => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`}></i>}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                // this.setState({
                //   selectedTab: item.path
                // });
                // 切换路由 内容发生改变
                if(this.state.selectedTab === item.path) return
                this.props.history.push(item.path)
              }}
            ></TabBar.Item>
          );
        })}
      </TabBar>
    );
  };
  render() {
    return (
      <div className={styles.layout}>
        {/* 内容部分, 使用嵌套路由 */}
        <Route path="/layout/home" component={Home} />
        <Route path="/layout/houselist" component={HouseList} />
        <Route path="/layout/info" component={Info} />
        <Route path="/layout/my" component={My} />
        <Redirect exact from="/layout" to="/layout/home" />
        {/* 底部通栏 */}
        <div className={styles.tabbar}>{this.renderTabBar()}</div>
      </div>
    );
  }
}
