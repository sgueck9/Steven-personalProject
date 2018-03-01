import React, { Component } from 'react';
import './reset.css'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import StoreHome from './components/StoreHome/StoreHome'
import MyCart from './components/MyCart/MyCart'
import Checkout from './components/Checkout/Checkout';



class App extends Component {
  render() {
    return (
      <Switch>
        
       
        <Route exact path='/' component={Home}/>
        <Route path='/storehome' component={StoreHome}/>
        <Route path='/mycart' component={MyCart}/>
        <Route path='/checkout' component={Checkout}/>
        
      </Switch>
    );
  }
}

export default App;
