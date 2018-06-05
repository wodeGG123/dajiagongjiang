import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, Toast } from 'antd-mobile';
import {Link} from 'react-router'
import Member from 'rootsrc/request/member.js'
import { createForm } from 'rc-form';
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


class LoginForm extends React.Component{
	static contextTypes = {
		store: PropTypes.object,
  		router: PropTypes.object,
	}
	constructor(props){
		super(props);
		this.state = {			
		}
	}
    handleSubmit(){
		this.props.form.validateFields((error, value) => {			
			if(!error){
				Member.login(value.mobile,value.password)
				.then((data)=>{
					if(!data.state){
						Toast.info('手机号或密码错误！');
						
					}else{
						Toast.info('登录成功！')
						
						//登录成功后获取详情再跳转
						Member.info(data.data.id,data.data.token)
						.then((data)=>{
							if(data){
								this.context.router.push('/home/mine/index');
							}
						})
						
					}
				})
			}else{
				Toast.info('手机号或密码不能为空！')
			}
		  });
       
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(<div>
			<NavBar mode="light" icon={<Icon type="cross" />} rightContent={<Link to='/user/regist'>注册</Link>} onLeftClick={() => {this.context.router.replace('/home/mine/index')}}>登录</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('mobile', {
						initialValue:'',
						rules: [{required: true}],
					  })}
					 placeholder='请输入手机号' type="number"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>密码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('password', {
						initialValue:'',
						rules: [{required: true}],
					  })}
					placeholder='请输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button onClick={()=>{this.handleSubmit()}} type='primary'>登录</Button>
				</div>
				<div className='user-form-extra'>
					{/* <Link to='user/codeLogin'>验证码登录</Link> */}
					<Link to='user/getPassword'>忘记密码?</Link>
				</div>
			</div>

		</div>)
	}

}


class CodeLoginForm extends React.Component{
	static contextTypes = {
		store: PropTypes.object,
		router: PropTypes.object,
	}
	constructor(props){
		super(props)
	}
	handleSubmit(){
		this.props.form.validateFields((error, value) => {			
			if(!error){
				//此处未完待续..
				Member.login(value.mobile,value.code)
				.then((data)=>{

					if(!data.state){
						Toast.info(data.error.description)
					}else{
						Toast.info('登录成功！')
						//设置全局store userinfo
						this.context.store.dispatch({
							type:'SET_USERINFO',
							data:data.data
						})
						//设置本地存储userinfo
						localStorage.setItem('userInfo',JSON.stringify(data.data))
					}
				})
			}else{
				Toast.info('手机号或密码不能为空！')
			}
		  });
       
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />}  onLeftClick={() => {this.context.router.goBack()}}>验证码登录</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'>
						<input 
						{...getFieldProps('mobile', {
							initialValue:'',
							rules: [{required: true}],
						  })}	
						placeholder='请输入手机号' 
						type="text"/>
					</div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('code', {
						initialValue:'',
						rules: [{required: true}],
					  })}	
					placeholder='请输入验证码' type="text"/></div>
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

class RegistForm extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props)
		this.state={
			modal1:false,
			buttonText:'发送',
			buttonDisabled:false,
		}
	}
	handleSubmit(){
		this.props.form.validateFields((error, value) => {			
			if(!error){
				Member.regist(value.mobile,value.mobile.toString().substr(-6),value.code)
				.then((data)=>{
					if(data.state){
						this.context.router.push({pathname:'/user/registNext',state:{data:data.data}})
					}else{
						Toast.info('手机已存在！')
					}
					
				})				
			}else{
				Toast.info('手机号或验证码不能为空！')
			}
		  });
       
	}
	handleSendCode(){
		this.props.form.validateFields(['mobile','check'],(error, value) => {			
			if(!error){
				Member.isExist(value.mobile)
				.then((data)=>{
					if(!data.data.already){
						let i = 60;
						const _interval = setInterval(()=>{
						this.setState({
							buttonText:i--,
							buttonDisabled:true,
						})
						if(i<0){
							clearInterval(_interval);
							this.setState({
								buttonText:'发送',
								buttonDisabled:false
								})
							}
						},1000)
						Member.mobileVerify(value.mobile,1)
						.then((data)=>{

						})
					}else{
						Toast.info('手机号已经存在！')
					}
				})

				


			}else{
				error.mobile?Toast.info('手机号不能为空！'):Toast.info('您还没同意注册条款！')
				
			}
		});
		
	}
	onOpen(){
		this.setState({
			modal1:true
		})
	}
	onClose(){
		this.setState({
			modal1:false
		})
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to='/user/login'>登录</Link>} onLeftClick={() => {this.context.router.replace('/user/login')}}>注册</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'>
					<input
					{...getFieldProps('mobile', {
						initialValue:'',
						rules: [{required: true}],
					})}	
					placeholder='请输入手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('code', {
						initialValue:'',
						rules: [{required: true}],
					})}
					placeholder='请输入验证码' type="text"/></div>
					<div className="send-code-bt">
						<Button disabled={this.state.buttonDisabled} onClick={()=>{this.handleSendCode()}} type='primary'>{this.state.buttonText}</Button>
					</div>
				</div>
				<div className='regist-allow'>
					<input
					{...getFieldProps('check', {
						initialValue:'',
						rules: [{required: true}],
					})}
					 type="checkbox"/>
					<span>我已看过并同意</span>
					<font onClick={()=>{this.onOpen()}}>《大家工匠平台注册条款》</font>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.handleSubmit()}}>同意并注册</Button>
				</div>
			</div>

			<Modal
	          visible={this.state.modal1}
	          transparent
	          maskClosable={false}
	          onClose={()=>{}}
	          title="大家工匠免责声明"
	          footer={[{ text: '关闭', onPress: () => { this.onClose(); } }]}
	        >
	          <div className='statement' style={{ height: 300, overflow: 'scroll' }}>
	        	
				<p>欢迎使用大家工匠网络服务平台（以下简称大家工匠），任何使用大家工匠的用户均应该仔细阅读本声明，用户注册大家工匠的行为和使用大家工匠网络平台的各个页面都被视为是对本声明内容的全部认可。</p>
				<p>大家工匠网络平台上的服务信息是为了更好的服务我们的用户，但不能保证所有文本、信息、图形、链接及其他功能的准确性和完整性，故仅供访问者参照使用。</p>
				<p>大家工匠不担保网络信息不会中断，对网络信息服务的及时性、安全性、准确性也都不做担保。并对于不可抗拒或因大家工匠网站不能控制的原因造成的网络服务中断及其他缺陷，大家工匠不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。大家工匠严格保障用户隐私权，对上网用户的个人信息保密，未经上网用户的同意不得向他人泄露，但法律另有规定除外。用户都是自愿注册个人信息，用户明确同意其使用大家工匠网络信息服务所存在的风险将完全由其自己承担。</p>
				<p>任何单位或个人认为通过大家工匠网络平台的内容可能侵犯其合法权益，应及时向大家工匠进行信息反馈，并提供身份证明，权属证明及详细侵权情况证明，大家工匠网站在收到文件证明后，将会尽快删除被控侵权内容。</p>
				<p>除大家工匠注明之服务条款外，其它因为使用大家工匠而导致的任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵权及所造成的各种损失大家工匠也不承担任何法律责任。</p>
					
				<h4>用户协议</h4>	
                
				<p>一、大家工匠的各项服务的所有权、运行权、解释权归大家工匠网站所有。用户完成注册，此协议即时生效，您随之称为大家工匠网站平台的注册用户。</p>
				<p>二、请提供你本人真实、正确、最新及完整的资料，如平台方发现您的信息不符，平台方有权暂停或终止您的账号，并拒绝您于现在和未来使用大家工匠网络平台的部分或全部服务。
				用户必须同意接受大家工匠网站平台通过电子邮件或其他方式向用户发送广告或其他相关商业信息。</p>
				<p>三、除法律许可要求外，大家工匠不会公开、编辑、透露用户注册的个人资料信息（必须公开的信息除外）。</p>
				<p>四、大家工匠在必要时有权修改服务条款，如用户继续享用网络服务，则视为接受服务条款的变动。大家工匠保留随时修改或中断服务不需照知用户的权利，并不需对用户或第三方负责。</p>
				<p>五、用户对网络服务的使用承担风险，大家工匠对此不作任何类型的担保，不论是明确的或隐含的。</p>
				<p>六、用户单独承担发布内容的责任。用户不得发布任何不符合国家法律规定的信息资料。</p>
				对于用户通过大家工匠网站平台发布的可公开的任何信息，用户同意大家工匠拥有免费许可、可完全转授的权利。
				<p>七、在用户之间发生交易后，用户会对对方用户进行服务评价，对此评价任何一方用户必须全部无条件的接受对方给出的评价结果。如果对此次服务评价结果不满意，不得使用任何非法手段解决，平台方不参与调解，也不承担任何后果。</p>
				<p>八、在用户之间发生交易的过程中，大家工匠网站对其中存在的任何安全问题不承担任何责任。</p>
				<p>九、本平台的所有内容，不代表平台方观点。</p>
				
	          </div>
	        </Modal>

		</div>)
	}

}
class RegistNextForm extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object,
		store:React.PropTypes.object
		
	}
	constructor(props){
		super(props)
	}
	componentWillMount(){
		!this.props.location.state?this.context.router.push('/user/regist'):null;
	}
	handleSubmit(){
		var {id,token,mobile} = this.props.location.state.data;
		this.props.form.validateFields((error, value) => {			
			if(!error){
				if(value.password2 == value.password1){
					Member.passwordReset(id,token,value.password1)
					.then((data)=>{
						Toast.info('注册成功！')
						//注册成功后登陆
						Member.login(mobile,value.password1) 
						.then((data)=>{
							if(!data.state){
								Toast.info(data.error.description)
							}else{
								//登录成功后获取详情再跳转
								Member.info(data.data.id,data.data.token)
								.then((data)=>{
									if(data){
										this.context.router.push('/home/mine/index');
									}
								})
							}
						})						
					})
				}else{
					Toast.info('您输入的两次密码不一致！')
				}
				
			}else{
				Toast.info('密码不能少于6位！')
			}
		  });
       
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}}>设置密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>密码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('password1', {
						initialValue:'',
						rules: [{required: true,min:6}],
					})}

					placeholder='请输入密码' type="password"
					/>
					</div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>确认密码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('password2', {
						initialValue:'',
						rules: [{required: true,min:6}],
					})}
					placeholder='请再次输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.handleSubmit()}}>完成</Button>
				</div>
			</div>

		</div>)
	}

}
class GetPasswordForm extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			buttonText:'发送',
			buttonDisabled:false,
		}
	}
	handleSendCode(){
		this.props.form.validateFields(['mobile'],(error, value) => {			
			if(!error){
				let i = 60;
				const _interval = setInterval(()=>{
				this.setState({
					buttonText:i--,
					buttonDisabled:true,
				})
				if(i<0){
					clearInterval(_interval);
					this.setState({
						buttonText:'发送',
						buttonDisabled:false
						})
					}
				},1000)
				Member.mobileVerify(value.mobile,3)
				.then((data)=>{

				})


			}else{
				Toast.info('手机号不能为空！')
			}
		});
		
	}
	handleSubmit(){
		
		this.props.form.validateFields(['mobile','code'],(error, value) => {

			if(!error){
				Member.passwordGetBack(value.mobile,value.mobile.toString().substr(-6),value.code)
				.then((data)=>{
					if(data.state){
						this.context.router.push({
							pathname:'/user/getPasswordNext',
							state:{data:data.data}
						})
					}
				})
			}else{
				Toast.info('手机号不能为空！')
			}

		});

		


	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.replace('/user/login')}}>找回密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>手机号</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('mobile', {
						initialValue:'',
						rules: [{required: true}],
					})}
					placeholder='请输入手机号' type="text"/>
					</div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>验证码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('code', {
						initialValue:'',
						rules: [{required: true}],
					})}
					placeholder='请输入验证码' type="text"/></div>
					<div className="send-code-bt">
					<Button disabled={this.state.buttonDisabled} onClick={()=>{this.handleSendCode()}} type='primary'>{this.state.buttonText}</Button>
					</div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.handleSubmit()}}>下一步</Button>
				</div>
			</div>

		</div>)
	}

}
class GetPasswordNextForm extends React.Component{
	static contextTypes = {
		router: React.PropTypes.object,
		store: React.PropTypes.object,
	}
	constructor(props){
		super(props)
	}
	componentWillMount(){
		!this.props.location.state?this.context.router.push('/user/regist'):null;
	}
	handleSubmit(){
		var {id,token,mobile} = this.props.location.state.data;
		this.props.form.validateFields((error, value) => {			
			if(!error){
				if(value.password2 == value.password1){
					Member.passwordReset(id,token,value.password1)
					.then((data)=>{
						Toast.info('修改成功！')
						//修改成功后登陆
						Member.login(mobile,value.password1) //'18108100946','12345678'
						.then((data)=>{
							if(!data.state){
								Toast.info(data.error.description)
							}else{						
								//登录成功后获取详情再跳转
								Member.info(data.data.id,data.data.token)
								.then((data)=>{
									if(data){
										this.context.router.push('/home/mine/index');
									}
								})
							}
						})						
					})
				}else{
					Toast.info('您输入的两次密码不一致！')
				}
				
			}else{
				Toast.info('密码不能为空！')
			}
		  });
	}
	render(){
		var {getFieldProps,getFieldError} = this.props.form
		return(<div>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}}>设置新密码</NavBar>
			<div className='user-form'>
				<div className='user-form-box'>
					<div className='user-form-left'><span>新密码</span></div>
					<div className='user-form-right'>
					<input
					{...getFieldProps('password1',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='请输入密码' type="password"/>
					</div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>确认密码</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('password2',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='请再次输入密码' type="password"/></div>
				</div>
				<div className='user-form-bt'>
					<Button type='primary' onClick={()=>{this.handleSubmit()}}>完成</Button>
				</div>
			</div>

		</div>)
	}

}


var Login = createForm()(LoginForm)
var CodeLogin = createForm()(CodeLoginForm)
var Regist = createForm()(RegistForm)
var RegistNext = createForm()(RegistNextForm)
var GetPassword = createForm()(GetPasswordForm)
var GetPasswordNext = createForm()(GetPasswordNextForm)

export default User
export {Login, CodeLogin, Regist, RegistNext, GetPassword, GetPasswordNext}