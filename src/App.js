import React from 'react';
import './App.css';

// 导入react-router-dom
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

// 导入子组件
import Layout from './views/layout'
import Login from './views/login'
import CityList from './views/citylist'
import Map from './views/map'

// 404
function NotFound() {
  return <img alt="" src="http://img4.imgtn.bdimg.com/it/u=3931943102,1003751442&fm=26&gp=0.jpg" />
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/layout" component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Redirect exact from="/" to="/layout" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
