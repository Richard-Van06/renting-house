import React, { Component } from 'react'
// 导入样式
import styles from './index.module.scss'
// 导入路由
import { Link } from 'react-router-dom'
// 导入ui
import { Carousel, Flex, Grid } from 'antd-mobile'
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
    imgHeight: 212, // 轮播图图片高度
    groups: null, //租房小组
    news: null //最新资讯
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
    // 获取租房小组的数据
    this.getGroupsData()
    // 获取资讯的数据
    this.getNewsData()
  }

  // 获取轮播图数据的 方法
  getSwiperData = async () => {
    const result = await this.http.get('/home/swiper')
    // console.log(result)
    this.setState({
      swipers: result.data.body
    })
  }

  // 获取租房小组数据
  getGroupsData = async () => {
    const result = await this.http.get(
      '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    )
    // console.log(result)
    this.setState({
      groups: result.data.body
    })
  }

  // 获取最新资讯的数据
  getNewsData = async () => {
    const result = await this.http.get(
      '/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )
    console.log(result)
    this.setState({
      news: result.data.body
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

  // 渲染租房小组
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex>
          <Flex.Item>
            <span className={styles.title}>租房小组</span>
          </Flex.Item>
          <Flex.Item align="end">
            <span>更多</span>
          </Flex.Item>
        </Flex>
        {/* 下方宫格 */}
        <Grid
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={dataItem => {
            return (
              <div className={styles.navItem} key={dataItem.id}>
                <div className={styles.left}>
                  <p>{dataItem.title}</p>
                  <p>{dataItem.desc}</p>
                </div>
                <div className={styles.right}>
                  <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }

  // 渲染最新资讯
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新资讯</h3>
        {
          this.state.news.map(item => {
            return <div className={styles.newsItem} key={item.id}>
              {/* 左边内容 */}
              <div className={styles.imgWrap}>
                <img src={`${BASEURL}${item.imgSrc}`} alt=""/>
              </div>
              {/* 右边内容 */}
              <div>
                <Flex className={styles.content} direction="column" justify="between">
                  <p className={styles.title}>{item.title}</p>
                  <Flex justify="between" className={styles.info}>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </Flex>
                </Flex>
              </div>
            </div>
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 渲染轮播图 */}
        {this.state.swipers && this.renderSwiper()}
        {/* 渲染导航菜单 */}
        {this.renderNavs()}
        {/* 渲染租房小组 */}
        {this.state.groups && this.renderGroups()}
        {/* 渲染最新资讯 */}
        {this.state.news && this.renderNews()}
      </div>
    )
  }
}
