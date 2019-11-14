import React, { Component } from 'react'
// 导入样式
import styles from './index.module.scss'
// 导入路由
import { Link } from 'react-router-dom'
// 导入ui
import { Carousel, Flex } from 'antd-mobile'
// 导入基地址
import { BASEURL } from '../../utils/url'

// 通过模块化的方式导入图片---本地图片必须通过这种方式
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

export default class Index extends Component {
  // 定义模型---把数据交给模型才能渲染
  state = {
    swipers: null, // 轮播图
    imgHeight: 212 // 轮播图图片高度
  }
  navs = [
    { icon: image1, text: '整租', path: '/layout/houselist' },
    { icon: image2, text: '合租', path: '/layout/houselist' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]
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
      <Carousel autoplay infinite className={styles.swiper}>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href={'http://www.alipay.com'}
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

  // 渲染导航菜单
  renderNavs = () => {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => {
          return (
            <Flex.Item key={item.text}>
              <Link to={item.path}>
                <img src={item.icon} alt="" />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 渲染轮播图 */}
        {this.state.swipers && this.renderSwiper()}
        {/* 渲染导航菜单 */}
        {this.renderNavs()}
      </div>
    )
  }
}
