import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal } from 'antd-mobile';
const alert = Modal.alert;

import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import Member from '../../../request/member';
import Order from '../../../request/order';
import API from '../../../request/api';
var FontAwesome = require('react-fontawesome');

require('./style.scss');

class Mine extends React.Component{
	render(){
		return(<div>{this.props.children}</div>)
	}
}

class MineIndex extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object,
		store:React.PropTypes.object,
	}
	constructor(props){
		super(props);
		this.state = {
			userInfo:false,
			userInfoDetail:false,
			orderNum:0,
			dealingNum:0,
			isWorker:false,
			unSubscribe:()=>{}
		}
	}
	handleEXIT(){		
		
		
		alert('确定要退出账户？', '', [
	      { text: '取消', onPress: () => {console.log('cancel')} },
	      { text: '确定', onPress: () => {
			this.context.store.dispatch({
				type:'SET_USERINFO',
				data:false
			});
			localStorage.removeItem('userInfo');
			
			window.store.dispatch({
				type:'SET_USERINFO_DETAIL',
				data:false
			});
			
			localStorage.removeItem('userInfoDetail');
			this.setState({
				userInfo:false,
				userInfoDetail:false,
			})	
		  } },
	    ])
	}
	componentWillMount() {
		//初始化信息
		var userInfo = this.context.store.getState().userInfo;
		var userInfoDetail = this.context.store.getState().userInfoDetail;
		if(userInfo){
			this.setState({
				userInfo,
				userInfoDetail,
				isWorker:userInfoDetail.user_info.artisan_status==3?true:false,
			})
		}
		//定时更新信息
		let unSubscribe = store.subscribe(()=>{
			userInfo = this.context.store.getState().userInfo;
			userInfoDetail = this.context.store.getState().userInfoDetail;
			if(userInfo){
				this.setState({
					userInfo,
					userInfoDetail,
					unSubscribe
				})
			}
		})
		


		//获取订单总数
		Order.list({
			uid:userInfo.id,
			type:0,
			token:userInfo.token,
		})
		.then((data)=>{
			if(data){
				this.setState({
					orderNum:data.paging.total
				})
			}
		})
		//获取待处理订单数
		Order.list({
			status:'0,1,2,5',
			uid:userInfo.id,
			type:0,
			token:userInfo.token,
		})
		.then((data)=>{
			if(data){
				this.setState({
					dealingNum:data.paging.total
				})
			}
		})
	}
	componentWillUnmount(){
		this.state.unSubscribe()
	}
	render(){
		return(<div className='user-center'>

              <NavBar mode="light" rightContent={<Link to='/home/mine/editUser'><FontAwesome name='gear' /></Link>} onLeftClick={() => {}}>个人中心</NavBar>
		    <div className='user-top'>
		    	
		    		<div  className='user-head-img'>
                   		<ImgInit src={this.state.userInfoDetail?API.DOMAIN.substr(0,API.DOMAIN.length-1)+this.state.userInfoDetail.avatar:''}/>	
		    		</div>
		    		<div className='user-text'>
		    			<h3>{this.state.userInfoDetail?(this.state.userInfoDetail.user_info.real_name||this.state.userInfoDetail.name):'游客'}</h3>
		    			{/* <p>{this.state.userInfoDetail?this.state.userInfoDetail.custom_level:'(普通客户)'}</p> */}
		    		</div>
		    		<div className='user-es'>
		    			<div>
		    				<FontAwesome name='street-view' />
		    				<span>平台等级：{this.state.userInfoDetail?this.state.userInfoDetail.platform_level:'1'}</span>
		    			</div>
		    			<Link to='/home/mine/myCoin'>
			    			<div>
			    				<FontAwesome name='database' />
			    				<span>积分：{this.state.userInfoDetail?this.state.userInfoDetail.integral:'0'}</span>
			    			</div>
		    			</Link>
		    		</div>
		    		<div className='user-es'>
						<div>
							<FontAwesome name='street-view' />
							<span>客户等级：{this.state.userInfoDetail?this.state.userInfoDetail.custom_level:'普通客户'}</span>
						</div>
		    		</div>
					{this.state.isWorker&&<div className='user-es' style={{marginTop:'20px'}}>
			    			<div>
			    				<FontAwesome name='street-view' />
			    				<span>工匠等级：{this.state.userInfoDetail.artisan_level}</span>
			    			</div>
			    			<div>
								
			    				<FontAwesome name='tags' />
			    				<span>信誉：{this.state.userInfoDetail.user_info&&this.state.userInfoDetail.user_info.reputation_level}</span>
			    			</div>
		    		</div>}
		    		{this.state.isWorker&&<div className='user-es'>

			    			<div>
			    				<FontAwesome name='hand-peace-o' />
			    				<span onClick={()=>{this.context.router.push('/home/mine/myEvaluate?type=0')}}>好评率：{this.state.userInfoDetail.praise_level}</span>
			    			</div>

		    		</div>}
		    		
		    		
		    </div>
		    <div className='user-mid'>
		    	{/* <Link to='/home/message'>
		    		<dl>
			    		<dt><FontAwesome name='comments' /><span>我的消息</span></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
		    		</dl>
		    	</Link> */}
		    	<Link to='/home/mine/orderList'>
		    		<dl>
			    		<dt><FontAwesome name='book' /><span>我的订单</span><font>(<b style={{color:'#f60'}}>{this.state.dealingNum}</b>/{this.state.orderNum})</font></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
		    		</dl>
		    	</Link>
				
				{this.state.isWorker?<Link to='/home/mine/workerManagement'>
		    	<dl>
		    		<dt><FontAwesome name='address-card' /><span>工匠身份管理</span></dt>
		    		<dd><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	</Link>:<Link to='/home/mine/applyForWorker'>
		    	<dl>
		    		<dt><FontAwesome name='address-card' /><span>申请成为工匠</span></dt>
		    		<dd><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	</Link>}
		    	
		    	<Link to='/home/mine/applyForIdentity'>
			    	<dl>
			    		<dt><FontAwesome name='id-card' /><span>{this.state.userInfoDetail.is_real==1?'重新实名认证':'实名认证'}</span></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
			    	</dl>
		    	</Link>
		    	<Link to='/home/mine/myCare'>
		    		<dl>
			    		<dt><FontAwesome name='heart' /><span>我关注的</span></dt>
			    		<dd><FontAwesome name='angle-right' /></dd> 
		    		</dl>
		    	</Link>
		    	
		    </div>
		   
		    <div className="user-bottom">
		    	{
					this.state.userInfoDetail?
					<Button type="warning"  onClick={()=>{this.handleEXIT()}}>退出登录</Button>:
					<div className='user-unlogin-wrap'>
						<h4>您还没<span onClick={()=>{this.context.router.push('/user/login')}} >登录</span></h4>
						<p onClick={()=>{this.context.router.push('/home/index')}} >返回首页</p>
					</div>
				}
		    </div>
			
		</div>)
	}

}

export default Mine
export {MineIndex}