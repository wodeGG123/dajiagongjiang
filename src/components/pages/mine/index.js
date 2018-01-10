import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal } from 'antd-mobile';
const alert = Modal.alert;

import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

require('./style.scss');

class Mine extends React.Component{
	render(){
		return(<div>{this.props.children}</div>)
	}
}

class MineIndex extends React.Component{
	constructor(props){
		super(props);
	}
	handleEXIT(){
		alert('确定要退出账户？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => console.log('ok') },
	    ])
	}
	componentWillMount() {

	}
	render(){
		return(<div className='user-center'>

              <NavBar mode="light" rightContent={<Link to='/home/mine/editUser'><FontAwesome name='gear' /></Link>} onLeftClick={() => {console.log(this.context.router)}}>个人中心</NavBar>
		    <div className='user-top'>
		    	
		    		<div  className='user-head-img'>
                   		<ImgInit src=''/>	
		    		</div>
		    		<div className='user-text'>
		    			<h3>李师傅</h3>
		    			<p>(普通会员)</p>
		    		</div>
		    		<div className='user-es'>
		    			<Link to='/home/mine/myLevel'>
		    			<div>
		    				<FontAwesome name='street-view' />
		    				<span>平台等级：1</span>
		    			</div>
		    			</Link>
		    			<Link to='/home/mine/myCoin'>
			    			<div>
			    				<FontAwesome name='database' />
			    				<span>积分：96</span>
			    			</div>
		    			</Link>
		    		</div>
		    		<div className='user-es'>
		    			<Link to='/home/mine/myEvaluate'>
			    			<div>
			    				<FontAwesome name='hand-peace-o' />
			    				<span>好评率：96%</span>
			    			</div>
		    			</Link>
		    			<Link to='/home/mine/myCredit'>
			    			<div>
			    				<FontAwesome name='tags' />
			    				<span>信誉：650</span>
			    			</div>
			    		</Link>
		    		</div>
		    		
		    </div>
		    <div className='user-mid'>
		    	<Link to='/home/message'>
		    		<dl>
			    		<dt><FontAwesome name='comments' /><span>我的消息</span></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
		    		</dl>
		    	</Link>
		    	<Link to='/home/mine/orderList'>
		    		<dl>
			    		<dt><FontAwesome name='book' /><span>我的订单</span><font>(100)</font></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
		    		</dl>
		    	</Link>
		    	<Link to='/home/mine/workerManagement'>
		    	<dl>
		    		<dt><FontAwesome name='address-card' /><span>工匠身份管理</span></dt>
		    		<dd><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	</Link>
		    	<Link to='/home/mine/applyForIdentity'>
			    	<dl>
			    		<dt><FontAwesome name='id-card' /><span>实名认证</span></dt>
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
		    	
		    	<Link to='/user/login'><Button type="ghost">您还没登录</Button></Link>
		    	<Button type="warning"  onClick={this.handleEXIT}>退出登录</Button>
		    </div>
		</div>)
	}

}

export default Mine
export {MineIndex}