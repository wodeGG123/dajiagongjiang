import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal } from 'antd-mobile';
import {Link} from 'react-router'
var FontAwesome = require('react-fontawesome');
import './style.scss'

class User extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div className='user'>
			 {this.props.children}
		</div>)
	}

}
User.contextTypes = {
  store: PropTypes.object
};
User.defaultProps = {
  
};


class Login extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="cross" />} rightContent={<Link to='/user/regist'>注册</Link>} onLeftClick={() => {console.log(this.context.router);this.context.router.replace('/home/mine/index')}}>登录</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'><input placeholder='请输入手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>密码</span></div>
					<div className='user-form-right'><input placeholder='请输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary'>登录</Button>
				</div>
				<div className='user-form-extra'>
					<Link to='user/codeLogin'>验证码登录</Link>
					<Link to='user/getPassword'>忘记密码</Link>
				</div>
			</div>

		</div>)
	}

}
Login.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
Login.defaultProps = {
  
};
class CodeLogin extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />}  onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>验证码登录</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'><input placeholder='请输入手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'><input placeholder='请输入验证码' type="text"/></div>
					<div className="send-code-bt">
						<Button type='primary'>发送</Button>
					</div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary'>登录</Button>
				</div>
			</div>

		</div>)
	}

}
CodeLogin.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
CodeLogin.defaultProps = {
  
};

class Regist extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to='/user/login'>登录</Link>} onLeftClick={() => {console.log(this.context.router);this.context.router.replace('/user/login')}}>注册</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'><input placeholder='请输入手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'><input placeholder='请输入验证码' type="text"/></div>
					<div className="send-code-bt">
						<Button type='primary'>发送</Button>
					</div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.context.router.push('/user/registNext')}}>下一步</Button>
				</div>
			</div>

		</div>)
	}

}
Regist.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
Regist.defaultProps = {
  
};
class RegistNext extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>设置密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>密码</span></div>
					<div className='user-form-right'><input placeholder='请输入密码' type="password"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>确认密码</span></div>
					<div className='user-form-right'><input placeholder='请再次输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{}}>完成</Button>
				</div>
			</div>

		</div>)
	}

}
RegistNext.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
RegistNext.defaultProps = {
  
};
class GetPassword extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.replace('/user/login')}}>找回密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'><input placeholder='请输入手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'><input placeholder='请输入验证码' type="text"/></div>
					<div className="send-code-bt">
						<Button type='primary'>发送</Button>
					</div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.context.router.push('/user/getPasswordNext')}}>下一步</Button>
				</div>
			</div>

		</div>)
	}

}
GetPassword.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
GetPassword.defaultProps = {
  
};
class GetPasswordNext extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>设置新密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>新密码</span></div>
					<div className='user-form-right'><input placeholder='请输入密码' type="password"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>确认密码</span></div>
					<div className='user-form-right'><input placeholder='请再次输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{}}>完成</Button>
				</div>
			</div>

		</div>)
	}

}
GetPasswordNext.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
GetPasswordNext.defaultProps = {
  
};
export default User
export {Login, CodeLogin, Regist, RegistNext, GetPassword, GetPasswordNext}