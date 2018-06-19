import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'

var FontAwesome = require('react-fontawesome');

class MyCredit extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='my-credit'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的信誉</NavBar>
			<div className='my-credit-content'>
				<div className='my-credit-value'>
					<div className='my-credit-value-item'>
						<div>
							<p><FontAwesome name='hand-o-left' /><span>650</span></p>
						</div>
					</div>
					<div className='my-credit-value-text'>
						<p>信誉良好</p>
					</div>
				</div>
			</div>

		</div>)
	}

}
MyCredit.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCredit.defaultProps = {
  
};


class MyEvaluate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo:false,
			userInfoDetail:false,
			isWorker:false,
		}
	}
	componentWillMount() {
		//初始化用户信息
		let userInfo = this.context.store.getState().userInfo;
		let userInfoDetail = this.context.store.getState().userInfoDetail;

		if(userInfo){
			this.setState({
				userInfo,
				userInfoDetail,
				isWorker:userInfoDetail.user_info.artisan_status==3?true:false
			})
		}
		
			
	}
	render(){
		console.log(this.props)               
		let evaluate = this.state.userInfoDetail?this.state.userInfoDetail.user_info.evaluate_info:[],
		evaluateList = [];
		this.props.location.query.type == 1 ? evaluate = (this.props.location.state.data.evaluate_info?JSON.parse(this.props.location.state.data.evaluate_info):[]):null;
		for(var key in evaluate){
			evaluateList.push(evaluate[key])
		}
		return(<div className='my-evaluate'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>{this.props.location.query.type == 0?'我':'工匠'}的评价</NavBar>
			<div className='my-evaluate-content'>
				{evaluateList.map((obj,index)=>{
					return (<dl key={index}>
						<dt><span>{obj.name}</span></dt>
						<dd>{obj.num}次 满意</dd>
					</dl>)
				})}
				<div>
					<h3>{this.props.location.query.type == 1?this.props.location.state.data.praise_level : this.state.userInfoDetail.praise_level}</h3>					
				</div>
			</div>

		</div>)
	}

}
MyEvaluate.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyEvaluate.defaultProps = {
  
};

class MyLevel extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='my-level'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的等级</NavBar>
			<div className='my-level-content'>
				
				<div className='my-level-item'>
				    <div>
				    	<span>693</span>
				    </div>		
				    <span>2000</span>		
				</div>
				<p>平台等级：3</p>
			</div>

		</div>)
	}

}
MyLevel.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyLevel.defaultProps = {
  
};
// export default MyCredit
export {MyCredit,MyEvaluate,MyLevel}