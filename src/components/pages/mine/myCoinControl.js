import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, Tabs, List, InputItem, Toast} from 'antd-mobile';
import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import Coin from 'rootsrc/request/coin'
import API from 'rootsrc/request/api'

class MyCoinControl extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			content:''
		}
	}
	componentWillMount() {
		switch(this.props.params.do){
			case 'recharge': this.setState({title:'积分充值',content:<Recharge />});break;
			case 'recharged': this.setState({title:'填写单号',content:<Recharged />});break;
			case 'wd': this.setState({title:'积分提现',content:<Wd />});break;
			case 'give': this.setState({title:'积分转赠',content:<Give />});break;
			default : break;
		}
	}
	componentWillReceiveProps(nextProps){
		switch(nextProps.params.do){
			case 'recharge': this.setState({title:'积分充值',content:<Recharge />});break;
			case 'recharged': this.setState({title:'填写单号',content:<Recharged />});break;
			case 'wd': this.setState({title:'积分提现',content:<Wd />});break;
			case 'give': this.setState({title:'积分转赠',content:<Give />});break;
			default : break;
		}
	}
	render(){
		

		return(<div className='my-coin'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>{this.state.title}</NavBar>
			<div className='my-coin-content'>
				<div className="my-coin-record">
					<div>
						{this.state.content}
					</div>
				</div>
			</div>

		</div>)
	}

}
MyCoinControl.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCoinControl.defaultProps = {
  
};


class Recharge extends React.Component {
	constructor(props){
		super(props)
		this.state={
		}
	}
	renderContent (tab) {
		return(<div className='my-coin-control-tabs' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
      {tab.content}
    </div>)
	}
	render(){

		const tabs = [
      { title: '支付宝',
      	content:<div className='my-coin-control-tabs-content'>
      		<p>充值说明：</p>
      		<p>1、扫描下面二维码</p>
      		<p>2、支付宝把您想充值的金额转账到该账户</p>
      		<p>3、记录账单号</p>
      		<p>4、点击下一步</p>
      		<div className='my-coin-control-tabs-img'><ImgInit src={require('./img/zfb.jpg')} /></div>
      		<div className="my-coin-control-tabs-submit">
      			<Link to='/home/mine/myCoinControl/recharged?type=zfb'>下一步</Link>
      		</div>
      	</div>,
  		},
      { title: '微信',
      	content:<div className='my-coin-control-tabs-content'>
      		<p>充值说明：</p>
      		<p>1、扫描下面二维码</p>
      		<p>2、微信把您想充值的金额转账到该账户</p>
      		<p>3、记录账单号</p>
      		<p>4、点击下一步</p>
      		<div className='my-coin-control-tabs-img'><ImgInit src={require('./img/wx.jpg')} /></div>
      		<div className="my-coin-control-tabs-submit">
      			<Link to='/home/mine/myCoinControl/recharged?type=wx'>下一步</Link>
      		</div>
      	</div>, },
      { title: '银行卡转账',
      	content:<div className='my-coin-control-tabs-content'>
      		<p>充值说明：</p>
      		<p>1、以下为站长银行账号</p>
      		<p>2、把您想充值的金额转账到该账户</p>
      		<p>3、记录账单号</p>
      		<p>4、点击下一步</p>
      		<div className='my-coin-control-tabs-text'>
      			<p>中国建设银行：622848***********     XXX</p>
      		</div>
      		<div className="my-coin-control-tabs-submit">
      			<Link to='/home/mine/myCoinControl/recharged?type=bank'>下一步</Link>
      		</div>
      	</div>, },
      { title: '现金充值',
      	content:<div className='my-coin-control-tabs-content'>
      		<div className="my-coin-control-tabs-submit">
      			<Link to='/home/contactUs'>联系客服</Link>
      		</div>
      	</div>, },
    ];
		return(<Tabs tabs={tabs} swipeable={false}>
				          {this.renderContent}
				        </Tabs>)
	}	
}

class Recharged extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			userInfo:store.getState().userInfo,
			order_id:'',
			remark:'',
		}
	}
	handleSubmit(){
		Coin.recharge({
			order_id:this.state.order_id,
			remark:this.state.remark,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		})
		.then((data)=>{
			console.log(data)
			if(data){
				Toast.info('提交成功')
				this.context.router.replace('/home/mine/myCoin')
			}
		})
	}
	render(){
		return(<div className='recharged'>
			<h4>转账信息</h4>
			<Input title='转账单号' getVal={(v)=>{this.setState({order_id:v})}} placeholder='输入转账单号后6位' />
			<Input title='备注' getVal={(v)=>{this.setState({remark:v})}}  placeholder='输入您的备注' />
			<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
			<div className='complete'>
				<Button onClick={()=>{this.handleSubmit()}} type='primary'>提交</Button>
			</div>
		</div>)
	}
}
class Wd extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			userInfo:store.getState().userInfo,
			num:0,
			password:'',
		}
	}
	componentWillMount(){
		console.log(this.state.userInfo)
	}
	handleSubmit(){
		if(this.state.userInfo.integral < this.state.num){
			Toast.info('积分不足！')
			return false
		}
		if(this.state.num==''){
			Toast.info('请输入积分！')
			return false
		}
		Coin.getCash({
			num:this.state.num,
			password:this.state.password,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		})
		.then((data)=>{
			if(data){
				Toast.info('提交成功！')
				this.context.router.replace('/home/mine/myCoin')
			}else{
				Toast.info('密码错误！')
			}
		})
	}
	render(){
		let {userInfo} = this.state
		return(<div className='Wd'>
			<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+userInfo.avatar} />
					</div>					
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>{userInfo.integral}</h3>
					</div>
				</div>
				<div className='Wd-content'>
					<h4>提现信息</h4>
					<Input getVal={(v)=>{this.setState({num:v})}} title='提现金额' placeholder='输入您要提现的金额' />
					<Input type='password' getVal={(v)=>{this.setState({password:v})}} title='密码' placeholder='输入您的密码' />
					<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
					<div className='complete'>
						<Button onClick={()=>{this.handleSubmit()}} type='primary'>提交</Button>
					</div>
				</div>
		</div>)
	}
}
class Give extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			userInfo:store.getState().userInfo,
			mobile:'',
			num:0,
			password:'',
		}
	}
	handleSubmit(){
		if(this.state.userInfo.integral < this.state.num){
			Toast.info('积分不足！')
			return false
		}
		if(this.state.num == ''){
			Toast.info('请输入积分！')
			return false
		}
		Coin.give({
			num:this.state.num,
			mobile:this.state.mobile,
			password:this.state.password,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		})
		.then((data)=>{
			if(data){
				Toast.info('提交成功！')
				this.context.router.replace('/home/mine/myCoin')
			}else{
				Toast.info('请输入正确信息！')
			}
		})
	}
	render(){
		let {userInfo} = this.state
		return(<div className='Give'>
			<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+userInfo.avatar} />
					</div>					
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>{userInfo.integral}</h3>
					</div>
				</div>
				<div className='Give-content'>
					<h4>转账信息</h4>
					<Input getVal={(v)=>{this.setState({mobile:v})}} title='注册电话' placeholder='输入接收积分人的注册电话号' />
					<Input getVal={(v)=>{this.setState({num:v})}} title='转账积分' placeholder='输入您转账的积分' />
					<Input type='password' getVal={(v)=>{this.setState({password:v})}} title='密码' placeholder='输入您的密码' />
					<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
					<div className='complete'>
						<Button onClick={()=>{this.handleSubmit()}} type='primary'>提交</Button>
					</div>
				</div>
		</div>)
	}
}

class Input extends React.Component {
  state = {
    hasError: false,
    value: '',
  }
  onErrorClick = () => {
    
  }
  onChange = (value) => {
    this.setState({
      value,
    },()=>{
		if(this.props.getVal){
			this.props.getVal(value)
		}
	});
  }
  render() {
    return (
      <div>
        <List>
          <InputItem
            type={this.props.type||'text'}
            placeholder={this.props.placeholder}
            error={this.state.hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onChange}
            value={this.state.value}
          >{this.props.title}</InputItem>
        </List>
      </div>
    );
  }
}
export default MyCoinControl