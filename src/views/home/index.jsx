import React, { Component } from 'react'

import styles from './index.module.scss'

import { Carousel } from 'antd-mobile'
import { BASEURL } from '../../utils/url'

export default class Index extends Component {
  // 定义模型---把数据交给模型才能渲染
  state = {
    swipers: null, // 轮播图
    imgHeight:212  // 轮播图图片高度
  }
  componentDidMount() {
    // 获取轮播图数据
    this.getSwiperData()
  }

  // 获取轮播图数据的 方法
  getSwiperData = async () => {
    const result = await this.http.get('/home/swiper')
    // console.log(result)
    this.setState({
      swipers: result.data.body
    })
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel
        autoplay
        infinite
        className={styles.swiper}
      >
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href={"http://www.alipay.com"}
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  
  render() {
    return (
      <div className={styles.root}>
        {this.state.swipers && this.renderSwiper()}
      </div>
    )
  }
}
