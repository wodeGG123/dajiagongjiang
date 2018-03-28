var path = require('path');

import React from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import { Button } from 'antd-mobile';

import Guider from 'rootsrc/components/pages/guider/index.js'
import Home from 'rootsrc/components/pages/home/index.js'
import ArticleInfo from 'rootsrc/components/pages/article/index.js'
import {ArticleList} from 'rootsrc/components/pages/article/index.js'
import Message from 'rootsrc/components/pages/message/index.js'
import Question from 'rootsrc/components/pages/question/index.js'
import WorkerInfo from 'rootsrc/components/pages/workerInfo/index.js'
import Order from 'rootsrc/components/pages/order/index.js'
import {MakeOrder,MakeSelfOrder} from 'rootsrc/components/pages/order/index.js'
import Mine from 'rootsrc/components/pages/mine/index.js'
import {MineIndex} from 'rootsrc/components/pages/mine/index.js'
import EditUser from 'rootsrc/components/pages/mine/editUser.js'
import OrderList from 'rootsrc/components/pages/mine/orderList.js'
import OrderInfo from 'rootsrc/components/pages/mine/orderInfo.js'
import OrderEstimate from 'rootsrc/components/pages/mine/orderEstimate.js'
import MyCoin from 'rootsrc/components/pages/mine/myCoin.js'
import MyCare from 'rootsrc/components/pages/mine/myCare.js'
import {MyCredit, MyEvaluate, MyLevel} from 'rootsrc/components/pages/mine/myValues.js'
import MyCoinControl from 'rootsrc/components/pages/mine/myCoinControl.js'
import {ApplyForWorker} from 'rootsrc/components/pages/mine/worker.js'
import WorkerManagement from 'rootsrc/components/pages/mine/worker.js'
import ApplyForIdentity from 'rootsrc/components/pages/mine/identity.js'
import User from 'rootsrc/components/pages/user/index.js'
import {Login, CodeLogin, Regist, RegistNext, GetPassword, GetPasswordNext} from 'rootsrc/components/pages/user/index.js'

import Index from 'rootsrc/components/pages/index/index.js'
import Search from 'rootsrc/components/pages/search/index.js'
import ContactUs from 'rootsrc/components/pages/contactUs/index.js'


class App extends React.Component{
	static contextTypes = {
		store:React.PropTypes.object
	}
	componentWillMount(){
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const userInfoDetail = JSON.parse(localStorage.getItem('userInfoDetail'));
		if(userInfo){
			this.context.store.dispatch({
				type:'SET_USERINFO',
				data:userInfo
			})
		}
		if(userInfoDetail){
			this.context.store.dispatch({
				type:'SET_USERINFO_DETAIL',
				data:userInfoDetail
			})
		}
	}
	render(){
		return(<div>{this.props.children}</div>)
	}
}




class MyRouter extends React.Component{
	constructor(props){
		super(props)	
	}
	render(){
		return(<Router history={hashHistory}>
		    <Route path="/" component={App}>
		    	<IndexRedirect to="guider" />
		    	<Route path="guider" component={Guider} />
		    	<Route path="home" component={Home}>
		    		<Route path="mine" component={Mine}>
						<Route path="index" component={MineIndex} />
						<Route path="editUser" component={EditUser} />
						<Route path="orderList" component={OrderList} />
						<Route path="orderInfo" component={OrderInfo} />
						<Route path="orderEstimate/:step" component={OrderEstimate} />
						<Route path="myCoin" component={MyCoin} />
						<Route path="myCare" component={MyCare} />
						<Route path="myCredit" component={MyCredit} />
						<Route path="myEvaluate" component={MyEvaluate} />
						<Route path="myLevel" component={MyLevel} />
						<Route path="myCoinControl/:do" component={MyCoinControl} />
						<Route path="workerManagement" component={WorkerManagement} />
						<Route path="applyForWorker" component={ApplyForWorker} />
						<Route path="applyForIdentity" component={ApplyForIdentity} />
		    		</Route>
		    		
					<Route path="articleInfo" component={ArticleInfo} />
					<Route path="articleList/:type" component={ArticleList} />
					<Route path="question" component={Question} />
					<Route path="message" component={Message} />
					<Route path="workerInfo" component={WorkerInfo} />
					<Route path="order" component={Order}>
						<Route path="make" component={MakeOrder} />
						<Route path="slefMake" component={MakeSelfOrder} />
					</Route>
					<Route path="index" component={Index} />
					<Route path="search/:type" component={Search} />
					<Route path="contactUs" component={ContactUs} />

		    	</Route>
		    	<Route path="user" component={User}>
		    			<Route path="login" component={Login} />
		    			<Route path="codeLogin" component={CodeLogin} />
		    			<Route path="regist" component={Regist} />
		    			<Route path="registNext" component={RegistNext} />
		    			<Route path="getPassword" component={GetPassword} />
		    			<Route path="getPasswordNext" component={GetPasswordNext} />
		    		</Route>

		    </Route>
		  </Router>)
	}

}




export default MyRouter;