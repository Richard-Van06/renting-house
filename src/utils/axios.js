import {Component} from 'react'
import axios from 'axios'
// 导入基准路径
import { BASEURL } from './url'

// 设置基准路径
axios.defaults.baseURL = BASEURL

// 把axios 挂载到  组件(Component)  的原型上
Component.prototype.http = axios