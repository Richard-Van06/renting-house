import React, { Component } from 'react'

import { Button } from 'antd-mobile'

export default class Index extends Component {
  componentDidMount() {
    // 获取轮播图数据
    this.getSwiperDate()
  }

  // 获取轮播图数据的 方法
  getSwiperDate = async () => {
    const res = await this.http.get('/home/swiper')
    console.log(res)
  }
  render() {
    return (
      <div>
        这里是首页--home
        <Button type="warning">呵呵哈哈哈</Button>
      </div>
    )
  }
}
