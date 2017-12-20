import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, Tabs, List, InputItem, Toast} from 'antd-mobile';
import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'

class MyCoinControl extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			content:''
		}
	}
	componentWillMount() {
		console.log(this.props.params.do)

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
      		<div className='my-coin-control-tabs-img'><ImgInit src={require('./img/qrcode.jpg')} /></div>
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
      		<div className='my-coin-control-tabs-img'><ImgInit src={require('./img/qrcode.jpg')} /></div>
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
      		<p>充值说明：</p>
      		<p>1、直接联系站长</p>
      		<div className='my-coin-control-tabs-text'>
      			<p>手机号：18181443335</p>
      		</div>
      		<div className="my-coin-control-tabs-submit">
      			<Link to='/home/mine/myCoinControl/recharged?type=cash'>下一步</Link>
      		</div>
      	</div>, },
    ];
		return(<Tabs tabs={tabs} swipeable={false}>
				          {this.renderContent}
				        </Tabs>)
	}	
}

class Recharged extends React.Component {
	constructor(props){
		super(props);
		this.state={

		}
	}
	render(){
		return(<div className='recharged'>
			<h4>转账信息</h4>
			<Input title='转账单号' placeholder='输入转账单号后6位' />
			<Input title='备注' placeholder='输入您的备注' />
			<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
			<div className='complete'>
				<Link to='/home/mine/myCoin'><Button type='primary'>完成</Button></Link>
			</div>
		</div>)
	}
}
class Wd extends React.Component {
	constructor(props){
		super(props);
		this.state={

		}
	}
	render(){
		return(<div className='Wd'>
			<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src='' />	
					</div>					
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>2575</h3>
					</div>
				</div>
				<div className='Wd-content'>
					<h4>提现信息</h4>
					<Input title='提现金额' placeholder='输入您要提现的金额' />
					<Input title='密码' placeholder='输入您的密码' />
					<Input title='备注' placeholder='输入您的备注' />
					<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
					<div className='complete'>
						<Link to='/home/mine/myCoin'><Button type='primary'>完成</Button></Link>
					</div>
				</div>
		</div>)
	}
}
class Give extends React.Component {
	constructor(props){
		super(props);
		this.state={

		}
	}
	render(){
		return(<div className='Give'>
			<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src='' />	
					</div>					
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>2575</h3>
					</div>
				</div>
				<div className='Give-content'>
					<h4>转账信息</h4>
					<Input title='注册电话' placeholder='输入接收积分人的注册电话号' />
					<Input title='转账积分' placeholder='输入您转账的积分' />
					<Input title='密码' placeholder='输入您的密码' />
					<Input title='备注' placeholder='输入您的备注' />
					<p>提示：完成之后24小时内系统会自动将积分转入您的账户。</p>
					<div className='complete'>
						<Link to='/home/mine/myCoin'><Button type='primary'>完成</Button></Link>
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
    });
  }
  render() {
    return (
      <div>
        <List>
          <InputItem
            type="text"
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