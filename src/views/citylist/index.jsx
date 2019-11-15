import React, { Component } from 'react'

export default class Index extends Component {
  state = {
    cityObj: null, // 左边城市列表数据对象
    cityIndexList: null // 右边城市索引数据
  }

  // 发送请求的位置
  componentDidMount() {
    // 获取城市列表数据
    this.getCityListData()
  }

  // 获取数据
  getCityListData = async () => {
    const result = await this.http.get('/area/city?level=1')
    // console.log(result)
    // 遍历服务端返回的数据
    const tempObj = {} // 临时对象  处理后赋值给state中的cityObj
    result.data.body.forEach(item => {
      // console.log(item)
      const fristLetter = item.short.substring(0, 1)
      // console.log(fristLetter)
      // 判断该首字母是否已经拥有数据, 如果有数据, 则用push, 否则把它放到一个数组中
      if (tempObj[fristLetter]) {
        tempObj[fristLetter].push(item)
      } else {
        tempObj[fristLetter] = [item]
      }
    })

    // 处理右边城市的索引
    const cityIndexList = Object.keys(tempObj).sort()

    // 获取热门城市数据
    const hotResult = await this.http.get('/area/hot')
    // 取出热门城市数据
    const hotCityList = hotResult.data.body
    // 处理热门城市 右边的数据
    cityIndexList.unshift('hot')
    // 处理左边的数据
    tempObj['hot'] = hotCityList
  }

  render() {
    return <div>城市 列表</div>
  }
}
