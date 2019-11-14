import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

function SearchHeader({cityName,history}) {
  return (
    <div className={styles.root}>
      <Flex>
        <Flex
          className={styles.searchLeft}
          onClick={() => history.push('/citylist')}
        >
          <div className={styles.location}>
            <span>{cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={styles.searchForm}>
            <i className="iconfont icon-search"></i>
            <span>请输入小区或地址</span>
          </div>
        </Flex>
        <i className="iconfont icon-map" onClick={()=>history.push('/map')}></i>
      </Flex>
    </div>
  )
}

// 设定输入的格式
SearchHeader.protoTypes = {
  cityName: PropTypes.string.isRequired
}
export default withRouter(SearchHeader)
